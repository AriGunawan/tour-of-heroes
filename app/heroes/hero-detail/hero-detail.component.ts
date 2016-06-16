import { Component, EventEmitter, OnInit, Input, Output, ElementRef } from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';
import { Router } from '@angular/router-deprecated';

import { Hero, HeroService, POWERS } from '../shared/index';

const baseUrl = "http://localhost:3002";

@Component({
    selector: 'toh-hero-detail',
    templateUrl: 'app/heroes/hero-detail/hero-detail.component.html',
    styleUrls: ['app/heroes/hero-detail/hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
    // public properties
    @Input() hero: Hero;
    @Output() close = new EventEmitter();
    navigated: boolean;
    error: any;
    powers = POWERS;

    // public methods
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

    base64(file: any, callback: (result: any) => any) {
        let result: any = {};
        function readerOnload(e: any) {
          let base64 = btoa(e.target.result);
          result.base64 = base64;
          callback(result)
        };

        let reader = new FileReader();
        reader.onload = readerOnload;

        result.filetype = file.type;
        result.size = file.size;
        result.filename = file.name;
        reader.readAsBinaryString(file);
      }

    onFileChange(fileInput: any){
        let input = fileInput.target;

        if (input && input.files && input.files[0]) {
            this.base64(input.files[0], data => {
                let prefix = 'data:' + data.filetype + ';base64,';
                this.hero.picture = prefix + data.base64;
            })
        }
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

    generatePictureLink(picture: any) {
        let url;
        if (picture && picture.picture && picture.picture.url) {
            url = picture.picture.url;
        } else {
            url = "/hero-default.jpg";
        }
        return baseUrl + url;
    }
}