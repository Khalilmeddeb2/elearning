import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../_models/user.model';

const headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');
@Injectable({
  providedIn: 'root'
})

export class EnseignantService {

  //roles :any []=[];
  private _enseignantUrl="http://localhost:3007/api/enseignants" 
  constructor(private http: HttpClient) { }

  public getEnseignants() :Observable <any> {
    

    return this.http.get<any[]>(this._enseignantUrl, { 'headers': headers }).pipe(response =>
      response)
      }

      createEnseignant(user: any):Observable<Object> {
        return this.http.post(`${this._enseignantUrl}`,user);
      }
      
      deleteEnseignant(id : string)
      {
        return this.http.delete(`${this._enseignantUrl}/${id}`);
      } 

     getEnseignantById(id : string):Observable<User>
      {
        return this.http.get<User>(`${this._enseignantUrl}/${id}`);
    
      } 
      
      EditEnseignants(id:string,user:User):Observable<Object> {
        return this.http.put(`${this._enseignantUrl}/${id}`,user);
      }

      totalEnseignants() {
        return this.http.get(`${this._enseignantUrl}/numberEnseignants`);
      }

      /*totalUtlisateurs() {
        return this.http.get(`${this._userUrl}/numberUtlisateurs`);
      }

      getDirecteurs() {
        return this.http.get(`${this._userUrl}/Directeurs`);
      }*/

      EditSatutEnseignant(id:string):Observable<Object> {
        return this.http.get(`${this._enseignantUrl}/${id}/status`);
      }
}
