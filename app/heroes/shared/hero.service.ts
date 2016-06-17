import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AppConfig } from '../config/index';
import { Hero } from './hero';

const apiBaseUrl = 'http://localhost:3002/api/v1/heroes';

@Injectable()
export class HeroService {
    // public methods
    constructor(
        private http: Http
    ){}

    getHeroes(): Observable<Hero[]> {
        let url = `${apiBaseUrl}/all.json`;
        return this.http.get(url)
                   .map(this.extractHeroesData)
                   .catch(this.handleError);
    }

    getHero(id: number): Observable<Hero> {
        let url = `${apiBaseUrl}/${id}.json`;
        return this.http.get(url)
                   .map(this.extractHeroData)
                   .catch(this.handleError);
    }

    // Get last hero
    getLast(qty:number): Observable<Hero[]> {
        let url = `${apiBaseUrl}/last/${qty}.json`;
        return this.http
                   .get(url)
                   .map(this.extractHeroesData)
                   .catch(this.handleError);
    }

    // Delete hero
    delete(hero: Hero): Observable<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let url = `${apiBaseUrl}/${hero.id}`;

        return this.http
                   .delete(url, headers)
                   .catch(this.handleError);
    }

    save(hero: Hero): Observable<Hero> {
        if (hero.id) {
            return this.put(hero);
        }
        return this.post(hero);
    }

    // private methods
    private handleError(error: any) {
        // TODO: remote logging infrastracture
        let errMsg = (error.message) ? error.message : 
            ((error.status) ? `${error.status} - ${error.statusText}` : 'Server error');
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }

    // Add new hero
    private post(hero: Hero): Observable<Hero> {
        let body = JSON.stringify(hero);
        let headers = new Headers({
            'Content-Type': 'application/json'
        });
        let options = new RequestOptions({ headers: headers});
        let url = `${apiBaseUrl}.json`;

        return this.http
                   .post(url, body, options)
                   .map(this.extractHeroData)
                   .catch(this.handleError);
    }

    // Update existing hero
    private put(hero: Hero): Observable<Hero> {
        let body = JSON.stringify(hero);
        let headers = new Headers({
            'Content-Type': 'application/json'
        });
        let options = new RequestOptions({ headers: headers});
        let url = `${apiBaseUrl}/${hero.id}.json`;

        return this.http
                   .put(url, body, options)
                   .map(this.extractHeroData)
                   .catch(this.handleError);
    }

    private extractHeroesData(res: Response) {
        let body = res.json();
        return body.heroes || {};
    }

    private extractHeroData(res: Response) {
        let body = res.json();
        return body.hero || {};
    }
}