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
export class EtudiantService {

  private _etudianttUrl="http://localhost:3007/api/etudiants" 
  constructor(private http: HttpClient) { }
  // //pour n'importe quel directeur direteur bien définie
  public getToutesEtudiants() :Observable <any> {
    return this.http.get(`${this._etudianttUrl}/toutesEtudiants`);

  }

  //pour un direteur bien définie
  public getEtudiants() :Observable <any> {
    

    return this.http.get<any[]>(this._etudianttUrl, { 'headers': headers }).pipe(response =>
      response)
      }

      createEtudiant(user: any):Observable<Object> {
        return this.http.post(`${this._etudianttUrl}`,user);
      }
      
      deleteEtudiant(id : string)
      {
        return this.http.delete(`${this._etudianttUrl}/${id}`);
      } 

     getEtudiantById(id : string):Observable<User>
      {
        return this.http.get<User>(`${this._etudianttUrl}/${id}`);
    
      } 
      
      EditEtudiant(id:string,user:User):Observable<Object> {
        return this.http.put(`${this._etudianttUrl}/${id}`,user);
      }

      totalEtudiants() {
        return this.http.get(`${this._etudianttUrl}/numberEtudiants`);
      }

      getEtudiantsByClasse(id :string) :Observable <any>
      {
       return this.http.get(`${this._etudianttUrl}/byClasse/${id}`);
      }
     

     /* totalDirecteurs() {
        return this.http.get(`${this._userUrl}/numberDirecteurs`);
      }

      totalUtlisateurs() {
        return this.http.get(`${this._userUrl}/numberUtlisateurs`);
      }

      getDirecteurs() {
        return this.http.get(`${this._userUrl}/Directeurs`);
      }*/

      EditSatutEtudiant(id:string):Observable<Object> {
        return this.http.get(`${this._etudianttUrl}/${id}/status`);
      }

      getNumberEtudiantsByClasse(id :string) 
      {
       return this.http.get(`${this._etudianttUrl}/numbersEtudiants/byClasse/${id}`);
      }
}
