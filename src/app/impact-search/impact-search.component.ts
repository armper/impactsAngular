import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import { of }         from 'rxjs/observable/of';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Impact } from '../impact';
import { ImpactService } from '../impact.service';

@Component({
  selector: 'app-impact-search',
  templateUrl: './impact-search.component.html',
  styleUrls: [ './impact-search.component.css' ]
})
export class ImpactSearchComponent implements OnInit {
  impacts$: Observable<Impact[]>;
  private searchTerms = new Subject<string>();

  constructor(private impactService: ImpactService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.impacts$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.impactService.searchImpacts(term)),
    );
  }
}
