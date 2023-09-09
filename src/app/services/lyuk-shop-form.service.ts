import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Country } from '../common/country';
import { State } from '../common/state';

@Injectable({
  providedIn: 'root',
})
export class LyukShopFormService {
  private countryUrl = 'http://localhost:8080/api/countries';
  private statesUrl = 'http://localhost:8080/api/states';

  constructor(private httpClient: HttpClient) {}

  getCountries(): Observable<Country[]> {
    return this.httpClient
      .get<GetResponseCountries>(this.countryUrl)
      .pipe(map((respose) => respose._embedded.countries));
  }

  getStates(theCountryCode: string): Observable<State[]> {
    // search url
    const searchStateUrl = `${this.statesUrl}/search/findByCountryCode?code=${theCountryCode}`;
    return this.httpClient
      .get<GetResponseStates>(searchStateUrl)
      .pipe(map((response) => response._embedded.states));
  }

  getCardMonths(startMonth: number): Observable<number[]> {
    let monthData: number[] = [];

    // build an array for 'Months' dropdown list
    // - start at current month and loop untill end

    for (let theMonth = startMonth; theMonth <= 12; theMonth++) {
      monthData.push(theMonth);
    }
    return of(monthData);
  }

  getCardYears(): Observable<number[]> {
    let yearData: number[] = [];

    // build an array for 'Months' dropdown list
    // - start at current year and end for next 10 years

    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10;

    for (let theYear = startYear; theYear <= endYear; theYear++) {
      yearData.push(theYear);
    }

    return of(yearData);
  }
}

interface GetResponseCountries {
  _embedded: {
    countries: Country[];
  };
}

interface GetResponseStates {
  _embedded: {
    states: State[];
  };
}
