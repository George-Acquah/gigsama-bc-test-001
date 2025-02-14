import { Prop, Schema } from '@nestjs/mongoose/dist/decorators';
import { SchemaFactory } from '@nestjs/mongoose/dist/factories';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from './user.schema';

export type PatientDocument = Patient & Document;

@Schema({ timestamps: true })
export class Patient extends User {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Doctor' })
  assignedDoctor?: MongooseSchema.Types.ObjectId;

  @Prop({ type: [String], default: [] })
  medicalHistory: string[];
}

export const PatientSchema = SchemaFactory.createForClass(Patient);
