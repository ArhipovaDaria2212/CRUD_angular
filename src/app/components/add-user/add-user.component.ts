import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

import { Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})

export class AddUserComponent {

  constructor(private userService: UserService, public dialogRef: MatDialogRef<AddUserComponent>) { }

  firstname!: string
  lastname!: string
  email!: string
  age!: string
  gender!: string
  isLoading: boolean = false

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveUser() {

    var data = {
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      age: this.age,
      gender: this.gender
    }

    if (this.firstname && this.lastname) {

      this.isLoading = true;

      this.userService.saveUser(data).subscribe({
        next: (res: any) => {
          console.log(res, "response");

          this.isLoading = false;

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
