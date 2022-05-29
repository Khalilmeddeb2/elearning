import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import {  HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class VisitorsService {

  constructor(  private http: HttpClient) { }

  getIpAddress() {
    return this.http
          .get('https://api.ipify.org/?format=json')
          .pipe(
            catchError(this.handleError)
          );
  } 


  getGEOLocation(ip) {

    //let headers = new HttpHeaders();
      let url = "https://api.ipgeolocation.io/ipgeo?apiKey=0f4e06b0721a4a2b82bce38abc80b31a&ip="+ip; 
        return this.http
              .get(url)
              .pipe(
                catchError(this.handleError)
              );
      } 

  private handleError(error: HttpErrorResponse ,contry) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
        contry="Be"
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`,
         'contry',contry
        );
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}
