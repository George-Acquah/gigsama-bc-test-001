// src/llm/llm.service.ts
import { Logger } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators/core';
import axios from 'axios';

@Injectable()
export class LlmService {
  private readonly logger = new Logger(LlmService.name);

  async generateActionSteps(note: string) {
    try {
      const response = await axios.post('https://gemini.flash.api/parse', {
        prompt: `Extract actionable steps (checklist and plan) from this doctor note:\n${note}`
      });

      const { checklist, plan } = response.data;
      return { checklist, plan };
    } catch (error) {
      this.logger.error('LLM API call failed', error);
      throw new Error('Failed to generate actionable steps');
    }
  }
}
