import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { Observable, of, config } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { baseUrl } from './../config';


import { Category } from '../Category';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin' : '*',
                          'Access-Control-Allow-Credentials' : 'true' })
};

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient)
  {}

  create(category: Category): Observable<Category>  {
    return this.http.post<Category>(baseUrl + 'category', category, httpOptions).pipe(
      catchError(this.handleError<Category>('addCategory'))
    );
  }


update(category: Category) {
  return this.http.put(baseUrl + 'category', category, httpOptions).pipe(
    catchError(this.handleError<any>('updateCategory')));
}


delete(id: number)
  {
    return this.http.delete(baseUrl + 'category/' + id, httpOptions).pipe(
      catchError(this.handleError<Category>('deleteCategory'))
    );
  }

  get(id: number): Observable<Category> {
    return this.http.get<Category>('/category/${id}').pipe(
      catchError(this.handleError<Category>('getCategory id=${id}'))
    );
  }


  getAll = (): Observable<Category[]> =>
   {
    return this.http.get<Category[]>(baseUrl + 'category/all').pipe
    (
        tap(x => {
          return x;
        }),
        catchError(this.handleError('getheroes', []))
    )};

private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

}