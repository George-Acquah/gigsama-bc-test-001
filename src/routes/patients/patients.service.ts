import { NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose/dist/common';
import { Model } from 'mongoose';
import { Patient, PatientDocument } from 'src/shared/schemas/patient.schema';
import { DoctorsService } from '../doctors/doctors.service';
import { Injectable } from '@nestjs/common/decorators/core';

@Injectable()
export class PatientsService {
  constructor(
    @InjectModel(Patient.name) private patientModel: Model<PatientDocument>,
    private readonly doctorService: DoctorsService
  ) {}

  async findAll(): Promise<Patient[]> {
    return this.patientModel.find().exec();
  }

  async findOne(id: string): Promise<Patient> {
    return this.patientModel.findById(id).exec();
  }

  async create(patient: Patient): Promise<Patient> {
    const newPatient = new this.patientModel(patient);
    return newPatient.save();
  }

  async remove(id: string): Promise<void> {
    await this.patientModel.findByIdAndDelete(id).exec();
  }
  
  async assignDoctor(patientId: string, doctorId: string) {
    const doctor = await this.doctorService.findById(doctorId);
    const patient = await this.patientModel.findById(patientId);

    if (!doctor || !patient) {
      throw new NotFoundException('Doctor or Patient not found');
    }

    // Update Patient
    patient.assignedDoctor = doctor._id as any;
    await patient.save();

    // Add patient to Doctor's list if not already there
    if (!doctor.patients.includes(patient._id as any)) {
      doctor.patients.push(patient._id as any);
      await doctor.save();
    }

    return 'Doctor assigned successfully';
  }
}