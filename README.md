# Todo App - CRUD Application

This is a data persistent CRUD application that was developed with React, Express, Node, PostgreSQL and Material-UI. The Client, Server, and Database are deployed on Heroku.

---

## Instructions for Viewing

[The deployed application can be viewed here](https://andrew-bradt-todo-frontend.herokuapp.com/). You may sign up with your own email address and password to use the application, or sign in with the existing credentials:

- Email: testuser@gmail.com
- Password: 9999

#### **_NOTE: This application was deployed with a free-tier of Heroku, so there is a possibility the servers may be in an idle state and result in longer load times when you first navigate to the application._**

---

## Client Documentation

---

### Components

---

#### App

---

#### Login & Sign-Up

## <img src='./documentation_assets/log-in.jpg'>

## <img src='./documentation_assets/sign-up.jpg'>

- These components allow users to sign up for an account or log in to their existing account.
- A post request with the credentials will only be made if all fields are populated.
- The Sign-Up component will only make a post request if text entered into both the **_Password_** and **_Confirm-Password_** fields are identical.

---

#### Layout

---

#### Add Task

## <img src='./documentation_assets/add-task.jpg'>

- Two input fields, labeled **_Title_** and **_Description_**, allow for the user to enter new tasks. The task will be added after clicking the **_ADD Task_** button
- Tasks will not be added unless the **_Title field_** is populated.

#### Edit Modal

## <img src='./documentation_assets/edit-modal.jpg'>

---

#### Todo and Todos

## <img src='./documentation_assets/todos.jpg'>

---

## Server Documentation

---

### End Points

---

#### /add-todo

---

#### /change-todo

---

#### /create-user

---

#### /get-todos

---

#### /login

---

#### /remove-todo

---

## Database Documentation

---

### Tables

---

#### Users

---

#### Todos

---

## Additional Features

---
