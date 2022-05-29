import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Etablissement } from '../_models/etablissement';

const headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');


@Injectable({
  providedIn: 'root'
})
export class EtablissementService {

  roles :any []=[];
  private _etablissementrUrl="http://localhost:3007/api/etablissements" 
  constructor(private http: HttpClient) { }

  public getEtablissements() :Observable <any> {
    

    return this.http.get<any[]>(this._etablissementrUrl, { 'headers': headers }).pipe(response =>
      response)
      }

      createEtablissement(etbalissement: any):Observable<Object> {
        return this.http.post(`${this._etablissementrUrl}`,etbalissement);
      }
      
      deleteEtablissement(id : string)
      {
        return this.http.delete(`${this._etablissementrUrl}/${id}`);
      } 

     getEtablissementsById(id : string):Observable<Etablissement>
      {
        return this.http.get<Etablissement>(`${this._etablissementrUrl}/${id}`);
    
      } 
      
      EditEtablissement(id:string,etablissement:Etablissement):Observable<Object> {
        return this.http.put(`${this._etablissementrUrl}/${id}`,etablissement);
      }

      totalEtablissements() {
        return this.http.get(`${this._etablissementrUrl}/numberEtablissements`);
      }

      totalRoles() {
        return this.http.get(`${this._etablissementrUrl}/numberEtablissements`);
      }

      EditSatutsEtablissement(id:string):Observable<Object> {
        return this.http.get(`${this._etablissementrUrl}/${id}/status`);
      }

      getRolesEtablissmeentById(id:string):Observable<Object> {
        return this.http.get(`${this._etablissementrUrl}/${id}/roles`);
      }
}

