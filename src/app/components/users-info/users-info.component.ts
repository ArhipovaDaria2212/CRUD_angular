import { Component } from '@angular/core';
import { ElementRef, HostListener, Input } from '@angular/core';
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

  constructor(private userService: UserService, public dialog: MatDialog, private toastr: ToastrService, private elementRef: ElementRef) { }

  users!: User[];
  oldUserObj!: User;
  isLoading: boolean = true;
  isEditing: boolean = false;
  isError: boolean = false;
  p: number = 1;

  ngOnInit() {
    this.getUsersList();
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

  getUsersList() {
    this.userService.getUsers().subscribe(
      {
        next: (res: any) => {
          this.users = res;
          this.users.forEach(user => {
            user.isEditing = false
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

  removeUser(event: any, id: number) {
    event.target.innerText = "Deleting..."
    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.getUsersList();
        this.toastr.warning(`The user with id ${id} has been deleted!`, "WARNING");
      }, error: () => {
        this.toastr.error(`Failed to delete user with id ${id}!`, "ERROR");
        this.isError = true;
      }
    });
  }

  close() {
    this.users.forEach(user => {
      if (user.isEditing) Object.assign(user, this.oldUserObj);
      user.isEditing = false;
    });
  }

  editing(user: User) {
    this.close();
    this.oldUserObj = JSON.parse((JSON.stringify(user)));
    user.isEditing = true;
  }

  changeUser(event: any, user: User) {
    event.target.innerText = "Saving...";
    this.userService.editUser(user).subscribe({
      next: () => {
        this.getUsersList();
        user.isEditing = false;
        event.target.innerText = "Save";
        this.toastr.success(`The user has been successfully changed!`, "SUCCESS");
      }, error: () => {
        this.toastr.error(`Failed to change user with id ${user._id}!`, "ERROR");
        user.isEditing = false;
        this.isError = true;
      }
    });
  }
}
