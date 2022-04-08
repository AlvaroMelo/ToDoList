# ToDoList

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Firebase database

This app was built using a Firebase Realtime Database.
In case you want to run this project locally, it is necessary to create your own database on https://console.firebase.google.com/u/0/
The steps are really simple:
- In case you don't have an account, just create one an login to your account; 
- Create a new project and name it whatever name you like (e.g. 'ToDo-App');
- You may activate Google analytics if you want to;
- Finally, select the option "Default account for Firebase" and create the project
- On the left side, there will have an option (at least that is where it is located at the moment I'm writing this step by step) called "Realtime Database". Click on it;
- Select "Create Database" and choose the local that suits you best for the database;
- You can start in the test mode. After that, click on "Activate" button.

There you go. Database is ready.
Now, you need to setup your code, so it can access this database. Here are the steps:
- Go to project overview.
- There will have 3 buttons to add Firebase to your project. Select the Web button. 
- Register a name;
- Copy only the firebaseConfig properties.
- Paste those properties inside another property called "firebase" on files src/environments/environment.ts and src/environments/environment.prod.ts
The final result of this file should be something like this:

```
export const environment = {
  production: true,
  firebase: {
  apiKey: "AIzaSyCAFulmOwQ7gzgCGBFy4HaNHICPv5PANiA",
  authDomain: "testes-e3ff1.firebaseapp.com",
  databaseURL: "https://testes-e3ff1-default-rtdb.firebaseio.com",
  projectId: "testes-e3ff1",
  storageBucket: "testes-e3ff1.appspot.com",
  messagingSenderId: "137628454795",
  appId: "1:137628454795:web:7c5edaa880ef933533298e",
  measurementId: "G-1M18RJW9GR"
  }
};
```
P.S.: The properties above will not work. I just created for validation. They were already deleted from my Firebase account.

After all those steps, the code should work nicely.
