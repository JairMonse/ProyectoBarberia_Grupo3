import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UsuarioInterface } from '../interfaces/usuario-interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private myAppUrl: string = environment.endpoint
  private myApiUrl: string = 'api/Authentication/'

  constructor(private http: HttpClient) { }

  auth(user: UsuarioInterface): Observable<any>{
    return this.http.post<any>(`${this.myAppUrl}${this.myApiUrl}`, user);
  }

  getAuthHeaders(): HttpHeaders {
    const auth_token = localStorage.getItem('TOKEN');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
  }

}
