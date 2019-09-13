var amqp = require("amqplib/callback_api");


/**
 * Create Amqpconnection and create a channel, assert Queue
 */
amqp.connect('amqp://localhost', function(err, connection){
  if(err) {
    console.log('Error in connecting to rabbitmq local server : ',err);
    throw err;
  }
  connection.createChannel(function(error,channel){
    if(error) {
      console.log('Error in creating channel : ',error);
      throw err;
    }
    var queueName = 'hello';
    var message = 'Hello KiranaChain';
    channel.assertQueue(queueName,{
      durable:false
    })

    channel.sendToQueue(queueName,Buffer.from(message));
    console.log('Msg sent %s ',message);
  })
  setTimeout(function(){
    connection.close();
    process.exit(0);
  },1000);
})
