const MongoClient = require('mongodb').MongoClient,
      Server = require('mongodb').Server;


const insertMany = (collection, objs) => {
  const client = new MongoClient(new Server("localhost", 27017), { native_parser: true });

  return new Promise((resolve, reject) => {
    client.connect((err, mongoclient) => {
      if (err) reject(err);

      var db = mongoclient.db("Magic");
      db
      .collection(collection)
      .insertMany(objs)
      .then((res) => {
          resolve(res);
      }, (error) => { console.log(error); });
    });
  });
}

const insert = (collection, obj) => {
  const client = new MongoClient(new Server("localhost", 27017), { native_parser: true });

  return new Promise((resolve, reject) => {
    client.connect((err, mongoclient) => {
      if (err) reject(err);

      var db = mongoclient.db("Magic");
      db
      .collection(collection)
      .insertOne(obj)
      .then((res) => {
          resolve(res);
      }, (error) => { console.log(error); });
    });
  });
}

module.exports = { insert, insertMany };
