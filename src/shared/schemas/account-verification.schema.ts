import { HydratedDocument } from 'mongoose';
import { Prop, Schema } from '@nestjs/mongoose/dist/decorators';
import { SchemaFactory } from '@nestjs/mongoose/dist/factories';

export type AccountVerificationDocument = HydratedDocument<AccountVerification>;

@Schema({ timestamps: true }) // Add timestamps for createdAt and updatedAt fields
export class AccountVerification {
  @Prop({ required: true, unique: true, type: String, index: true })
  verificationToken: string;

  @Prop({ required: true, type: String, index: true })
  email: string;

  @Prop({ type: Date, expires: '24h', default: Date.now }) // Automatically expire documents after 24 hours
  expiresAt: Date;
}

export const AccountVerificationSchema =
  SchemaFactory.createForClass(AccountVerification);
