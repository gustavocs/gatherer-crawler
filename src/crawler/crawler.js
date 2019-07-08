const crawler = require("crawler");

module.exports = new crawler({
    maxConnections: 1,
    callback : function (error, res, done) {
        if(error){
            console.log(error);
        } else {
            console.log(res.request.uri);
        }
        done();
    }
});