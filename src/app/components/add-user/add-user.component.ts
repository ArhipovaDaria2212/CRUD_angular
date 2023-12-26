import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UsersInfoComponent } from '../users-info/users-info.component';
import { FormControl, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})

export class AddUserComponent {

  constructor(private userService: UserService,
    public dialogRef: MatDialogRef<AddUserComponent>,
    private toastr: ToastrService,
    private userInfo: UsersInfoComponent) { }

  addUserForm = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    email: new FormControl('', Validators.email),
    age: new FormControl(null, [Validators.pattern(/^[0-9]+$/), ageValidator(this.toastr)]),
    gender: new FormControl(''),
  });

  isLoading = false
  isError = false

  onNoClick(): void {
    this.userInfo.getUsersList();
    this.dialogRef.close();
  }

  onSubmit() {

    if (this.addUserForm.invalid) {
      this.isError = true
      this.toastr.error("Invalid data!", "ERROR");
      return;
    }

    this.isLoading = true;
    this.isError = false;

    const data = {
      firstname: this.addUserForm.controls.firstname.value,
      lastname: this.addUserForm.controls.lastname.value,
      email: this.addUserForm.controls.email.value,
      age: this.addUserForm.controls.age.value,
      gender: this.addUserForm.controls.gender.value
    };

    this.userService.addUser(data).subscribe({
      next: () => {
        this.isLoading = false;
        this.addUserForm.reset();
        this.userInfo.getUsersList();
        this.toastr.success("The user has been successfully added!", "SUCCESS");
      },

      error: () => {
        this.isLoading = false;
        this.toastr.error("Failed to add a user!", "ERROR");
      }
    });
  }
}

function ageValidator(toastr: ToastrService): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valid = control.value > 0 && control.value < 120 || control.value == null || control.value == "";
    if (!valid) toastr.error("You either entered the wrong age, or you can't type too well yet, or you're already dead(", "Invalid age!");

    return !valid ? { age: { invalid: true } } : null;
  };
}