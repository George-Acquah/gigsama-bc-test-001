import { Module } from '@nestjs/common/decorators/modules';
import { MongooseModule } from '@nestjs/mongoose';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { Patient, PatientSchema } from 'src/shared/schemas/patient.schema';
import { DoctorsModule } from '../doctors/doctors.module';


@Module({
  imports: [MongooseModule.forFeature([{ name: Patient.name, schema: PatientSchema }]), DoctorsModule],
  providers: [PatientsService],
  controllers: [PatientsController],
})
export class PatientsModule {}