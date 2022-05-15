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
export class UserService {

  roles :any []=[];
  private _userUrl="http://localhost:3007/api/user" 
  constructor(private http: HttpClient) { }

  public getUsers() :Observable <any> {
    

    return this.http.get<any[]>(this._userUrl, { 'headers': headers }).pipe(response =>
      response)
      }

      createUser(user: any):Observable<Object> {
        return this.http.post(`${this._userUrl}`,user);
      }
      
      deleteUser(id : string)
      {
        return this.http.delete(`${this._userUrl}/${id}`);
      } 

     getUserById(id : string):Observable<User>
      {
        return this.http.get<User>(`${this._userUrl}/${id}`);
    
      } 
      
      EditUser(id:string,user:User):Observable<Object> {
        return this.http.put(`${this._userUrl}/${id}`,user);
      }

      totalDirecteurs() {
        return this.http.get(`${this._userUrl}/numberDirecteurs`);
      }

      totalUtlisateurs() {
        return this.http.get(`${this._userUrl}/numberUtlisateurs`);
      }

      getDirecteurs() {
        return this.http.get(`${this._userUrl}/Directeurs`);
      }

      EditSatutsUser(id:string):Observable<Object> {
        return this.http.get(`${this._userUrl}/${id}/status`);
      }
    //
      EditPasswordUser(id:string,user:User):Observable<Object> {
        return this.http.put(`${this._userUrl}/${id}/updatePassowrd`,user);
      }
     

     
}
