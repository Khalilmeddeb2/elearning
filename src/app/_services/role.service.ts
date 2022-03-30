import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../_models/role';

const headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');
  
@Injectable({
  providedIn: 'root'
})
export class RoleService {

  roles :any []=[];
  private _roleUrl="http://localhost:3007/api/roles" 
  constructor(private http: HttpClient) { }

  public getRoles() :Observable <any> {
    

    return this.http.get<any[]>(this._roleUrl, { 'headers': headers }).pipe(response =>
      response)
      }

      createRole(role: any):Observable<Object> {
        return this.http.post(`${this._roleUrl}`,role);
      }
      
      deleteRole(id : string)
      {
        return this.http.delete(`${this._roleUrl}/${id}`);
    
      } 
      
      getRoleById(id : string):Observable<Role>
      {
        return this.http.get<Role>(`${this._roleUrl}/${id}`);
    
      } 
      
      EditRole(id:string,role:Role):Observable<Object> {
        return this.http.put(`${this._roleUrl}/${id}`,role);
      }

      totalRoles() {
        return this.http.get(`${this._roleUrl}/numberRoles`);
      }
}
