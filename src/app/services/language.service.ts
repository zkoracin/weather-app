import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private languages = [
    {code: 'en', name: "English"},
    {code: 'sl', name: "Slovenian"}
  ];

  getLanguages() {
    return this.languages;
  }
}
