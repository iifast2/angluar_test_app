import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Login, LoginResponse} from '../models/auth';
import { Observable, fromEvent, map, merge, switchMap, timer } from 'rxjs';
import { TokenService } from './token.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
//import { jwtDecode } from "jwt-decode";
import { environment } from '../../environments/environment';

const apiURL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpClient = inject(HttpClient);
  tokenService = inject(TokenService);
  router = inject(Router);

 // private readonly idleTimeout = +environment.idleTimeout * 60 * 1000; // in milliseconds
 // private userActivity$ : any;

  constructor(  private dialog: MatDialog) {}

  login(data: Login): Observable<LoginResponse> {
    return this.httpClient
    .post<LoginResponse>( `${apiURL}/auth/login-user`, data)
    .pipe(
      map((res) => {
        if (res) {
          this.tokenService.setToken(res.token);
          localStorage.setItem('firstname', res.firstname);
          localStorage.setItem('lastname', res.lastname);
        }
        return res;
      })
    )
  }
  /*initSessionTimeout() {
    const mouseMove$ = fromEvent(document, 'mousemove');
    const keyPress$ = fromEvent(document, 'keypress');
    const click$ = fromEvent(document, 'click');

    // Merge all user activity observables into one stream
    this.userActivity$ = merge(mouseMove$, keyPress$, click$).pipe(
      switchMap(() => timer(this.idleTimeout))
    );

    this.userActivity$.subscribe(() => {
      this.dialog.closeAll();
      this.logout();
    });
  }

  logout() {
    this.tokenService.removeToken();
    localStorage.removeItem('firstname');
    localStorage.removeItem('lastname');
    localStorage.removeItem('mark');
    localStorage.removeItem('tableContext');
    localStorage.removeItem('tableFilters');
    localStorage.removeItem('tableSort');
    localStorage.removeItem('tablePaginator');
    localStorage.removeItem('sidenavOpened');
    this.router.navigate(['/login']);
  }

  forgotPassword(data: ForgotPassword): Observable<any> {
    return this.httpClient.post(endpoints.AUTH.FORGOT_PASSWORD, data)
  }
  
  resetExpiredPassword(data: ResetExpiredPassword): Observable<any> {
    return this.httpClient.post(endpoints.AUTH.RESET_EXPIRED_PASSWORD, data)
  }
  
  resetForgottenPassword(data: ResetForgottenPassword, token: string): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + token
    );
    return this.httpClient.post(endpoints.AUTH.RESET_FORGOTTEN_PASSWORD, data, { headers: headers })
  }

  getUserAccessRights() {
    const token = this.tokenService.getToken();
    if (token) {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.accessRights || null;
    } else {
      return null;
    }
  }

  hasAccessRight(accessRights: string[]): boolean {
    const userAccessRights = this.getUserAccessRights();
    if (accessRights && userAccessRights) {
      if (
        (userAccessRights.admin && accessRights.some(accessRight => userAccessRights.admin?.includes(accessRight))) ||
        (userAccessRights.local && accessRights.some(accessRight => userAccessRights.local?.includes(accessRight)))
      ) {
        return true;
      }
      else {
        return false;
      }
    }
    else {
      return true;
    }
  }*/

}
