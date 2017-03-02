/**
 * Created by Michael on 2/2/17.
 */
import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';

import {HeroService} from './hero.service';
// To use with route params Observable
import 'rxjs/add/operator/switchMap';
import {Hero} from "./hero";

@Component({
  moduleId: module.id,
  selector: 'my-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})

export class HeroDetailComponent implements OnInit{

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    // switchMap maps id in observable route parameters to new Observable
    this.route.params
      .switchMap((params: Params) =>
        this.heroService.getHero(+params['id'])).subscribe(hero => this.hero = hero); // + coverts int (JS)
  }

  goBack(): void {
    // Careful not to go back too far. Guard with CanDeactivate guard.
    this.location.back();
  }

  @Input() hero: Hero;

}
