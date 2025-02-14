import { UseGuards, Controller } from '@nestjs/common/decorators/core';
import { Post, Body, Get, Param } from '@nestjs/common/decorators/http';
import { JwtAuthGuard } from 'src/shared/guards/Jwt.guard';
import { NotesService } from './notes.service';
import { User } from 'src/shared/decorators/user.decorator';
@UseGuards(JwtAuthGuard)
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post('submit')
  async submitNote(
    @User('_id') doctorId: string,
    @Body() body: { patientId: string; encryptedNote: string }
  ) {
    return this.notesService.submitDoctorNote({
      doctorId,
      patientId: body.patientId,
      encryptedNote: body.encryptedNote
    });
  }

  @Get('patient/:patientId')
  async getNotesByPatient(@Param('patientId') patientId: string) {
    return this.notesService.getNotesByPatient(patientId);
  }

  @Post('complete-step/:stepId')
  async completeStep(@Param('stepId') stepId: string) {
    return this.notesService.completeActionStep(stepId);
  }
}
