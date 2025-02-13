import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '../../services/translate.service'; // Import your service
import { TranslateHtmlService } from 'src/app/services/translate-html.service';

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.css'],
})
export class TranslateComponent {
  selectedFile: File | null = null;
  translatedText: string = '';
  translatedFile: string = '';
  textToTranslate: string = '';
  targetLanguage: string = 'French'; // Default target language

  constructor(
    private http: HttpClient,
    private translateHtmlService: TranslateHtmlService,
    private translateService: TranslateService // Inject your service
  ) {} // Inject HttpClient

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  translateText() {
    this.translateService.translateText(this.textToTranslate).then(
      (translatedText: string) => this.translatedText = translatedText,
      (error: any) => console.error(error)
    );
  }

  async translateFile() {
    if (!this.selectedFile) {
      alert('Please select a file.');
      return;
    }

    const fileContent = await this.readFileContent(this.selectedFile);
    // Use the service to perform the translation
    try {
      this.translatedFile =
        await this.translateHtmlService.translateHtmlContent(
          fileContent,
          this.targetLanguage
        );
      console.log('response', this.translatedFile);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  private readFileContent(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string); // Use optional chaining
      reader.onerror = (e) => reject(e);
      reader.readAsText(file);
    });
  }
}
