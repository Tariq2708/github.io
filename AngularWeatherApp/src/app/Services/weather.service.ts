import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
    key: string = 'c22e51960dac495ca4565757211809';
    userSearch!: string;
    userClicked: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    resultSubject = new Subject<any>();
    result$ = this.resultSubject.asObservable();
    defaultCountry!: string;
    validSearch = new Subject<boolean>();

    constructor(private _HttpClient: HttpClient) { }
    fetchWeatherData(city: string = this.defaultCountry ) {    
        return this._HttpClient.get<any>(`https://api.weatherapi.com/v1/forecast.json?key=${this.key}&q=${city.toLocaleLowerCase()}&days=3`);
    }

    getUserSearchResult() {
        this.fetchWeatherData(this.userSearch).subscribe({
            next: (val) => this.resultSubject.next(val),
            error: (err) => console.log(err) 
        })
    }
  
    isValidCountry(userCountry: string) {   
        this.userSearch = userCountry;   
        this.fetchWeatherData(userCountry).subscribe({
            next: (val) => {
                if(val) this.validSearch.next(true)
            },
            error: (err) => {
                if(err) this.validSearch.next(false)
            }
        })
    }

} 