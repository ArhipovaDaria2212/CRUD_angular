import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface User {
  _id: number
  firstname: string
  lastname: string
  email: string
  age: number
  gender: string
}

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private url: string = "https://crudcrud.com/api/3562096a3a6f407f8956572be7c0889e/user";
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient) { }

  addUser(user: object) {
    return this.httpClient.post(this.url, user);
  }

  getUsers() {
    return this.httpClient.get(this.url);
  }

  deleteUser(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  editUser(user: User) {
    const { _id, ...newUser } = user;
    return this.httpClient.put(`${this.url}/${_id}`, newUser, this.httpOptions);
  }
}
