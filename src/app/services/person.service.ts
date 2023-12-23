import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private httpClient: HttpClient) { }

  savePerson(data: object) {
    return this.httpClient.post(`https://crudcrud.com/api/aa517201be3443ec977d4cc0d994039f/user`, data);
  }
}
