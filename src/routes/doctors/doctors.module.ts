import { Module } from '@nestjs/common/decorators/modules';
import { MongooseModule } from '@nestjs/mongoose';
import { Doctor, DoctorSchema } from 'src/shared/schemas/doctor.schema';
import { DoctorsController } from './doctors.controller';
import { DoctorsService } from './doctors.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Doctor.name, schema: DoctorSchema }])
  ],
  providers: [DoctorsService],
  controllers: [DoctorsController],
  exports: [DoctorsService]
})
export class DoctorsModule {}
