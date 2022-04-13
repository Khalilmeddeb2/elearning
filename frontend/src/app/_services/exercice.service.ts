import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Exercice } from '../_models/exercice';
const headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');
@Injectable({
  providedIn: 'root'
})
export class ExerciceService {

  roles :any []=[];
  private _exerciceUrl="http://localhost:3007/api/exercices" 
  constructor(private http: HttpClient) { }

  public getExercices() :Observable <any> {
    

    return this.http.get<any[]>(this._exerciceUrl, { 'headers': headers }).pipe(response =>
      response)
      }

      createExercice(exercice: any):Observable<Object> {
        return this.http.post(`${this._exerciceUrl}`,exercice);
      }
      
      deleteExercice(id : string)
      {
        return this.http.delete(`${this._exerciceUrl}/${id}`);
    
      } 
      
      getExerciceById(id : string):Observable<Exercice>
      {
        return this.http.get<Exercice>(`${this._exerciceUrl}/${id}`);
    
      } 
      
      EditExercice(id:string,exercice:Exercice):Observable<Object> {
        return this.http.put(`${this._exerciceUrl}/${id}`,exercice);
      }

      totalExercices() {
        return this.http.get(`${this._exerciceUrl}/numberExercices`);
      }
      getExercicesByClasse(id :string) :Observable <any>
      {
       return this.http.get(`${this._exerciceUrl}/byClasse/${id}`);
      }

      updateDoneTest(id:string){
        return this.http.get(`${this._exerciceUrl}/${id}/update/testDone`);
      }  
      //
      updateScore(id:string)
      {
        return this.http.get(`${this._exerciceUrl}/${id}/score`);
      }
    }
