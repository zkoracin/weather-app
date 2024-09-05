import { Component, inject } from '@angular/core';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-forecast-future',
  standalone: true,
  imports: [],
  templateUrl: './forecast-future.component.html',
  styleUrl: './forecast-future.component.scss'
})
export class ForecastFutureComponent {
  weatherService = inject(WeatherService);
}
