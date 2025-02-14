// src/notes/schemas/action-step.schema.ts
import { Prop, Schema } from '@nestjs/mongoose/dist/decorators';
import { SchemaFactory } from '@nestjs/mongoose/dist/factories';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type ActionStepDocument = ActionStep & Document;

@Schema({ timestamps: true })
export class ActionStep {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'DoctorNote',
    required: true
  })
  noteId: MongooseSchema.Types.ObjectId;

  @Prop({ required: true, enum: ['CHECKLIST', 'PLAN'] })
  type: 'CHECKLIST' | 'PLAN';

  @Prop({ required: true })
  description: string;

  @Prop({ type: Date, required: true })
  dueDate: Date;

  @Prop({ default: false })
  isCompleted: boolean;
}

export const ActionStepSchema = SchemaFactory.createForClass(ActionStep);
