import { inject, Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageObject } from '../interfaces/language.interface';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private languages = [
    {code: 'en', name: "English"},
    {code: 'sl', name: "Slovenian"}
  ];

  translateService = inject(TranslateService);
  selectedLang = signal<LanguageObject | null>(null);

  getLanguages() {
    return this.languages;
  }

  setDefaultLang() {
    // First check for stored language
    const storedLang = localStorage.getItem('weather_lang');
    if (storedLang) {
      this.setLang(JSON.parse(storedLang));
      return;
    }

    // Nothing in storage -> use browser lang if supported in app
    const browserLang = this.translateService.getBrowserLang();
    const supportedLang = this.languages.find(lang => lang.code === browserLang);
    if (!supportedLang) {
      this.setLang(this.languages[0]);
    } else {
      this.setLang(supportedLang);
    }
  }

  updateLang(langCode: string) {
    const lang = this.languages.find(lang => lang.code === langCode)!;
    this.setLang(lang);
  }

  private setLang(lang: LanguageObject) {
    this.translateService.use(lang.code);
    this.selectedLang.set(lang);
    localStorage.setItem('weather_lang', JSON.stringify(lang));
  }
}
