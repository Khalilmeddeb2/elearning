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
export class ParentService {

 //roles :any []=[];
 private _ParentUrl="http://localhost:3007/api/parents" 
 constructor(private http: HttpClient) { }

 public getParents() :Observable <any> {
   

   return this.http.get<any[]>(this._ParentUrl, { 'headers': headers }).pipe(response =>
     response)
     }

     createParent(user: any):Observable<Object> {
       return this.http.post(`${this._ParentUrl}`,user);
     }
     
     deleteParent(id : string)
     {
       return this.http.delete(`${this._ParentUrl}/${id}`);
     } 

    getParentById(id : string):Observable<User>
     {
       return this.http.get<User>(`${this._ParentUrl}/${id}`);
   
     } 
     
     EditParent(id:string,user:User):Observable<Object> {
       return this.http.put(`${this._ParentUrl}/${id}`,user);
     }

    //  totalParent() {
    //    return this.http.get(`${this._ParentUrl}/numberEnseignants`);
    //  }

     /*totalUtlisateurs() {
       return this.http.get(`${this._userUrl}/numberUtlisateurs`);
     }

     getDirecteurs() {
       return this.http.get(`${this._userUrl}/Directeurs`);
     }*/

     EditSatutEnseignant(id:string):Observable<Object> {
       return this.http.get(`${this._ParentUrl}/${id}/status`);
     }
}
