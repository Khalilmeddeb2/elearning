import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NoteEtudiant } from '../_models/note-etudiant';

const headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');
@Injectable({
  providedIn: 'root'
})
export class NoteEtudiantService {

  product :any []=[];
  private _notelUrl="http://localhost:3007/api/notes" 
  constructor(private http: HttpClient) { }

  public getProfils() :Observable <any> {
    

    return this.http.get<any[]>(this._notelUrl, { 'headers': headers }).pipe(response =>
      response)
      }

    deleteNote(id : string):Observable<Object>
      {
        return this.http.delete(`${this._notelUrl}/${id}`);
    
      }   
      
      createNote(note):Observable<Object> {
        return this.http.post(`${this._notelUrl}`,note);
      }

      getNoteById(id : string):Observable<NoteEtudiant>
      {
        return this.http.get<NoteEtudiant>(`${this._notelUrl}/${id}`);
    
      } 

      SaveScoreEtudiant(id,score):Observable<Object> {
        return this.http.get<NoteEtudiant>(`${this._notelUrl}/${id}/update/${score}`);
      }

      // getProfilUser() :Observable <any> {
      //   return this.http.get<any[]>(`${this._notelUrl}/profilUser`, { 'headers': headers }).pipe(response =>
      //     response)
      // }
    
      // EditProfil(id:string,profil):Observable<Object> {
      //   return this.http.put(`${this._notelUrl}/${id}`,profil);
      // }
}
