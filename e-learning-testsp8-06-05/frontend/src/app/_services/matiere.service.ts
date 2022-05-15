import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Matiere } from '../_models/matiere';

const headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');

@Injectable({
  providedIn: 'root'
})
export class MatiereService {

  matieres :any []=[];
  private _matiereUrl="http://localhost:3007/api/matieres" 
  constructor(private http: HttpClient) { }

  public getMartieres() :Observable <any> {
    

    return this.http.get<any[]>(this._matiereUrl, { 'headers': headers }).pipe(response =>
      response)
      }

      createMatiere(matiere: any):Observable<Object> {
        return this.http.post(`${this._matiereUrl}`,matiere);
      }
      
      deleteMatiere(id : string)
      {
        return this.http.delete(`${this._matiereUrl}/${id}`);
    
      } 
      
      getMatiereById(id : string):Observable<Matiere>
      {
        return this.http.get<Matiere>(`${this._matiereUrl}/${id}`);
    
      } 
      
      EditRole(id:string,matiere:Matiere):Observable<Object> {
        return this.http.put(`${this._matiereUrl}/${id}`,matiere);
      }

      totalClasses() {
        return this.http.get(`${this._matiereUrl}/numberMatieres`);
      }

    
}
