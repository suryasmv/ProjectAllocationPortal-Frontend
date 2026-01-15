import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/users';

  constructor(private http: HttpClient) {}

  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  login(payload: { username: string; password: string }) {
    return this.http.post<any>(`${this.baseUrl}/login`, payload);
  }
     

  // login(data: any): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/login`, data);
  // }

  

}
