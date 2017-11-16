import { NwsOffice } from './entities/nwsOffice/nwsOffice';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {catchError, map, tap} from 'rxjs/operators';

import {Impact} from './impact';
import {MessageService} from './message.service';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class ImpactService {

  private impactsUrl = 'http://localhost:8009/api/impacts';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) {}

  /** GET impacts from the server */
  getImpacts(): Observable<Impact[]> {
    const url = `${this.impactsUrl}/impacts`;

    return this.http.get<Impact[]>(url)
      .pipe(
      tap(impacts => {
        this.log(`fetched impacts ` + impacts.length);
        impacts.forEach(i => console.log(i.name))
      }),
      catchError(this.handleError('getimpacts', []))
      );
  }

  /** GET impacts by Nws Office from the server */
  getImpactsByNwsOffice(office: string): Observable<Impact[]> {
    const url = `${this.impactsUrl}/by-office/${office}`;
    return this.http.get<Impact[]>(url)
      .pipe(
      tap(impacts => {
        this.log(`fetched impacts by nws office` + office + impacts.length);
        impacts.forEach(i => console.log(i.name))
      }),
      catchError(this.handleError('getimpacts', []))
      );
  }

  /** GET impact by id. Return `undefined` when id not found */
  getImpactNo404<Data>(id: number): Observable<Impact> {
    const url = `${this.impactsUrl}/?id=${id}`;
    return this.http.get<Impact[]>(url)
      .pipe(
      map(impacts => impacts[0]), // returns a {0|1} element array
      tap(h => {
        const outcome = h ? `fetched` : `did not find`;
        this.log(`${outcome} impact id=${id}`);
      }),
      catchError(this.handleError<Impact>(`getImpact id=${id}`))
      );
  }

  /** GET impact by id. Will 404 if id not found */
  getImpact(id: number): Observable<Impact> {
    const url = `${this.impactsUrl}/${id}`;
    return this.http.get<Impact>(url).pipe(
      tap(impact => {
        this.log(`fetched impact id=${id}, threshold = `+impact.impactThresholdSets[0].name);        
      }),
      catchError(this.handleError<Impact>(`getImpact id=${id}`))
    );
  }

  /* GET impacts whose name contains search term */
  searchImpacts(term: string): Observable<Impact[]> {
    if (!term.trim()) {
      // if not search term, return empty impact array.
      return of([]);
    }
    return this.http.get<Impact[]>(`iris/impacts?name=${term}`).pipe(
      tap(_ => this.log(`found impacts matching "${term}"`)),
      catchError(this.handleError<Impact[]>('searchimpacts', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new impact to the server */
  addImpact(impact: Impact): Observable<Impact> {
    return this.http.post<Impact>(this.impactsUrl, impact, httpOptions).pipe(
      tap((impact: Impact) => this.log(`added impact w/ id=${impact.id}`)),
      catchError(this.handleError<Impact>('addImpact'))
    );
  }

  /** DELETE: delete the impact from the server */
  deleteImpact(impact: Impact | number): Observable<Impact> {
    const id = typeof impact === 'number' ? impact : impact.id;
    const url = `${this.impactsUrl}/${id}`;

    return this.http.delete<Impact>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted impact id=${id}`)),
      catchError(this.handleError<Impact>('deleteImpact'))
    );
  }

  /** PUT: update the impact on the server */
  updateImpact(impact: Impact): Observable<any> {
    return this.http.put(this.impactsUrl, impact, httpOptions).pipe(
      tap(_ => this.log(`updated impact id=${impact.id}`)),
      catchError(this.handleError<any>('updateImpact'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a ImpactService message with the MessageService */
  private log(message: string) {
    this.messageService.add('ImpactService: ' + message);
  }
}
