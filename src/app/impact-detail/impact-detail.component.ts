import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Impact }         from '../impact';
import { ImpactService }  from '../impact.service';

@Component({
  selector: 'app-impact-detail',
  templateUrl: './impact-detail.component.html',
  styleUrls: [ './impact-detail.component.css' ]
})
export class ImpactDetailComponent implements OnInit {
  @Input() impact: Impact;

  constructor(
    private route: ActivatedRoute,
    private impactService: ImpactService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.impactService.getImpact(id)
      .subscribe(impact => this.impact = impact);
  }

  goBack(): void {
    this.location.back();
  }

 save(): void {
    this.impactService.updateImpact(this.impact)
      .subscribe(() => this.goBack());
  }
}
