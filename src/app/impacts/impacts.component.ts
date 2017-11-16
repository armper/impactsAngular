import {NwsOffice} from '../entities/nwsOffice/nwsOffice';
import {Component, OnInit} from '@angular/core';

import {Impact} from '../impact';
import {ImpactService} from '../impact.service';

@Component({
  selector: 'app-impacts',
  templateUrl: './impacts.component.html',
  styleUrls: ['./impacts.component.css']
})
export class ImpactsComponent implements OnInit {
  impacts: Impact[];

  constructor(private impactService: ImpactService) {}

  ngOnInit() {
    this.getImpactsByNwsOffice('ABQ');
  }

  getImpactsByNwsOffice(office: string) {
    this.impactService.getImpactsByNwsOffice(office)
      .subscribe(impacts => this.impacts = impacts);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {return;}
    this.impactService.addImpact({name} as Impact)
      .subscribe(impact => {
        this.impacts.push(impact);
      });
  }

  delete(impact: Impact): void {
    this.impacts = this.impacts.filter(h => h !== impact);
    this.impactService.deleteImpact(impact).subscribe();
  }

}
