import { Component, inject } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { TranslateModule } from '@ngx-translate/core';
import { MomentDatePipe } from '../../pipes/moment-date.pipe';

@Component({
  selector: 'app-forecast-future',
  standalone: true,
  imports: [TranslateModule, MomentDatePipe],
  templateUrl: './forecast-future.component.html',
  styleUrl: './forecast-future.component.scss'
})
export class ForecastFutureComponent {
  weatherService = inject(WeatherService);
}
