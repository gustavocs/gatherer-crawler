const config = require("./config");
const c = require('./_crawler');

const get = (edition) => {
    return new Promise((resolve, reject) => {
        getCardList(edition, 0, []).then(cards => {
            resolve(cards.filter((v, i, a) => a.indexOf(v) === i)); // distinct
        }, (error) => reject(error));
    });
}
const getCardList = (edition, page, cards) => {
    return new Promise((resolve, reject) => {
        c.queue([{
            uri: config.cardSearchUrl(edition, page),
            callback: (error, res, done)  => {
                if (error){
                    reject(error);
                } else {
                    const $ = res.$;
                    $(`${config.cardIdContainer}`).toArray().forEach(element => {
                        const el = $(element).attr('href');
                        const cardId = el.split('multiverseid=')[1].split('&')[0];
                        cards.push(parseInt(cardId));
                    });
                        
                    if ($(`${config.cardIdContainer}`).length >= 100) {
                        page++;
                        resolve(getCardList(edition, page, cards));
                    }
                    else {
                        resolve(cards);
                    }
                }
                done();
            }
        }]);
    });
}

module.exports = { get };