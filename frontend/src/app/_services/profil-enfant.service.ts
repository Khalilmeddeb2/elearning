import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');

@Injectable({
  providedIn: 'root'
})
export class ProfilEnfantService {

  product :any []=[];
  private _profilEnfantUrl="http://localhost:3007/api/profilsEnfants" 
  constructor(private http: HttpClient) { }

  public getProfils(id : string) :Observable <any> {
    
    return this.http.get(`${this._profilEnfantUrl}/${id}`);
    
      }

    deleteProfil(id : string):Observable<Object>
      {
        return this.http.delete(`${this._profilEnfantUrl}/${id}`);
    
      }   
      
      createProfil(id: string,profilEnfant):Observable<Object> {
        return this.http.post(`${this._profilEnfantUrl}/${id}`,profilEnfant);
      }

      // getProfilById(id : string):Observable<Profil>
      // {
      //   return this.http.get<Profil>(`${this._profilEnfantUrl}/${id}`);
    
      // } 

      // getProfilUser() :Observable <any> {
      //   return this.http.get<any[]>(`${this._profilEnfantUrl}/profilUser`, { 'headers': headers }).pipe(response =>
      //     response)
      // }
    
      // EditProfil(id:string,profil):Observable<Object> {
      //   return this.http.put(`${this._profilEnfantUrl}/${id}`,profil);
      // }
}
