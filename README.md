# CRUD Application. AngularJS

## Project Description

This application is a CRUD (Create, Read, Update, Delete) web application developed using AngularJS version 16.2.7. The main goal is to create an app to display and manage a user data table.

## Functional

* A table displaying information from the database
* The button for adding a new entry. When clicked, a modal window with a form appears. Sends a request to the server, and if successful, a pop-up window appears with a notification of a successful operation. By the same principle, notifications about incorrectly entered data and an error on the server side pop up
* After closing the modal window, the table is updated
* There are edit and delete buttons next to each row of the table
* When you click edit in the table, all the inputs become editable and the save button appears in place of the edit button, also, close appears in place of the delete button. By clicking on save, a request is sent to the backend, upon success, the inputs become available again and the button changes to "edit"

## API Requests

The API URL is taken from the crudcrud service and is updated every 24 hours. To get a new url, go to `https://crudcrud.com/`. Paste the new url in `crud/src/app/services/user-service/user.service.ts` into the url variable in the form `"(link)/user"`

### Description of requests

#### POST ```/user```

Add a new entry

body: 
```
{
  "firstname": "Homer",
  "lastname": "Simpson",
  "email": "homer.s@gmail.com",
  "age": 52,
  "gender": "male"
}
```

#### GET ```/user```

Get all records

#### PUT ```/user/<id>```

Edit one entry

body: 
```
{
  "firstname": "Homer",
  "lastname": "Simpson",
  "email": "homer.s@gmail.com",
  "age": 52,
  "gender": "male"
}
```

#### DELETE ```/user/<id>```

Delete one entry

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
