import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { EquinoxesComponent } from '../equinoxes/equinoxes.component';
import { HumidityComponent } from '../humidity/humidity.component';
import { TemperatureChartComponent } from '../temperature-chart/temperature-chart.component';
import { UVComponent } from '../uv/uv.component';
import { WeekDaysComponent } from '../week-days/week-days.component';
import { Subscription } from 'rxjs';
import { WeatherService } from 'src/app/Services/weather.service';
import { weather } from 'src/app/Models/weather.interface';
import { countryData } from 'src/app/Models/currentCountry.interface';
import { dayData } from 'src/app/Models/day.interface';

@Component({
  selector: 'displayWeather',
  standalone: true,
  imports: [
    CommonModule,
    EquinoxesComponent,
    HumidityComponent,
    TemperatureChartComponent,
    UVComponent, WeekDaysComponent],
  templateUrl: './display-weather.component.html',
  styleUrls: ['./display-weather.component.scss'],
  providers: [DatePipe]
})


export class DisplayWeatherComponent {
  subscription!: Subscription;
  @Output() countryMainData: EventEmitter<countryData> = new EventEmitter<countryData>();
  allWeatherData!: weather[];
  currentDayWeather!: weather;
  daysUI!: dayData[];
  currentDayName!: string;
  todayDate!: string;
  UV!: number;
  humidity!: number;
  equinoxes: { sunrise: string, sunset: string } = { sunrise: '', sunset: '' };
  hours!: number[];

  constructor(private _WeatherService: WeatherService, private _DatePipe: DatePipe) { }

  ngOnInit() {
    this.currentDayName = this._DatePipe.transform(new Date(), 'EEEE')!;
    this.todayDate = this._DatePipe.transform(new Date(), 'yyyy-MM-dd')!;
    this.getDefaultCountryWeather();
    this.getUserSearchWeather();
  }

  getDefaultCountryWeather() {
    this.subscription = this._WeatherService.fetchWeatherData().subscribe((data) => {
      this.getCurrentCountryData(data)
    })
  }

  getCurrentCountryData(allResponse: any) {
    let [country, cityName, localtime, weatherState] = [allResponse.location.country, allResponse.location.name, allResponse.location.localtime, allResponse.current.condition.text];
    this.countryMainData.emit({name: country, city: cityName, time: localtime, state: weatherState});
    this.getallThreeDaysWeather(allResponse.forecast.forecastday);
  }

  getallThreeDaysWeather(data: any) {
    const threeDaysWeather = data.map((el: any) => ({
      dayName: this._DatePipe.transform(new Date(el.date), 'EEEE'),
      sunrise: el.astro.sunrise,
      sunset: el.astro.sunset,
      humidity: el.day.avghumidity,
      oldHours: el.hour.map((hr: any) => { return hr['temp_c'] }),
      uv: el.day.uv,
      date: el.date,
      temp: el.day.avgtemp_c,
      icon: `https:${el.day.condition.icon}`
    }));

    this.allWeatherData = threeDaysWeather;
    this.getDaysNameAndStatus();
    this.currentDayWeather = this.allWeatherData[0];
    this.buildUI()
  }

  getDaysNameAndStatus() {
    this.daysUI = this.allWeatherData.map((el: any) => ({ day: el.dayName, temp: el.temp, icon: el.icon }));
  }

  getWeatherOfSelectedDay(day: string) {
    this.currentDayWeather = this.allWeatherData.filter((el) => el.dayName === day)[0];
    this.buildUI()
  }

  buildUI() {
    this.UV = this.currentDayWeather.uv;
    this.humidity = this.currentDayWeather.humidity;
    this.equinoxes.sunrise = this.currentDayWeather.sunrise;
    this.equinoxes.sunset = this.currentDayWeather.sunset;
    this.hours = this.currentDayWeather.oldHours;
  }

  getUserSearchWeather() {
    this.subscription = this._WeatherService.userClicked.subscribe((val) => {
      if (val) this._WeatherService.getUserSearchResult();
    })

    this.subscription = this._WeatherService.result$.subscribe((result) => {
      this.getCurrentCountryData(result)
    })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
