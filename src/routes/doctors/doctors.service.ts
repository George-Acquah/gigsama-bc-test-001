import { Injectable } from '@nestjs/common/decorators/core';
import { NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose/dist/common';
import { Model } from 'mongoose';
import { Doctor, DoctorDocument } from 'src/shared/schemas/doctor.schema';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectModel(Doctor.name) private doctorModel: Model<DoctorDocument>
  ) {}

  async findAll(): Promise<Doctor[]> {
    return this.doctorModel.find().exec();
  }

  async findById(id: string): Promise<Doctor> {
    return this.doctorModel.findById(id).exec();
  }

  async create(doctor: Doctor): Promise<Doctor> {
    const newDoctor = new this.doctorModel(doctor);
    return newDoctor.save();
  }

  async remove(id: string): Promise<void> {
    await this.doctorModel.findByIdAndDelete(id).exec();
  }

  async getPatientsByDoctor(doctorId: string) {
    const doctor = await this.doctorModel.findById(doctorId).populate('patients');
    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }
    return doctor.patients;
  }

async listAvailableDoctors() {
    return this.doctorModel.find().select('name specialization experienceYears');
  }
}
