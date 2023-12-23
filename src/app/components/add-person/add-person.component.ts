import { Component } from '@angular/core';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css']
})

export class AddPersonComponent {

  constructor(private personService: PersonService) { }

  firstname!: string
  lastname!: string
  email!: string
  age!: string
  gender!: string
  isLoading: boolean = false

  savePerson() {

    var data = {
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      age: this.age,
      gender: this.gender
    }

    if (this.firstname && this.lastname) {

      this.isLoading = true;

      this.personService.savePerson(data).subscribe({
        next: (res: any) => {
          console.log(res, "response");

          this.isLoading = false;

          // alert("The person is recorded");

          this.firstname = " ";
          this.lastname = " ";
          this.email = "";
          this.age = "";
          this.gender = "";
        },
        error: (err: any) => {
          console.log(err, "error");

          this.isLoading = false;
        }
      });

    } else {
      alert("incorrect data");
    }

  }
}
