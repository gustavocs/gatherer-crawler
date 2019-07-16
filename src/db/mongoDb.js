const MongoClient = require('mongodb').MongoClient;

class MongoDb {
  constructor() {
    this.db = null;
    this.maxSizeInsertMany = 1000;
    this.url = 'mongodb://localhost:27017';
    this.options = {
      bufferMaxEntries: 100,
      reconnectTries: 5000,
      useNewUrlParser: true
    };
  }

  // singleton connect
  connectToMongo() {
    return new Promise((resolve, reject) => {
      if (this.db) resolve(this.db);

      return MongoClient.connect(this.url, this.options)
          .then(client => {
            this.db = client.db('Magic');
            resolve(this.db); },
          (error) => { console.log(error); reject(error); });

      }, (error) => { console.log(error); reject(error); });
  }

  find(collection, query, aggregate) {
    return new Promise((resolve, reject) => { 
      this.connectToMongo().then((db) => {
        if (!aggregate) {
          db
            .collection(collection)
            .find(query)
            .toArray((err, results) => {
                if(err) reject(err);
                else {
                  resolve(results);
                }
              });
        } else {
          db
          .collection(collection)
          .aggregate(aggregate)
          .find(query)
          .toArray((err, results) => {
              if(err) reject(err);
              else {
                resolve(results);
              }
            });
        }
      });
    }, (error) => { console.log(error); reject(error); });
  }

  async insertManyOptimized(collection, objs) {
    const size = Math.min(objs.length, this.maxSizeInsertMany);
    for (let i = 0; i < Math.round(objs.length / size); i++) {
      await this.insertMany(collection, objs.slice(i * size, (i * size) + size));
    }
  }

  insertMany(collection, objs) {
    return new Promise((resolve, reject) => { 
      this.connectToMongo().then((db) => {
        db
          .collection(collection)
          .insertMany(objs)
          .then((res) => {
              resolve(res);
          });
      });
    }, (error) => { console.log(error); reject(error); });
  }

  insert(collection, obj) {
    return new Promise((resolve, reject) => { 
      this.connectToMongo().then((db) => {
        db
          .collection(collection)
          .insertOne(obj)
          .then((res) => {
              resolve(res);
          });
      });
    }, (error) => { console.log(error); reject(error); });
  }

  update(collection, query, obj) {
    return new Promise((resolve, reject) => { 
      this.connectToMongo().then((db) => {
        db
          .collection(collection)
          .updateOne(query, { $set: { ...obj }})
          .then((res) => {
              resolve(res);
          });
      });
    }, (error) => { console.log(error); reject(error); });
  }

  updateMany(collection, fieldName, objs) {
    return new Promise((resolve, reject) => { 
      this.connectToMongo().then((db) => {
        for (const obj of objs) {
          db
          .collection(collection)
          .updateOne({ [fieldName]: obj[fieldName] }, { $set: { ...obj.obj }})
          .then((res) => {
              resolve(res);
          });
        }
        
      });
    }, (error) => { console.log(error); reject(error); });
  }
}

module.exports = { MongoDb };
