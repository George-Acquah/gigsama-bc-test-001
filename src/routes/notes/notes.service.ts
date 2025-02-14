
import { InjectModel } from '@nestjs/mongoose/dist/common';
import { Model } from 'mongoose';;
import { LlmService } from '../llm/llm.service';
import { Injectable } from '@nestjs/common/decorators/core';
import { ActionStep, ActionStepDocument } from 'src/shared/schemas/action-step.schema';
import { DoctorNote, DoctorNoteDocument } from 'src/shared/schemas/doctor-note.schema';
import { NotFoundException } from '@nestjs/common';
import { AuditLog, AuditLogDocument } from 'src/shared/schemas/audits.schema';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(DoctorNote.name) private noteModel: Model<DoctorNoteDocument>,
    @InjectModel(ActionStep.name) private stepModel: Model<ActionStepDocument>,
    @InjectModel(AuditLog.name) private auditLogModel: Model<AuditLogDocument>,
    private readonly llmService: LlmService,
  ) {}

  async submitDoctorNote({
    doctorId,
    patientId,
    encryptedNote,
  }: {
    doctorId: string;
    patientId: string;
    encryptedNote: string;
  }) {
    // 1️⃣ Cancel existing steps for this patient
    await this.stepModel.updateMany(
      { noteId: { $in: await this.findActiveNoteIds(patientId) } },
      { $set: { isCompleted: true } },
    );

    // 2️⃣ Save the new note
    const note = new this.noteModel({
      doctor: doctorId,
      patient: patientId,
      encryptedNote,
      isActive: true,
    });
    await note.save();

    // 3️⃣ Get actionable steps from LLM
    const { checklist, plan } = await this.llmService.generateActionSteps(encryptedNote);

    // 4️⃣ Store the steps
    const steps = [...checklist, ...plan].map(step => ({
      noteId: note._id,
      type: checklist.includes(step) ? 'CHECKLIST' : 'PLAN',
      description: step,
      dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // Example due date
    }));

    await this.stepModel.insertMany(steps);

    // Audit log
  const log = new this.auditLogModel({
    userId: doctorId,
    action: 'Submit Doctor Note',
    description: `Doctor ${doctorId} submitted a note for patient ${patientId}`,
  });
  await log.save();

  return { message: 'Note submitted and actionable steps generated.' };
  }

  // src/notes/notes.service.ts
async getNotesByPatient(patientId: string) {
  const notes = await this.noteModel.find({ patient: patientId }).populate('doctor', 'name');
  if (!notes.length) {
    throw new NotFoundException('No notes found for this patient');
  }
  return notes.map(note => ({
    id: note._id,
    doctorName: note.doctor['name'],
    note: note.encryptedNote,
    createdAt: note.createdAt,
  }));
}


  private async findActiveNoteIds(patientId: string) {
    const notes = await this.noteModel.find({
      patient: patientId,
      isActive: true,
    });
    return notes.map(note => note._id);
  }

  async completeActionStep(stepId: string) {
    const step = await this.stepModel.findByIdAndUpdate(
      stepId,
      { isCompleted: true },
      { new: true }
    );
    if (!step) throw new NotFoundException('Action step not found');
    return { message: 'Step marked as completed' };
  }

}
