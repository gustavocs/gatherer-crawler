const config = require("./config");
const c = require('./crawler');

const getLanguages = (cardId) => {
    return new Promise((resolve, reject) => {
        c.queue([{
            uri: config.cardLanguagesUrl(cardId),
            callback: (error, res, done)  => {
                if (error){
                    reject(error);
                } else {
                    const $ = res.$;
                    const 

                    const cardIds = [123, 1234, 467];

                    resolve(cardIds); 
                }
                done();
            }
        }]);
    });
}

module.exports = { getLanguages };