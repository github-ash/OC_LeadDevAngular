import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Olympic } from '../models/olympic.model';

@Injectable({
  providedIn: 'root',
})

export class OlympicDataService {
  private readonly olympicUrl = './assets/mock/olympic.json';

  constructor(private readonly http: HttpClient) {}

  /** Centralise la lecture des données pour toutes les pages. */
  getCountries(): Observable<Olympic[]> {
    return this.http.get<Olympic[]>(this.olympicUrl);
  }

  /** Retrouve un pays sans exposer la structure du JSON aux composants en utilisant pipe. */
  getCountryByName(countryName: string): Observable<Olympic| undefined> {
    return this.getCountries().pipe(
      map((countries) => countries.find(({ country }) => country === countryName)),
    );
  }
}
