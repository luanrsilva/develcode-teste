import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserModel} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = `${environment.apiUrl}`;
  private header = new HttpHeaders();

  constructor(private http: HttpClient) { }

  createUser(user: UserModel) {
    return this.http.post(this.baseUrl + 'addUsers', user);
  }

  getUsers() {
    return this.http.get(this.baseUrl + 'getUsers');
  }

  updateUser(user: UserModel, id: string) {
    return this.http.put(this.baseUrl + id, user);
  }

  deleteUser(id: string) {
    return this.http.delete(this.baseUrl + id);
  }
}
