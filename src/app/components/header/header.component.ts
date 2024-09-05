import { Component, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { WeatherService } from '../../services/weather.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  translationService = inject(TranslateService);
  weatherService = inject(WeatherService)
  languageService = inject(LanguageService);
  selectedLang = this.languageService.getLanguages()[0];

  onLanguageChange(event: any) {
    this.translationService.use(event.target.value);
    this.weatherService.getWeatherForecast();
  }
}
