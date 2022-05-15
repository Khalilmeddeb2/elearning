import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Enfant } from '../_models/enfant';

const headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');

@Injectable({
  providedIn: 'root'
})
export class EnfantService {

  private _enfanttUrl="http://localhost:3007/api/enfants" 
  constructor(private http: HttpClient) { }
  
  //pour un direteur bien définie
  public getEnfants() :Observable <any> {
    

    return this.http.get<any[]>(this._enfanttUrl, { 'headers': headers }).pipe(response =>
      response)
      }

      createEnfant(enfant: any):Observable<Object> {
        return this.http.post(`${this._enfanttUrl}`,enfant);
      }
      
      deleteEnfant(id : string)
      {
        return this.http.delete(`${this._enfanttUrl}/${id}`);
      } 

     getEnfantById(id : string):Observable<Enfant>
      {
        return this.http.get<Enfant>(`${this._enfanttUrl}/${id}`);
    
      } 
      
      EditEnfant(id:string,enfant:Enfant):Observable<Object> {
        return this.http.put(`${this._enfanttUrl}/${id}`,enfant);
      }

      getEnfantsByClasse(id :string) :Observable <any>
      {
       return this.http.get(`${this._enfanttUrl}/byClasse/${id}`);
      }
      // totalEtudiants() {
      //   return this.http.get(`${this._etudianttUrl}/numberEtudiants`);
      // }

      // getEtudiantsByClasse(id :string) :Observable <any>
      // {
      //  return this.http.get(`${this._etudianttUrl}/byClasse/${id}`);
      // }
     

     /* totalDirecteurs() {
        return this.http.get(`${this._userUrl}/numberDirecteurs`);
      }

      totalUtlisateurs() {
        return this.http.get(`${this._userUrl}/numberUtlisateurs`);
      }

      getDirecteurs() {
        return this.http.get(`${this._userUrl}/Directeurs`);
      }*/

      // EditSatutEtudiant(id:string):Observable<Object> {
      //   return this.http.get(`${this._etudianttUrl}/${id}/status`);
      // }

      // getNumberEtudiantsByClasse(id :string) 
      // {
      //  return this.http.get(`${this._etudianttUrl}/numbersEtudiants/byClasse/${id}`);
      // }
}
