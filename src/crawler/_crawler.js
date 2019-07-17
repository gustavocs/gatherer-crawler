const crawler = require("crawler");
const config = require("../config");

module.exports = new crawler({
    maxConnections: config.crawlerMaxConnections,
    callback : function (error, res, done) {
        if(error){
            console.log(error);
        } else {
            console.log(res.request.uri);
        }
        done();
    }
});