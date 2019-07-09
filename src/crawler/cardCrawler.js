const config = require("./config");
const c = require('./crawler');

const getCard = (cardId) => {
    return new Promise((resolve, reject) => {
        c.queue([{
            uri: config.cardDetailsUrl(cardId),
            callback: (error, res, done)  => {
                if (error){
                    reject(error);
                } else {
                    const $ = res.$;
                    const card = {
                        name: $(`${config.cardNameContainer}`).text().trim(),
                        cmc: $(`${config.cardCmcContainer}`).text().trim()
                    }
                    resolve(card); 
                }
                done();
            }
        }]);
    });
}

module.exports = { getCard };