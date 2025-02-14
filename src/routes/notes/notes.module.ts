import { Module } from '@nestjs/common/decorators/modules';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ActionStep,
  ActionStepSchema
} from 'src/shared/schemas/action-step.schema';
import {
  DoctorNote,
  DoctorNoteSchema
} from 'src/shared/schemas/doctor-note.schema';
import { NotesService } from './notes.service';
import { LlmService } from '../llm/llm.service';
import { NotesController } from './notes.controller';
import { AuditLog, AuditLogSchema } from 'src/shared/schemas/audits.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DoctorNote.name, schema: DoctorNoteSchema },
      { name: ActionStep.name, schema: ActionStepSchema },
      { name: AuditLog.name, schema: AuditLogSchema }
    ])
  ],
  providers: [NotesService, LlmService],
  controllers: [NotesController]
})
export class NotesModule {}
