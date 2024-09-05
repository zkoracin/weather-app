import { Component, inject } from '@angular/core';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-forecast-today',
  standalone: true,
  imports: [],
  templateUrl: './forecast-today.component.html',
  styleUrl: './forecast-today.component.scss'
})
export class ForecastTodayComponent {
  weatherService = inject(WeatherService);

}
