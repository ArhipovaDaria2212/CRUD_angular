import { Component } from '@angular/core';
import { UserService, User } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-info',
  templateUrl: './users-info.component.html',
  styleUrls: ['./users-info.component.css']
})

export class UsersInfoComponent {

  constructor(private userService: UserService) { }

  users!: User[];
  isLoading: boolean = true;
  isEditing: boolean = false;

  ngOnInit() {
    this.getUsersList();
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
