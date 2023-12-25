import { Dialog } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { UserService, User } from 'src/app/services/user.service';
import { AddUserComponent } from '../add-user/add-user.component';

import { Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-users-info',
  templateUrl: './users-info.component.html',
  styleUrls: ['./users-info.component.css'],
})

export class UsersInfoComponent {

  constructor(private userService: UserService, public dialog: MatDialog) { }

  users!: User[];
  isLoading: boolean = true;
  isEditing: boolean = false;

  ngOnInit() {
    this.getUsersList();
  }

  openDialog(): void {
    this.dialog.open(AddUserComponent, {
      width: '500px',
      height: '590px',
    });
  }

  getUsersList() {
    this.userService.getUsers().subscribe((res: any) => {
      this.users = res;
      this.users.forEach(user => {
        user.isEditing = false
      });
      this.isLoading = false;
    });
  }

  removeUser(event: any, user: number) {
    if (confirm("Are you sure you want to delete this data?")) {
      event.target.innerText = "Deleting..."
      this.userService.deleteUser(user).subscribe((res: any) => {
        this.getUsersList();
      });
    }
  }

  editing(user: User) {
    this.users.forEach(user => user.isEditing = false);
    user.isEditing = true;
  }

  changeUser(event: any, user: User) {
    event.target.innerText = "Saving...";
    this.userService.editUser(user).subscribe((res: any) => {
      this.getUsersList();
      user.isEditing = false;
      event.target.innerText = "Save";
    });
  }
}
