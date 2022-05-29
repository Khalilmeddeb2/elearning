import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Actualite } from '../_models/actualite';
const headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');
  
@Injectable({
  providedIn: 'root'
})
export class ActualiteService {

  actualites :any []=[];
  private _actualiteUrl="http://localhost:3007/api/actualites" 
  constructor(private http: HttpClient) { }

  public getActualites() :Observable <any> {
    

    return this.http.get<any[]>(this._actualiteUrl, { 'headers': headers }).pipe(response =>
      response)
      }

      createActualite(role: any):Observable<Object> {
        return this.http.post(`${this._actualiteUrl}`,role);
      }
      
      deleteActualite(id : string)
      {
        return this.http.delete(`${this._actualiteUrl}/${id}`);
    
      } 
      
      getActualiteById(id : string):Observable<Actualite>
      {
        return this.http.get<Actualite>(`${this._actualiteUrl}/${id}`);
    
      } 
      
      EditActualite(id:string,actualite):Observable<Object> {
        return this.http.put(`${this._actualiteUrl}/${id}`,actualite);
      }

      // totalRoles() {
      //   return this.http.get(`${this._actualiteUrl}/numberRoles`);
      // }
}
