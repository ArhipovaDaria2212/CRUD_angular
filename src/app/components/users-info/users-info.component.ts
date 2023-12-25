import { Component } from '@angular/core';
import { PersonService, User } from 'src/app/services/person.service';

@Component({
  selector: 'app-users-info',
  templateUrl: './users-info.component.html',
  styleUrls: ['./users-info.component.css']
})
export class UsersInfoComponent {

  constructor(private personService: PersonService) { }

  users!: User[];
  isLoading: boolean = true;

  ngOnInit() {
    this.getUsersList();
  }

  getUsersList() {

    this.personService.getUsers().subscribe((res: any) => {
      this.users = res;
      this.isLoading = false;
    });
  }

  removeUser(event: any, user: number) {
    if (confirm("Are you sure you want to delete this data?")) {
      event.target.innerText = "Deleting..."
      this.personService.deleteUser(user).subscribe((res: any) => {
        this.getUsersList();
      });

    }

  }
}
