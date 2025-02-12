import { Injectable } from '@angular/core';
import {
  GenerateContentResult,
  GoogleGenerativeAI,
} from '@google/generative-ai';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TranslateHtmlService {
  private client: GoogleGenerativeAI;

  constructor() {
    this.client = new GoogleGenerativeAI(environment.geminiApiKey);
  }

  async translateHtmlContent(htmlContent: string, targetLanguage: string): Promise<any> {
    const model = this.client.getGenerativeModel({ model: 'gemini-pro' });
    const prompt = `Translate the following HTML content to ${targetLanguage}: ${htmlContent}`;
    const res: any = await model.generateContent(prompt);
    return res.response?.candidates[0]?.content.parts[0].text;
  }
}
