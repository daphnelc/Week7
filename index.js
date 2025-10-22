// let breakfasts = require('./breakfast.json');

//Set up a server

// 0. load lowdb
// change require to import
// let express = require('express');
import express from 'express'
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

let app = express();

// 1. connect to the db
const adapter = new JSONFile('breakfast.json');
const db = new Low(adapter, {});

//Serve a public folder
app.use(express.static('public'));
app.use(express.json());

//Start a server
let port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on localhost:${port}`);
});

/* -------------------------------------------------------------------------- */
/*                                    routes                                  */
/* -------------------------------------------------------------------------- */

//POST route
app.post('/new-breakfast', (request, response) => {
  console.log('New breakfast received:', request.body);

  const breakfast = request.body;

  // Add submition date 
  if (!breakfast.date) {
    const today = new Date();
    breakfast.date = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
  }

  // breakfasts.data.push(breakfast);
  // 2. add value to the db
    db.read()
    .then(() => {
      db.data.data.push(breakfast);
      return db.write();
    })
    .then(() => {
      console.log('Breakfast added:', breakfast);
      response.json(breakfast);
    });

  // console.log(breakfasts);
  // response.json(breakfast);
});

//breakfast route
app.get('/breakfast', (request, response) => {
  
  //3. fetch from the db
  db.read().then(() => {
    response.json(db.data);
  });

  //response.json(breakfasts);
});

