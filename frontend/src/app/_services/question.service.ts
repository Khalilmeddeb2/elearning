import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../_models/question';

const headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');


@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  roles :any []=[];
  private _questionUrl="http://localhost:3007/api/questions" 
  constructor(private http: HttpClient) { }

  public getQuestions() :Observable <any> {
    

    return this.http.get<any[]>(this._questionUrl, { 'headers': headers }).pipe(response =>
      response)
      }

      createQuestion(exercice: any):Observable<Object> {
        return this.http.post(`${this._questionUrl}`,exercice);
      }
      
      deleteQuestion(id : string)
      {
        return this.http.delete(`${this._questionUrl}/${id}`);
    
      } 
      
      getQuestionById(id : string):Observable<Question>
      {
        return this.http.get<Question>(`${this._questionUrl}/${id}`);
    
      } 
      
      EditQuestion(id:string,question:Question):Observable<Object> {
        return this.http.put(`${this._questionUrl}/${id}`,question);
      }

      totalQuestions() {
        return this.http.get(`${this._questionUrl}/numberQuestions`);
      }
    }
