import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Forecast, List, WeatherApiResponse } from '../interfaces/weather.interface';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';
import moment from 'moment';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private http = inject(HttpClient);
  private baseUrl = environment.baseUrl;
  private apiKey = environment.apiKey;

  forecastCity = signal<string | null>(null);
  forecastFetched = signal<string | null>(null);
  forecastToday = signal<Forecast | null>(null);
  forecastFuture = signal<Forecast[] | null>(null);

  getWeatherForecast() {
    const params = this.setUrlParams();
    this.http.get<WeatherApiResponse>(this.baseUrl, {params}).pipe(
      map(res => {
        const city = res.city.name;
        const list = res.list;
        const groupedData = list.reduce((acc, item) => {
          const date = item.dt_txt.split(' ')[0];
          if (!acc[date]) {
            acc[date] = [];
          }
          acc[date].push({
            ...item
          });
          return acc;
        }, {} as Record<string, List[]>);
      
        const formattedData = Object.entries(groupedData).map(([date, forecasts]) => ({
          date: date,
          dateForecasts: forecasts
        }));
      
        return {
          city,
          forecasts: formattedData
        };
      })
    ).subscribe(res => {
      this.forecastToday.set(res.forecasts[0]);
      this.forecastFuture.set(res.forecasts.slice(1));
      this.forecastCity.set(res.city);
      this.forecastFetched.set(moment().format('DD.MM.YYYY HH:mm:ss'));
    });
  }

  private setUrlParams(lang='en', lat='46.5547', lon='15.6467', units='metric') {
    let params = new HttpParams();
    params = params.append('lat', lat);
    params = params.append('lon', lon);
    params = params.append('units', units);
    params = params.append('lang', lang);
    params = params.append('appid', this.apiKey);
    return params;
  }
}
