//Data
let messages = [
  {
    message: "This is the first message"
  },
  {
    message: "This is the second message"
  }
];

//Set up a server
let express = require('express');
let app = express();

//Serve a public folder
app.use(express.static('public'));
app.use(express.json()); //parse the message data to see it on the server side



//Start a server
let port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on localhost:${port}`);
});


/* -------------------------------------------------------------------------- */
/*                                    routes                                  */
/* -------------------------------------------------------------------------- */

//message route
app.get('/messages', (request, response) => {
  //send data as an object
  let messagesData = {
    data: messages
  }

  response.json(messagesData);
});

//POST route
app.post('/new-message', (request, response) => {
  console.log(request.body);

let message = request.body;
  messages.push(message);
  console.log(messages);

  //send the message back to the client
  response.json(message);
});

//git
//git init - initialize repo
