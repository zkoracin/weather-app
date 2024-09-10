import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
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
  weatherService = inject(WeatherService)
  languageService = inject(LanguageService);

  onLanguageChange(event: Event) {
    const selectedElement = event.target as HTMLSelectElement;
    this.languageService.updateLang(selectedElement.value);
    this.weatherService.getWeatherForecast();
  }
}
