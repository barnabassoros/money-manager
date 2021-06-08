import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { Observable, of, config } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { baseUrl } from './../config';


import { Income } from '../Income';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin' : '*',
                          'Access-Control-Allow-Credentials' : 'true' })
};

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  constructor(private http: HttpClient)
  {}

  create(income: Income): Observable<Income> {
    return this.http.post<Income>(baseUrl + 'income', income, httpOptions).pipe(
      catchError(this.handleError<Income>('addIncome'))
    );
  }


update(income: Income) {
  return this.http.put(baseUrl + 'income', income, httpOptions).pipe(
    catchError(this.handleError<any>('updateIncome')));
}


delete(id: number)
  {
    return this.http.delete(baseUrl + 'income/' + id, httpOptions).pipe(
      catchError(this.handleError<Income>('deleteIncome'))
    );
  }

  get(id: number): Observable<Income> {
    return this.http.get<Income>('/income/${id}').pipe(
      catchError(this.handleError<Income>('getIncome id=${id}'))
    );
  }


  getAll = (): Observable<Income[]> =>
   {
    return this.http.get<Income[]>(baseUrl + 'income/all').pipe
    (
        tap(x => {
          return x;
        }),
        catchError(this.handleError('getincomes', []))
    )};


private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

}