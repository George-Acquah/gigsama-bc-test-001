import { Controller } from '@nestjs/common/decorators/core';
import { Post, Body, Get, Param, Delete } from '@nestjs/common/decorators/http';
import { PatientsService } from './patients.service';
import { Patient } from 'src/shared/schemas/patient.schema';
import { User } from 'src/shared/decorators/user.decorator';
import { DoctorsService } from '../doctors/doctors.service';

@Controller('patients')
export class PatientsController {
  constructor(
    private readonly patientsService: PatientsService,
    private readonly doctorsService: DoctorsService
  ) {}

  @Get()
  findAll(): Promise<Patient[]> {
    return this.patientsService.findAll();
  }

  @Get('available-doctors')
  async getAvailableDoctors() {
    return this.doctorsService.listAvailableDoctors();
  }

  @Post('assign/:doctorId')
  async assignDoctor(@User() user, @Param('doctorId') doctorId: string) {
    const patientId = user._id as string;
    return this.patientsService.assignDoctor(patientId, doctorId);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Patient> {
    return this.patientsService.findOne(id);
  }

  @Post()
  create(@Body() patient: Patient): Promise<Patient> {
    return this.patientsService.create(patient);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.patientsService.remove(id);
  }
}
