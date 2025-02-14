// src/users/schemas/doctor.schema.ts
import { Prop, Schema } from '@nestjs/mongoose/dist/decorators';
import { SchemaFactory } from '@nestjs/mongoose/dist/factories';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from './user.schema';

export type DoctorDocument = Doctor & Document;

@Schema({ timestamps: true })
export class Doctor extends User {
  @Prop({ required: true })
  specialization: string;

  @Prop({ default: 0 })
  experienceYears: number;

  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: 'Patient', default: [] })
  patients: MongooseSchema.Types.ObjectId[];
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor);
