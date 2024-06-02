import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
const apiURL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  
  httpClient = inject(HttpClient);

  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor() { 
    const token = this.getToken();
    if (token) {
      this.updateToken(true);
    }
  }

  updateToken(status: boolean) {
    this.isAuthenticated.next(status);
  }

  setToken(token: string) {
    this.updateToken(true);
    localStorage.setItem('CURRENT_TOKEN', token);
  }

  getToken(): string | null {
    return localStorage.getItem('CURRENT_TOKEN') || null;
  }

  removeToken() {
    this.updateToken(false);
    return localStorage.removeItem('CURRENT_TOKEN');
  }

  checkTokenValidity(token: string): Observable<any> {
    let params = new HttpParams();
    params = params.set('token', token);
    return this.httpClient.get(`${apiURL}/auth/check-token-validity`, {params});
  }

}