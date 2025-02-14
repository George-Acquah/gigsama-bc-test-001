// src/reminders/reminder.service.ts
import { Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/mongoose/dist/common/mongoose.decorators';
import { Model } from 'mongoose';
import { ActionStep, ActionStepDocument } from '../schemas/action-step.schema';
import { Injectable } from '@nestjs/common/decorators/core';

@Injectable()
export class ReminderService {
  private readonly logger = new Logger(ReminderService.name);

  constructor(
    @InjectModel(ActionStep.name) private stepModel: Model<ActionStepDocument>
  ) {}

  // Runs every minute to check for due reminders
  @Cron(CronExpression.EVERY_MINUTE)
  async checkReminders() {
    this.logger.log('Checking reminders...');

    const now = new Date();
    const steps = await this.stepModel.find({
      dueDate: { $lte: now },
      isCompleted: false
    });

    if (steps.length > 0) {
      steps.forEach((step) => {
        this.logger.log(`Reminder: ${step.description}`);
      });
    }
  }
}
