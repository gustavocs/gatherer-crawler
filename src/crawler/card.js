const config = require("./config");
const c = require('./_crawler');

const get = (cardId) => {
    return new Promise((resolve, reject) => {
        c.queue([{
            uri: config.cardDetailsUrl(cardId),
            callback: (error, res, done)  => {
                if (error){
                    reject(error);
                } else {
                    try {
                        const $ = res.$;
                    
                        // TODO: Dual cards (ie: 249394, 259281)
                        const card = {
                            name: $(`${config.cardNameContainer}`).text().trim(),
                            imageUrl: config.cardImageUrl(cardId),
                            cmc: $(`${config.cardCmcContainer}`).text().trim(),
                            type: $(`${config.cardTypeContainer}`).text().trim(),
                            pt: $(`${config.cardPtContainer}`).text().trim(),
                            set: {
                                key: $($($(`${config.cardSetContainer}`)[0]).find('img')).attr('src').split('set=')[1].split('&')[0],
                                name: $($(`${config.cardSetContainer}`)[1]).text().trim()
                            },
                            rarity: $(`${config.cardRarityContainer}`).text().trim(),
                            number: $(`${config.cardNumberContainer}`).text().trim(),
                            artist: $(`${config.cardArtistContainer}`).text().trim(),
                            mana: $(`${config.cardManaContainer}`).map((i, img) => {
                                return $(img).attr('alt');
                            }).toArray(),
                            rulings: $(`${config.cardRulesContainer}`).map((i, element) => {
                                return $(element).text().trim();
                            }).toArray()
                        }
                        resolve(card); 
                    } catch (error) {
                        reject(`${cardId}: ${error}`);
                    }
                }
                done();
            }
        }]);
    });
}

module.exports = { get };