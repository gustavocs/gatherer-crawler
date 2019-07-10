const config = require("./config");
const c = require('./_crawler');

var cardIds = {};

const get = (edition, page) => {
    if(!cardIds[edition]) {
        cardIds = {
            ...cardIds,
            [edition]: {
                cards: [],
                pageNumber: 0
            }
        }
    }
    return new Promise((resolve, reject) => {
        c.queue([{
            uri: config.cardSearchUrl(edition, page),
            callback: (error, res, done)  => {
                if (error){
                    reject(error);
                } else {
                    const $ = res.$;
                    const cards = $(`${config.cardIdContainer}`).map((i, element) => {
                        const el = $(element).attr('href');
                        const cardId = el.split('multiverseid=')[1].split('&')[0];
                        cardIds[edition].cards.push(cardId);

                        return cardId;
                    });
            
                    if (cards.length >= 100) {
                        cardIds[edition].pageNumber++;
                        resolve(get(edition, cardIds[edition].pageNumber));
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

module.exports = { get };