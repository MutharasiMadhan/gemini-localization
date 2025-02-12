import { Injectable } from '@angular/core';
import {
  GenerateContentResult,
  GoogleGenerativeAI,
} from '@google/generative-ai';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  private client: GoogleGenerativeAI;
  constructor() {
    this.client = new GoogleGenerativeAI(environment.geminiApiKey);
  }

  async translateText(text: string): Promise<any> {
    const model = this.client.getGenerativeModel({ model: 'gemini-pro' });
    const prompt = text;
    const res: any = await model.generateContent(prompt);
    return res.response?.candidates[0]?.content.parts[0].text;
  }
}
