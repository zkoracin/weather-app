import { Component, inject } from '@angular/core';
import { WeatherService } from '../../services/weather.service';


@Component({
  selector: 'app-timestamp-card',
  standalone: true,
  imports: [],
  templateUrl: './timestamp-card.component.html',
  styleUrl: './timestamp-card.component.scss'
})
export class TimestampCardComponent {
  weatherService = inject(WeatherService);

}
