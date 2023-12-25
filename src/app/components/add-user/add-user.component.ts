import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})

export class AddUserComponent {

  constructor(private userService: UserService, public dialogRef: MatDialogRef<AddUserComponent>, private toastr: ToastrService) { }

  firstname!: string
  lastname!: string
  email!: string
  age!: number
  gender!: string
  isLoading = false
  isError = false

  onNoClick(): void {
    this.dialogRef.close();
  }

  validateEmail(email: string) {
    const regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regularExpression.test(String(email).toLowerCase());
  }

  validateData() {

    var error = false;

    if (!this.validateEmail(this.email)) {
      this.toastr.error("Check the validity of the entered email!", "Incorrect email!");
      error = true;
    }

    if (!Boolean(this.firstname && this.lastname)) {
      this.toastr.error("You forgot about the first and last name (", "Incorrect data!");
      error = true;
    }

    if (this.age > 120 || this.age < 1) {
      this.toastr.error("You either can't type too well yet, or you're already dead (", "Incorrect data!");
      error = true;
    }

    return !error;
  }

  saveUser() {

    const { firstname, lastname, email, age, gender } = this;
    const data = { firstname, lastname, email, age, gender };

    this.isError = !this.validateData();

    if (!this.isError) {
      this.isLoading = true;
      this.userService.saveUser(data).subscribe({
        next: (res: any) => {

          this.isLoading = false;

          this.firstname = " ";
          this.lastname = " ";
          this.email = "";
          this.age = NaN;
          this.gender = "";

          this.toastr.success("The user has been successfully added!", "SUCCESS");
        },

        error: (err: any) => {
          this.isLoading = false;

          this.toastr.error("Failed to add a user!", "ERROR");
        }
      });

    }

  }
}
