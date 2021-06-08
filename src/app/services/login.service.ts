import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { baseUrl } from './../config';

import LoginInputModel from '../models/loginInput.model';
import { Observable, of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin' : '*',
                          'Access-Control-Allow-Credentials' : 'true',
                          'Authorization': 'MoneyManagerSecurity' })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }


  login(loginInputModel: LoginInputModel): Observable<LoginInputModel>
  {
    return this.http.post<LoginInputModel>(baseUrl + 'login', loginInputModel, httpOptions).pipe(
      catchError(this.handleError<any>('login')));
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
