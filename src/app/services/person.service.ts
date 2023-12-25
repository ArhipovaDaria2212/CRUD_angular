import { HttpClient } from '@angular/common/http';
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

export class PersonService {

  private url: string = "https://crudcrud.com/api/2a817f332f4a47dbb679c8f0ce73860/user"

  constructor(private httpClient: HttpClient) { }

  savePerson(data: object) {
    return this.httpClient.post(this.url, data);
  }

  getUsers() {
    return this.httpClient.get(this.url);
  }

  deleteUser(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
}
