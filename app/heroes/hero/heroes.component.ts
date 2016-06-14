import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router-deprecated';
import { ToasterContainerComponent, ToasterService } from 'angular2-toaster/angular2-toaster';

import { Hero } from '../shared/hero';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { HeroService } from '../shared/hero.service';

@Component({
  selector: 'my-heroes',
  templateUrl: 'app/heroes/hero/heroes.component.html',
  styleUrls: ['app/heroes/hero/heroes.component.css'],
  directives: [HeroDetailComponent, ToasterContainerComponent],
  providers: [ToasterService]
})
export class HeroesComponent implements OnInit {
  heroes = [];
  selectedHero: Hero;
  addingHero: boolean;
  error: any;

  constructor(
    private heroService: HeroService,
    private router: Router,
    private toasterService: ToasterService) { }

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
    if (savedHero) {
      this.toasterService.pop('success', 'Success', 'Successfully saved hero.'); 
      this.getHeroes();
    }
  }

  delete(hero: Hero, event: any) {
    event.stopPropagation();
    this.heroService
      .delete(hero)
      .then(res => {
        this.toasterService.pop('success', 'Success', 'Successfully deleted hero.'); 
        this.heroes = this.heroes.filter(h => h != hero);
        if (this.selectedHero === hero) {
          this.selectedHero = null;
        }
      })
      .catch(error => this.error = error); // TODO: Display error
  }

  trackByHeroes(index: number, hero: Hero) { return hero.id };
}