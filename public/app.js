console.log('Client is working');

//load the page
window.addEventListener("load", function () {

    const feed = document.getElementById('feed');

    //fetching the data from the route
    fetch('/messages')
        .then(response => {
            return response.json()
        })

        .then(data => {
            console.log(data);
            //Step 7. Add messages to the page

            //create a paragraph for each of the messages
            let messages = data.data;
            console.log(messages);

            for (let i = 0; i < messages.length; i++) {
                let message = messages[i].message;
                console.log(message);

                let newMessage = document.createElement('p');
                newMessage.innerHTML = message;

                feed.appendChild(newMessage);
            }
        })

        .catch(error => {
            console.log(error);
        });


    /* -------------------------------------------------------------------------- */
    /*                              get new messages                              */
    /* -------------------------------------------------------------------------- */

    let msgInput = document.querySelector("#msg-input");
    let button = document.querySelector('#msg-submit');

    button.addEventListener('click', () => {
        //Access an input value
        console.log('clicked');

        let msgValue = msgInput.value;
        console.log('msgValue');

        //Create an object to send
        let messageObject = {
            message: msgValue //value of the message
        }

        console.log('messageObject');

        //Stringify data
        let messageObjectJSON = JSON.stringify(messageObject);
        console.log(messageObjectJSON);

        //create a POST request
        this.fetch('/new-message', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: messageObjectJSON
        })
            
            .then(response => {
            return response.json()
        })
            .then(data => {
                //Do something with the data when it comes back from the server
                console.log(data);

                //add new message to the page
                let newMsg = this.document.createElement('p');
                newMsg.innerHTML = data.message;
                feed.appendChild(newMsg);
            })
            .catch(error => {
                console.log(error);
            });

    });

});

