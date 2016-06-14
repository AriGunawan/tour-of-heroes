import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';
import { Router } from '@angular/router-deprecated';

import { Hero } from '../shared/hero';
import { HeroService } from '../shared/hero.service';
import { POWERS } from '../shared/power'

@Component({
    selector: 'my-hero-detail',
    templateUrl: 'app/heroes/hero-detail/hero-detail.component.html',
    styleUrls: ['app/heroes/hero-detail/hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
    @Input() hero: Hero;
    @Output() close = new EventEmitter();
    navigated: boolean;
    error: any;
    powers = POWERS;

    constructor(
        private heroService: HeroService,
        private routeParams: RouteParams,
        private router: Router
    ) {       
    }

    ngOnInit(){
        if (this.routeParams.get('id') !== null) {
            let id = +this.routeParams.get('id');
            this.navigated = true;
            this.heroService.getHero(id)
                .then(hero => this.hero = hero);
        } else {
            this.navigated = false;
            this.hero = new Hero();
        }
    }

    goBack(savedHero: Hero = null) {
        this.close.emit(savedHero);
        if (this.navigated) {
            this.navigated = false;
            window.history.back();
        };
    }

    onSubmit() {
        this.heroService
            .save(this.hero)
            .then(hero => {
                this.hero = new Hero(); // saved hero, w/ id if new
                this.goBack(hero);
            })
            .catch(error => this.error = error); // TODO: Display error message
    }
}