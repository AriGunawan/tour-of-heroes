import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router-deprecated';

import { Hero, HeroService, HighlightDirective } from '../shared/index';

@Component({
    selector: 'toh-dashboard',
    templateUrl: 'app/heroes/dashboard/dashboard.component.html',
    styleUrls: ['app/heroes/dashboard/dashboard.component.css'],
    directives: [HighlightDirective]
})
export class DashboardComponent implements OnInit {
    // public properties
    heroes: Hero[] = [];
    lastQty: number = 4

    // public methods
    constructor(
        private heroService: HeroService,
        private router: Router) { }
    
    ngOnInit() {
        this.heroService.getLast(this.lastQty)
            .subscribe(heroes => this.heroes = heroes);
    }

    gotoDetail(hero: Hero){
        let link = ['HeroDetail', { id: hero.id, caller: 'Dashboard' }];
        this.router.navigate(link);
    }
 }