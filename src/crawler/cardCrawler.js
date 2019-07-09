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
                        imageUrl: config.cardImageUrl(cardId),
                        cmc: $(`${config.cardCmcContainer}`).text().trim(),
                        type: $(`${config.cardTypeContainer}`).text().trim(),
                        pt: $(`${config.cardPtContainer}`).text().trim(),
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
                }
                done();
            }
        }]);
    });
}

module.exports = { getCard };