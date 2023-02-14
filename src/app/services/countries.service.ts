import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '../models/country.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private readonly BASE_URL = 'https://restcountries.com/v3.1/all'

  constructor(
    private httpClient: HttpClient
  ) { }

  public getCountries(): Observable<Country[]> {
    return this.httpClient.get<Country[]>(this.BASE_URL)
  }
}
