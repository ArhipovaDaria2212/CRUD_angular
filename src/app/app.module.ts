import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { PersonComponent } from './components/person/person.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { UsersInfoComponent } from './components/users-info/users-info.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    AddUserComponent,
    PersonComponent,
    SpinnerComponent,
    UsersInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
