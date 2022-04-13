import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Classe } from '../_models/classe';

const headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');

@Injectable({
  providedIn: 'root'
})
export class ClasseService {

  private _classeUrl="http://localhost:3007/api/classes" 
  constructor(private http: HttpClient) { }

  public getClasses() :Observable <any> {
    

    return this.http.get<any[]>(this._classeUrl, { 'headers': headers }).pipe(response =>
      response)
      }

      createClasse(classe: any):Observable<Object> {
        return this.http.post(`${this._classeUrl}`,classe);
      }
      
      deleteClasse(id : string)
      {
        return this.http.delete(`${this._classeUrl}/${id}`);
      } 

     getClasseById(id : string):Observable<Classe>
      {
        return this.http.get<Classe>(`${this._classeUrl}/${id}`);
    
      } 
      
      EditClasse(id:string,classe:Classe):Observable<Object> {
        return this.http.put(`${this._classeUrl}/${id}`,classe);
      }

      totalClasses() {
        return this.http.get(`${this._classeUrl}/numberclasses`);
      }

     /* getClasseByEnseignant():Observable <any>
      {
        return this.http.get<Classe>(`${this._classeUrl}/ByEnseignant}`);
    
      } */
      getClasseByEnseignant() :Observable <any> {
    

        return this.http.get<any[]>(`${this._classeUrl}/ByEnseignants`)
          }

       getMatieresByEnseignant() :Observable <any> {
    

        return this.http.get<any[]>(`${this._classeUrl}/ByEnseignant/bymatieres`)
        }  

        getNumberclassesByEnseignant(){
          return this.http.get(`${this._classeUrl}/ByEnseignant/numberClasses`)
        }

        getNumberMatieresByEnseignant(){
          return this.http.get(`${this._classeUrl}/ByEnseignant/numberMatieres`)
        }

}
