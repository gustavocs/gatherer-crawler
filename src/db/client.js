const MongoClient = require('mongodb').MongoClient,
      Server = require('mongodb').Server;

const client = new MongoClient(new Server("localhost", 27017), { native_parser: true });

const insertMany = (collection, objs) => {
  return new Promise((resolve, reject) => {
    client.connect((err, mongoclient) => {
      if (err) reject(err);

      var db = mongoclient.db("Magic");
      db
      .collection(collection)
      .insertMany(objs)
      .then((res) => {
          console.log(`Inserted: ${ objs }`);
      }, (error) => { console.log(error); });
    });
  });
}

const insert = (collection, obj) => {
  return new Promise((resolve, reject) => {
    client.connect((err, mongoclient) => {
      if (err) reject(err);

      var db = mongoclient.db("Magic");
      db
      .collection(collection)
      .insertOne(obj)
      .then((res) => {
          console.log(`Inserted: ${ obj }`);
      }, (error) => { console.log(error); });
    });
  });
}

module.exports = { insert, insertMany };
