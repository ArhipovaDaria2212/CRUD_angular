import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface User {
  _id: number
  firstname: string
  lastname: string
  email: string
  age: number
  gender: string
  isEditing: boolean
}

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private url: string = "https://crudcrud.com/api/2a817f332f4a47dbb679c8f0ce73860/user";
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient) { }

  saveUser(user: object) {
    return this.httpClient.post(this.url, user);
  }

  getUsers() {
    return this.httpClient.get(this.url);
  }

  deleteUser(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  editUser(user: User) {
    const { isEditing, _id, ...newUser } = user;
    return this.httpClient.put(`${this.url}/${_id}`, newUser, this.httpOptions);
  }
}