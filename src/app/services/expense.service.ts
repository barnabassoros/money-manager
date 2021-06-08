import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { Observable, of, config } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { baseUrl } from './../config';


import { Expense } from '../Expense';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin' : '*',
                          'Access-Control-Allow-Credentials' : 'true' })
};

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private http: HttpClient)
  {}

  create(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(baseUrl + 'expense', expense, httpOptions).pipe(
      catchError(this.handleError<Expense>('addExpense'))
    );
  }


update(expense: Expense) {
  return this.http.put(baseUrl + 'expense', expense, httpOptions).pipe(
    catchError(this.handleError<any>('updateExpense')));
}


delete(id: number)
  {
    return this.http.delete(baseUrl + 'expense/' + id, httpOptions).pipe(
      catchError(this.handleError<Expense>('deleteExpense'))
    );
  }

  get(id: number): Observable<Expense> {
    return this.http.get<Expense>('/expense/${id}').pipe(
      catchError(this.handleError<Expense>('getExpense id=${id}'))
    );
  }


  getAll = (): Observable<Expense[]> =>
   {
    return this.http.get<Expense[]>(baseUrl + 'expense/all').pipe
    (
        tap(x => {
          return x;
        }),
        catchError(this.handleError('getExpense', []))
    )};


private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

}