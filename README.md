Users app description:

Requirements:
Application composed with 3 pages:
Home page,
UserList
UserDetail
The application will have a fixed header ( “header” component) that will contains the menu items “Home” and “User List”.
Home Page
Empty
UserList Page
It will contains a list of documents. From this page it will be possible to do all the CRUD operations for each element of the list (DELETE directly from UserList, READ/CREATE/UPDATE on UserDetail)
UserDetail Page
The detail page should be a template-driven-form to insert and edit a single element. If you want you can use reactive-forms instead.
To save it’s necessary to validate the model (on client side), these are the restrictions:
Name, username, email, street, city, zipcode must be not null.
Username must have at leaset 8 chars.
The id field is automatically generated from server, so you don’t have to set a value for it and it don’t have to be showed in UI.
By saving or undoing the modifications the application must return to the page UserList.
If there are some modifications that are not saved yet and the user want to exit from the page (back of browser, menu item click, …) the user must be warned (ideally with a confirm popup – yes, no).
Repository
5 methods must be implemented and they must be generics (based on the already written interface IRepository). If you prefer you can convert it to Observables pattern.
Get, GetById, Post, Put, Delete
Data
The 5 api calls to manage the users are the following:
GET https://jsonplaceholder.typicode.com/users
Reply a list of users

GET https://jsonplaceholder.typicode.com/users/{id}   (where {id} it’s the ID of user...for example 1)
Reply a single User if exists, otherwise 404.

POST https://jsonplaceholder.typicode.com/users           (with user object on data field).
Reply the saved object with its new ID

PUT https://jsonplaceholder.typicode.com/users/{id} (where {id} it’s the ID of user...for example 1 and with user object in data field).
Reply the saved object with the same ID that you pass on API.

DELETE https://jsonplaceholder.typicode.com/users/{id} (where {id} it’s the ID of user...for example 1)
Don’t reply nothing. Just a 200 code.