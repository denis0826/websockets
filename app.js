const server = require('ws').Server;
const util = require('util');

var s = new server({ port:5001 });

s.on('connection', function(ws) {
  ws.on('message', function(message){

    message = JSON.parse(message);

    if(message.type == "name") {
      ws.personName = message.data;
      return;
    }

    console.log("Received:"+ ws.personName);    

    s.clients.forEach(function e(client) {
      if(client != ws){
        client.send(JSON.stringify({
          name: ws.personName,
          data: message.data
        }));
      }
    })

    // ws.send(message);
  });

  ws.on('close', function(){
    console.log("I lost a client");
  });

  console.log("one more client connected");

  ws.on('error', (err) => {
    // Handle the error.
    console.log(err.code);
    console.log(err);
    console.log(util.inspect(err, false, null));
  });

});