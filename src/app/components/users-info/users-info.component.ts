import { Component } from '@angular/core';
import { UserService, User } from 'src/app/services/user.service';
import { AddUserComponent } from '../add-user/add-user.component';
import { ToastrService } from 'ngx-toastr';

import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-users-info',
  templateUrl: './users-info.component.html',
  styleUrls: ['./users-info.component.css'],
})

export class UsersInfoComponent {

  constructor(private userService: UserService, public dialog: MatDialog, private toastr: ToastrService) { }

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
    event.target.innerText = "Deleting..."
    this.userService.deleteUser(user).subscribe((res: any) => {
      this.getUsersList();
    });
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
