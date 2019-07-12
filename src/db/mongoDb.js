const MongoClient = require('mongodb').MongoClient;

class MongoDb {
  constructor() {
    this.db = null;
    this.maxSizeInsertMany = 1000;
    this.url = 'mongodb://localhost:27017';
    this.options = {
      bufferMaxEntries: 0,
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

  async insertManyOptimized(collection, objs) {
    const size = this.maxSizeInsertMany;
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
}

module.exports = { MongoDb };
