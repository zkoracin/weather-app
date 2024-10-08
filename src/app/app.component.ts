import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WeatherService } from './services/weather.service';
import { NgxSpinnerComponent } from 'ngx-spinner';
import { TimestampCardComponent } from "./components/timestamp-card/timestamp-card.component";
import { ForecastTodayComponent } from "./components/forecast-today/forecast-today.component";
import { ForecastFutureComponent } from "./components/forecast-future/forecast-future.component";
import { HeaderComponent } from "./components/header/header.component";
import { LanguageService } from './services/language.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgxSpinnerComponent, TimestampCardComponent, ForecastTodayComponent, ForecastFutureComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'weather-app';
  weatherService = inject(WeatherService);
  langService = inject(LanguageService);

  constructor() {
    this.langService.setDefaultLang();
    this.weatherService.getStoredWeatherData();
  }
}