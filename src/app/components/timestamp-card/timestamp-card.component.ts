import { Component, inject } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-timestamp-card',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './timestamp-card.component.html',
  styleUrl: './timestamp-card.component.scss'
})
export class TimestampCardComponent {
  weatherService = inject(WeatherService);

  refreshData() {
    this.weatherService.getWeatherForecast();
  }

}
