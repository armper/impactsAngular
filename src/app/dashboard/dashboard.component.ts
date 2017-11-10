import { NwsOffice } from '../entities/nwsOffice/nwsOffice';
import {Component, OnInit} from '@angular/core';
import {Impact} from '../impact';
import {ImpactService} from '../impact.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  impacts: Impact[] = [];

  constructor(private impactService: ImpactService) {}

  ngOnInit() {
    this.getImpacts('MPX');
  }

  getImpacts(office): void {
    this.impactService.getImpactsByNwsOffice(office)
      .subscribe(impacts => this.impacts = impacts.slice(1, 5));
  }
}
