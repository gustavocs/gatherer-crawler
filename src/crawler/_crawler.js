const crawler = require("crawler");

module.exports = new crawler({
    maxConnections: 20,
    callback : function (error, res, done) {
        if(error){
            console.log(error);
        } else {
            console.log(res.request.uri);
        }
        done();
    }
});