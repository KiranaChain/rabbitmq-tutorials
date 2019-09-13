var amqp = require('amqplib/callback_api');

/**
 * Consumer Function to receive Single message from Publisher
 */

amqp.connect('amqp://localhost',function(err,connection){
  if(err) {
    console.log('Error in Consumer creation connection ',err);
    throw err;
  }
  connection.createChannel(function(error,channel){
    if(error) {
      console.log('Error in creating channel in consumer ',error);
      throw err;
    }
    var queue = 'hello';
    channel.assertQueue(queue,{
      durable: false
    })
    console.log('Checking Messages received from Publisher %s in channel. To exit press CTRL+C ',queue);
    channel.consume(queue,function(msg){
      console.log('Message Received is %s',msg.content.toString());
    },{
      noAck: true
    });
  });
});