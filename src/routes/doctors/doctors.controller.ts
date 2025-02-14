import { DoctorsService } from './doctors.service';
import { Doctor } from 'src/shared/schemas/doctor.schema';
import { Delete, Get, Param, Post, Body } from '@nestjs/common/decorators/http';
import { Controller, UseGuards } from '@nestjs/common/decorators/core';
import { User } from 'src/shared/decorators/user.decorator';
import { JwtAuthGuard } from 'src/shared/guards/Jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Get()
  findAll(): Promise<Doctor[]> {
    return this.doctorsService.findAll();
  }

  @Get('my-patients')
  async getPatients(@User() user) {
    const doctorId = user._id as string;
    return this.doctorsService.getPatientsByDoctor(doctorId);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Doctor> {
    return this.doctorsService.findById(id);
  }

  @Get(':id')
  AssignPatient(@Param('id') id: string): Promise<Doctor> {
    return this.doctorsService.findById(id);
  }

  @Post()
  create(@Body() doctor: Doctor): Promise<Doctor> {
    return this.doctorsService.create(doctor);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.doctorsService.remove(id);
  }
}
