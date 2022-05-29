import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Test } from '../_models/test';

const headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');
@Injectable({
  providedIn: 'root'
})
export class TestService {

  roles :any []=[];
  private _testUrl="http://localhost:3007/api/tests" 
  constructor(private http: HttpClient) { }

  public getTests() :Observable <any> {
    

    return this.http.get<any[]>(this._testUrl, { 'headers': headers }).pipe(response =>
      response)
      }

      createTest(test: any):Observable<Object> {
        return this.http.post(`${this._testUrl}`,test);
      }
      
      deleteTest(id : string)
      {
        return this.http.delete(`${this._testUrl}/${id}`);
    
      } 
      
      getTestById(id : string):Observable<Test>
      {
        return this.http.get<Test>(`${this._testUrl}/${id}`);
    
      } 
      getTestsByClasse(id :string) :Observable <any>
      {
       return this.http.get(`${this._testUrl}/byClasse/${id}`);
      }
      
      EditTest(id:string,test:Test):Observable<Object> {
        return this.http.put(`${this._testUrl}/${id}`,test);
      }

      // totalExercices() {
      //   return this.http.get(`${this._exerciceUrl}/numberExercices`);
      // }
      // getExercicesByClasse(id :string) :Observable <any>
      // {
      //  return this.http.get(`${this._exerciceUrl}/byClasse/${id}`);
      // }

      
      
      // updateScore(id:string)
      // {
      //   return this.http.get(`${this._exerciceUrl}/${id}/score`);
      // }
      // espace etudiant 

      // totalExercicesEtudiants(id :string) :Observable <any> {
      //   return this.http.get(`${this._exerciceUrl}/byClasse/numberExercices/${id}`);
      // }
      totalTestsEtudiants(id :string) :Observable <any> {
        return this.http.get(`${this._testUrl}/byClasse/numberTests/${id}`);
      }

      updateDoneTest(id:string){
        return this.http.get(`${this._testUrl}/${id}/update/testDone`);
      }  

      updateTestPublish(id:string){
        return this.http.get(`${this._testUrl}/${id}/update/testPublish`);
      }  
      /// pour l 'enseigant 
      totalTestsByMonth(mois :string) :Observable <any> {
        return this.http.get<string>(`${this._testUrl}/numberTests/${mois}`);
      }

      // les 5 derniers tests por un enseiganat 
      total5FirtsTests() :Observable <any> {
        return this.http.get(`${this._testUrl}/5Tests`);
      }

      total5FirtsTestsModifies() :Observable <any> {
        return this.http.get(`${this._testUrl}/5TestsModifies`);
      }

      totalTests() :Observable <any> {
        return this.http.get<string>(`${this._testUrl}/numberTests`);
      }


      // totalExercicesEtudiants(id :string) :Observable <any> {
      //   return this.http.get(`${this._exerciceUrl}/byClasse/numberExercices/${id}`);
      // }
}
