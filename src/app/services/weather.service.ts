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
      const timestamp = moment().format('DD.MM.YYYY HH:mm:ss');
      this.setDataSignals(res.forecasts[0], res.forecasts.slice(1), res.city, timestamp);
      this.saveWeatherData(res.forecasts[0], res.forecasts.slice(1), res.city, timestamp);
    });
  }

  saveWeatherData(today: Forecast, future: Forecast[], city: string, timestamp: string) {
    localStorage.setItem('weather_data', JSON.stringify({today, future, city, timestamp}));
  }

  getStoredWeatherData() {
    const data = localStorage.getItem('weather_data');
    if (data) {
      const parsedData = JSON.parse(data);
      this.setDataSignals(parsedData.today, parsedData.future, parsedData.city, parsedData.timestamp);
      // Simulate slow loading
      if (!environment.production) {
        setTimeout(() => {
          this.getWeatherForecast();
        }, 3000);
      }
    } else {
      this.getWeatherForecast();
    }
  }

  private setDataSignals(today: Forecast, future: Forecast[], city: string, timestamp: string) {
    this.forecastToday.set(today);
    this.forecastFuture.set(future);
    this.forecastCity.set(city);
    this.forecastFetched.set(timestamp);
  }

  private setUrlParams(lat='46.5547', lon='15.6467', units='metric') {
    const lang = localStorage.getItem('weather_lang')!;
    let params = new HttpParams();
    params = params.append('lat', lat);
    params = params.append('lon', lon);
    params = params.append('units', units);
    params = params.append('lang', JSON.parse(lang).code);
    params = params.append('appid', this.apiKey);
    return params;
  }
}
