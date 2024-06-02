import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from '../../environments/environment';

const apiURL = environment.apiURL;
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  httpClient = inject(HttpClient);

  constructor() { }

  getUsers(): Observable<any> {
    return this.httpClient.get<User[]>(`${apiURL}/users`);
  }

  archiveUser(id: number) {
    // return this.httpClient.patch(`${endpoints.USERS.ARCHIVE_USER}/${id}`,{});
  }

  importUsers(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.httpClient.post(`${apiURL}/users/import`, formData);
  }


}
