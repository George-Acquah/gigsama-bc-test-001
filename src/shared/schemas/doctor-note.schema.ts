import { Prop, Schema } from '@nestjs/mongoose/dist/decorators';
import { SchemaFactory } from '@nestjs/mongoose/dist/factories';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type DoctorNoteDocument = DoctorNote & Document;

@Schema({ timestamps: true })
export class DoctorNote {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Doctor', required: true })
  doctor: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Patient', required: true })
  patient: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  encryptedNote: string;

  @Prop({ default: false })
  isActive: boolean;

  @Prop({ type: Date })
  createdAt: Date;
}

export const DoctorNoteSchema = SchemaFactory.createForClass(DoctorNote);
