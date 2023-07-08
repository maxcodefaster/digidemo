import { Injectable } from '@angular/core';
import { first } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

export const availableLanguages = ['en', 'de'];

@Injectable({
  providedIn: 'root',
})
export class LocalizationService {
  private readonly initSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private localCountryCode = 'us';
  private localCountryName: string;

  constructor(
  ) {
    this.getCountryCode();
  }

  get countryCode(): string {
    return this.localCountryCode;
  }

  get init() {
    return this.initSubject.pipe(first((init) => init)).toPromise();
  }

  private async getCountryCode() {
    const res = await fetch('https://api.ipgeolocation.io/ipgeo?apiKey=d7ed00e2cd564ed881991a9566883279&fields=country_code2,country_name');
    const payload = await res.json();
    this.localCountryName = payload.country_name;
    if (availableLanguages.includes(payload.country_code2.toLowerCase())) {
      this.localCountryCode = payload.country_code2.toLowerCase();
    }
    this.initSubject.next(true);
  }
}
