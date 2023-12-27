import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

import { UserService, User } from 'src/app/services/user.service';
import { AddUserComponent } from '../add-user/add-user.component';
import { FormValidationService } from 'src/app/services/form-validation/form-validation.service';

@Component({
  selector: 'app-users-info',
  templateUrl: './users-info.component.html',
  styleUrls: ['./users-info.component.css'],
})

export class UsersInfoComponent {

  userForms: FormGroup[] = [];
  oldUserObj!: User;
  isLoading: boolean = true;
  isError: boolean = false;
  p: number = 1;

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private formValidationService: FormValidationService
  ) { }

  ngOnInit() {
    this.getUsersList();
  }

  getUsersList() {
    this.isLoading = true;

    this.userService.getUsers().subscribe(
      {
        next: (res: any) => {
          this.userForms = [];

          res.forEach((user: User) => {
            this.userForms.push(this.createUserGroup(user));
          });

          this.isLoading = false;
        }, error: () => {
          this.toastr.error("Error in receiving data!", "ERROR");

          this.isLoading = false;
          this.isError = true;
        }
      }
    );
  }

  createUserGroup(user: User): FormGroup {
    return new FormBuilder().group({
      _id: [user._id],
      firstname: [{ value: user.firstname, disabled: true }, Validators.required],
      lastname: [{ value: user.lastname, disabled: true }, Validators.required],
      age: [
        { value: user.age, disabled: true },
        [Validators.pattern(/^[0-9]+$/),
        this.formValidationService.ageValidator(this.toastr)]],
      email: [{ value: user.email, disabled: true }, Validators.email],
      gender: [{ value: user.gender, disabled: true }],
    });
  }

  editing(userGroup: FormGroup) {
    this.close();
    this.oldUserObj = userGroup.getRawValue();
    userGroup.enable();
  }

  close() {
    this.userForms.forEach((userGroup: FormGroup) => {
      if (userGroup.controls['firstname'].status != 'DISABLED') {
        userGroup.patchValue(this.oldUserObj);
      }
      userGroup.disable();
    });
  }

  changeUser(event: any, userGroup: FormGroup) {

    if (!this.formValidationService.isFormValid(userGroup, this.toastr)) return;

    event.target.innerText = "Saving...";
    const user: User = userGroup.getRawValue();

    this.userService.editUser(user).subscribe({
      next: () => {
        event.target.innerText = "Save";
        this.toastr.success(`The user has been successfully changed!`, "SUCCESS");
        userGroup.disable();
      }, error: () => {
        this.toastr.error(`Failed to change user with id ${userGroup.get('id')!.value}!`, "ERROR");
        userGroup.disable();
      }
    });
  }

  removeUser(event: any, id: number, index: number) {
    event.target.innerText = "Deleting..."
    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.getUsersList();
        this.toastr.warning(`The user with id ${id} has been deleted!`, "WARNING");
      }, error: () => {
        this.toastr.error(`Failed to delete user with id ${id}!`, "ERROR");
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '500px',
      height: '590px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getUsersList();
    });
  }
}
