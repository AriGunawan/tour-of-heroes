import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router-deprecated';

import { Hero } from  '../shared/hero';
import { HeroService } from '../shared/hero.service';

@Component({
    selector: 'my-dashboard',
    templateUrl: 'app/heroes/dashboard/dashboard.component.html',
    styleUrls: ['app/heroes/dashboard/dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    heroes: Hero[] = [];
    lastQty: number = 4

    constructor(
        private heroService: HeroService,
        private router: Router) { }
    
    ngOnInit() {
        this.heroService.getLast(this.lastQty)
            .then(heroes => this.heroes = heroes);
    }

    gotoDetail(hero: Hero){
        let link = ['HeroDetail', { id: hero.id }];
        this.router.navigate(link);
    }
 }