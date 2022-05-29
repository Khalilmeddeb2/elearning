import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  //product :any []=[];
  private _notificationlUrl="http://localhost:3007/api/notifications" 
  constructor(private http: HttpClient) { }

      getNotificationsByEnseignant() :Observable <any>
      {
       return this.http.get(`${this._notificationlUrl}/enseignant`);
      }

      getNotificationsByEtudiant() :Observable <any>
      {
       return this.http.get(`${this._notificationlUrl}/etudiant`);
      }

      getChangeSelect(id :string)
      {
        return this.http.get(`${this._notificationlUrl}/${id}/selected`);
      }
      // getProfilUser() :Observable <any> {
      //   return this.http.get<any[]>(`${this._notelUrl}/profilUser`, { 'headers': headers }).pipe(response =>
      //     response)
      // }
    
      // EditProfil(id:string,profil):Observable<Object> {
      //   return this.http.put(`${this._notelUrl}/${id}`,profil);
      // }
}
