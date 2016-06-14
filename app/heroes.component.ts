import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router-deprecated';

import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from './hero.service';
import { Hero } from './hero';

@Component({
  selector: 'my-heroes',
  templateUrl: 'app/heroes.component.html',
  styleUrls: ['app/heroes.component.css'],
  directives: [HeroDetailComponent]
})
export class HeroesComponent implements OnInit { 
  heroes = [];  
  selectedHero: Hero;
  addingHero: boolean;
  error: any;

  constructor(
    private heroService: HeroService,
    private router: Router) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes() {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

  onSelect(hero: Hero) {
    // Check whether it is clicked on same item
    if (hero == this.selectedHero) {
      this.selectedHero = null;
    } else {
      this.selectedHero = hero;
      this.addingHero = false;
    }
  }

  gotoDetail() {
    let id = this.selectedHero.id;
    let link = ['HeroDetail', { id: id }];
    this.router.navigate(link);
  }

  addHero() {
    this.addingHero = true;
    this.selectedHero = null;
  }

  close(savedHero: Hero) {
    this.addingHero = false;
    if (savedHero) { this.getHeroes(); }
  }

  delete(hero: Hero, event: any) {
    event.stopPropagation();
    this.heroService
        .delete(hero)
        .then( res => {
          this.heroes = this.heroes.filter(h => h != hero);
          if (this.selectedHero === hero) {
            this.selectedHero = null;
          }
        })
        .catch(error => this.error = error); // TODO: Display error
  }
}