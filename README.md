# Inventory System Demo
A simple CRUD inventory system demo using React, Hapi, Webpack, and Babel.

To try it out on your machine:
```bash
git clone https://github.com/jbkly/inventory-system.git inventory && cd $_
npm install
npm run serve
npm run launch (or open http://localhost:3000 in your browser)
```

This project is a code exercise to model an inventory system with a simple API and UI, a few basic CRUD operations, and tracking of expiring items.

I decided to use this exercise as an opportunity to get more practice with React and ES2015 and learn a few things, like server routing with [HapiJS](http://hapijs.com/), React unit testing with Mocha and [expect-jsx](https://github.com/algolia/expect-jsx), and modular React components. 

I didn't want to spend too much time on database code, so items are stored in a simple JSON file. The goal is to access and remove items from the inventory by label, so rather than storing them in an array they are stored as key/value pairs for fast access. Node and Hapi provide a basic REST API for retrieving, adding, and removing items from the inventory.

The UI is handled by modular, reusable React components, and it optimistically updates before hearing back from the server to create faster feedback. 

### Features
* Add items with a label, type, and expiration time. Duplicate labels are disallowed on both the client and server side. 
* Remove items from the inventory using either a dropdown or buttons on each item, and get a notification (provided by [toastr](https://github.com/CodeSeven/toastr)) that the item has been removed.
* Seed the database with a few random items by clicking a button.
* Set item expiration dates ranging from two weeks to a few seconds. When an item expires, user gets a notification and visual feedback that the item is expired.

### Dev setup
* Webpack Dev Server, Babel, and nodemon for ES2015 Javascript and live reloading.
* React unit tests via React test utilities, Mocha, Expect, and expect-jsx.
* [Swagger](https://github.com/glennjones/hapi-swagger) API documentation at http://localhost:3000/documentation.
* Test API calls with [Postman](https://www.getpostman.com/). 

To start the node server in watch mode:
```
npm run serve
```
To start the Webpack dev server in live-reloading mode:
```
npm run dev
```
To have Webpack build a minified app bundle into dist:
```
npm run deploy
```
To run tests:
```
npm test
```

### Todo / wishlist
There are a few things I'd still like to add:
* Undo recently removed items. The groundwork is there: currently removed items are added to an array and stored in localStorage, so it would be simple to add an Undo button and pop them back off if the user wants to undo.
* Auto focus on item label input field after adding an item, to make adding multiple items smoother. Should be simple. 
* More comprehensive tests needed (UI functionality, e2e tests, API tests, and coverage reports).
* Deploy server for online demo
