import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WeatherService } from './services/weather.service';
import { NgxSpinnerComponent } from 'ngx-spinner';
import { TimestampCardComponent } from "./components/timestamp-card/timestamp-card.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgxSpinnerComponent, TimestampCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'weather-app';
  weatherService = inject(WeatherService);

  constructor() {
    this.weatherService.getWeatherForecast();
  }
}