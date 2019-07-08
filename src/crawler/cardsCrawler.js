const config = require("./config");
const c = require('./crawler');

var cardIds = {};
var pageNumber = 0;

const getCards = (edition, page) => {
    return new Promise((resolve, reject) => {
        c.queue([{
            uri: config.cardSearchUrl(edition, pageNumber),
            callback: (error, res, done)  => {
                if (error){
                    reject(error);
                } else {
                    const $ = res.$;
                    const cards = $(`${config.cardIdContainer}`).map((index, element) => {
                        const el = $(element).attr('href');
                        const cardId = el.substring(el.indexOf('=') + 1);
                        cardIds[edition].push(cardId);

                        return cardId;
                    });
            
                    if (cards.length < 100) {
                        getCards(edition, pageNumber++);
                    }
                    else {
                        resolve(cardIds);
                    }
                }
                done();
            }
        }]);
    });
}

module.exports = { getCards };