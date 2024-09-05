import { Component, inject } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { TranslateModule } from '@ngx-translate/core';
import moment from 'moment';

@Component({
  selector: 'app-forecast-future',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './forecast-future.component.html',
  styleUrl: './forecast-future.component.scss'
})
export class ForecastFutureComponent {
  weatherService = inject(WeatherService);

  transformDate(date: string) {
    return moment(date).format('DD.MM.YYYY');
  }
}
