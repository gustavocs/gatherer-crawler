const MongoClient = require('mongodb').MongoClient,
      Server = require('mongodb').Server;

const client = new MongoClient(new Server("localhost", 27017), { native_parser: true, autoIndex: false });

const insert = (collection, card) => {
  
  return new Promise((resolve, reject) => {
    client.connect((err, mongoclient) => {
      if (err) reject(err);

      var db = mongoclient.db("Magic");
      db
      .collection(collection)
      .insertOne(card)
      .then((res) => {
          console.log(`Inserted: ${ card.name }`);
      }, (error) => { console.log(error); });
    });
  });
}

module.exports = {  insert };