import { Component, EventEmitter, OnInit, Input, Output, ElementRef } from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';
import { Router } from '@angular/router-deprecated';

import { Hero, HeroService, POWERS } from '../shared/index';
import { AppConfig } from '../config/index';

@Component({
    selector: 'toh-hero-detail',
    templateUrl: 'app/heroes/hero-detail/hero-detail.component.html',
    styleUrls: ['app/heroes/hero-detail/hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
    // public properties
    @Input() hero: Hero;
    @Output() close = new EventEmitter();
    error: any;
    powers = POWERS;
    pictureLink: string;
    errorMessage: string;
    caller: string;

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
            this.caller = this.routeParams.get('caller');
            this.heroService.getHero(id)
                .subscribe( hero => {
                    this.hero = hero;
                    this.generatePictureLink(hero.picture);
                });
        } else {
            this.caller = null;
            this.hero = new Hero();
            this.generatePictureLink();
        }
    }

    goBack(savedHero: Hero = null) {
        this.close.emit(savedHero);
        if (this.caller) {
            this.router.navigate([this.caller]);
        } else {
            this.router.navigate(['Heroes']);
        }
    }

    base64(file: any, callback: (result: any) => any) {
        let result: any = {};
        function readerOnload(e: any) {
            // Show preview
            this.pictureLink = e.target.result;

            // Generate base64
            let base64 = btoa(e.target.result);
            result.base64 = base64;
            callback(result);
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
            // Preview picture
            this.pictureLink = URL.createObjectURL(input.files[0]);

            this.base64(input.files[0], data => {
                let prefix = 'data:' + data.filetype + ';base64,';
                this.hero.picture = prefix + data.base64;
            });
        }
    }

    onSubmit() {
        this.heroService
            .save(this.hero)
            .subscribe(                
                hero => {
                    this.goBack(hero);},
                error => this.errorMessage = <any>error);
    }

    generatePictureLink(picture?: any) {
        let url;
        if (picture && picture.picture && picture.picture.url) {
            url = picture.picture.url;
        } else {
            url = AppConfig.DEFAULT_HERO_PICTURE;
        }
        this.pictureLink = AppConfig.API_BASE_URL + url;
    }

    isShowBackButton() {
        return this.caller || !this.routeParams.get('id');
    }
}