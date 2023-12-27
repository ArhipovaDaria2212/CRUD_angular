import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { ToastrService } from 'ngx-toastr';

import { UserService } from 'src/app/services/user.service';
import { FormValidationService } from 'src/app/services/form-validation/form-validation.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})

export class AddUserComponent {

  constructor(private userService: UserService,
    public dialogRef: MatDialogRef<AddUserComponent>,
    private toastr: ToastrService,
    private formValidationService: FormValidationService) { }

  addUserForm = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    email: new FormControl('', Validators.email),
    age: new FormControl(null, [Validators.pattern(/^[0-9]+$/), this.formValidationService.ageValidator(this.toastr)]),
    gender: new FormControl(''),
  });

  isLoading = false
  isError = false

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {

    if (!this.formValidationService.isFormValid(this.addUserForm, this.toastr)) {
      this.isError = true
      return;
    }

    this.isLoading = true;
    this.isError = false;

    this.userService.addUser(this.addUserForm.getRawValue()).subscribe({
      next: () => {
        this.isLoading = false;
        this.addUserForm.reset();
        this.toastr.success("The user has been successfully added!", "SUCCESS");
      },

      error: () => {
        this.isLoading = false;
        this.toastr.error("Failed to add a user!", "ERROR");
      }
    });
  }
}