import { Component, inject } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-forecast-today',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './forecast-today.component.html',
  styleUrl: './forecast-today.component.scss'
})
export class ForecastTodayComponent {
  weatherService = inject(WeatherService);

}
