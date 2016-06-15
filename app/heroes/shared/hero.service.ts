import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';

const heroesBaseUrl = 'http://localhost:3002/api/v1/heroes';

@Injectable()
export class HeroService {
    // public methods
    constructor(
        private http: Http
    ){}

    getHeroes(): Promise<Hero[]> {
        let url = `${heroesBaseUrl}/all.json`;
        return this.http.get(url)
                   .toPromise()
                   .then(response => response.json().heroes)
                   .catch(this.handleError);
    }

    getHero(id: number) {
        let url = `${heroesBaseUrl}/${id}.json`;
        return this.http.get(url)
                   .toPromise()
                   .then(response => response.json().hero)
                   .catch(this.handleError);
    }

    // Get last hero
    getLast(qty:number) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let url = `${heroesBaseUrl}/last/${qty}.json`;
        return this.http
                   .post(url, '', {headers: headers})
                   .toPromise()
                   .then(response => response.json().heroes)
                   .catch(this.handleError);
    }

    // Delete hero
    delete(hero: Hero) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let url = `${heroesBaseUrl}/${hero.id}`;

        return this.http
                   .delete(url, headers)
                   .toPromise()
                   .catch(this.handleError);
    }

    save(hero: Hero): Promise<Hero> {
        if (hero.id) {
            return this.put(hero);
        }
        return this.post(hero);
    }

    // private methods
    private handleError(error: any) {
        console.error('An error occured', error);
        return Promise.reject(error.message || error);
    }

    // Add new hero
    private post(hero: Hero): Promise<Hero> {
        let headers = new Headers({
            'Content-Type': 'application/json'
        });
        
        let url = `${heroesBaseUrl}.json`;
        return this.http
                   .post(url, JSON.stringify(hero), {headers: headers})
                   .toPromise()
                   .then(response => response.json().hero)
                   .catch(this.handleError);
    }

    // Update existing hero
    private put(hero: Hero) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let url = `${heroesBaseUrl}/${hero.id}.json`;

        return this.http
                   .put(url, JSON.stringify(hero), {headers: headers})
                   .toPromise()
                   .then(() => hero)
                   .catch(this.handleError);
    }
}