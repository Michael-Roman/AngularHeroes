import {Injectable} from '@angular/core';
import {Http, Headers} from "@angular/http";

import 'rxjs/add/operator/toPromise'; // A RxJS library

import {Hero} from './hero';

@Injectable()
export class HeroService {

  private heroesUrl = 'api/heroes'; //URL to web api

  constructor (private http: Http) {}

  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl) //returns RxJS Observable
      .toPromise().then(response => response.json().data as Hero[]) // Converts Observable to a promise. Adjust the then as API requires in real world.
      .catch(this.handleError);
  }

  getHero(id: number): Promise<Hero> {
    const url = '${this.heroesUrl}/${id}';

    return this.http.get(url)
      .toPromise().then(response => response.json().data as Hero)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);

    return Promise.reject(error.message || error);
  }
}
