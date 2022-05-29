import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profil } from '../_models/profil';

const headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');

@Injectable({
  providedIn: 'root'
})
export class ProfilService {

  product :any []=[];
  private _profilUrl="http://localhost:3007/api/profils" 
  constructor(private http: HttpClient) { }

  public getProfils() :Observable <any> {
    

    return this.http.get<any[]>(this._profilUrl, { 'headers': headers }).pipe(response =>
      response)
      }

    deleteProfil(id : string):Observable<Object>
      {
        return this.http.delete(`${this._profilUrl}/${id}`);
    
      }   
      
      createProfil(profil):Observable<Object> {
        return this.http.post(`${this._profilUrl}`,profil);
      }

      getProfilById(id : string):Observable<Profil>
      {
        return this.http.get<Profil>(`${this._profilUrl}/${id}`);
    
      } 

      getProfilUser() :Observable <any> {
        return this.http.get<any[]>(`${this._profilUrl}/profilUser`, { 'headers': headers }).pipe(response =>
          response)
      }
    
      EditProfil(id:string,profil):Observable<Object> {
        return this.http.put(`${this._profilUrl}/${id}`,profil);
      }
}
