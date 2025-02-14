import { Prop, Schema } from '@nestjs/mongoose/dist/decorators';
import { SchemaFactory } from '@nestjs/mongoose/dist/factories';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { User } from './user.schema';
import { Doctor } from './doctor.schema';
import { Patient } from './patient.schema';

export type UserImageDocument = HydratedDocument<UserImage>;

@Schema()
export class UserImage {
  @Prop({
    type: String,
    required: true,
    default: null,
    unique: true,
    index: true
  })
  file_id: string;

  @Prop({
    type: String,
    required: true,
    default: null,
    unique: true,
    index: true
  })
  filename: string;

  @Prop({ type: String, required: true, default: null })
  mimetype: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'User',
    required: true
  })
  user: User;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  })
  doctor: Doctor;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Patient',
    required: true
  })
  patient: Patient;
}

export const UserImageSchema = SchemaFactory.createForClass(UserImage);
