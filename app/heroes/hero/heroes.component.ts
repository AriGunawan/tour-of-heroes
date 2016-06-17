import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router-deprecated';
import { ToasterContainerComponent, ToasterService } from 'angular2-toaster/angular2-toaster';

import { DisplayNamePipe, Hero, HeroService } from '../shared/index';
import { HeroDetailComponent } from '../hero-detail/index';

@Component({
  selector: 'toh-heroes',
  templateUrl: 'app/heroes/hero/heroes.component.html',
  styleUrls: ['app/heroes/hero/heroes.component.css'],
  directives: [HeroDetailComponent, ToasterContainerComponent],
  providers: [ToasterService],
  pipes: [DisplayNamePipe]
})
export class HeroesComponent implements OnInit {
  // public properties
  heroes = [];
  selectedHero: Hero;
  addingHero: boolean;
  error: any;
  mode = 'Observable';
  errorMessage: string;

  // public methods
  constructor(
    private heroService: HeroService,
    private router: Router,
    private toasterService: ToasterService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes() {
    this.heroService.getHeroes()
                    .subscribe(
                      heroes => this.heroes = heroes,
                      error => this.errorMessage = <any>error
                    );
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
    let link = ['HeroDetail', { id: id, caller: 'Heroes' }];
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
      .subscribe(
        result => {
          this.toasterService.pop('success', 'Success', 'Successfully deleted hero.'); 
          this.heroes = this.heroes.filter(h => h != hero);
          if (this.selectedHero === hero) {
            this.selectedHero = null;
          }},
        error => this.errorMessage = <any>error);
  }

  trackByHeroes(index: number, hero: Hero) { return hero.id };
}