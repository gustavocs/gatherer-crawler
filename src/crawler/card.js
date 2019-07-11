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
                        let card = {};

                        if($(config.cardComponentContainer).length == 1) {
                            
                            const types = $(config.cardTypeContainer).text().trim().split('—');
                            $(`${config.cardTextContainer} img`).map((i, img) => {
                                $(img).replaceWith(`[${$(img).attr('alt')}]`);
                            }); 

                            let text = '';
                            $(`${config.cardTextContainer} .cardtextbox`).map((i, textString) => {
                                text = text.concat(`${$(textString).text().trim()}${(i < $(`${config.cardTextContainer} .cardtextbox`).length - 1) ? '\n' : '' }`);
                            });
                     
                            card = {
                                name: $(config.cardNameContainer).text().trim(),
                                imageUrl: config.cardImageUrl(cardId),
                                cmc: $(config.cardCmcContainer).text().trim(),
                                type: types[0].trim(), //.split(' '),
                                subTypes: (types.length > 1) ?
                                    $(config.cardTypeContainer).text().trim().split('—')[1].trim().split(' ') 
                                    : [],
                                text,
                                pt: $(config.cardPtContainer).text().trim(),
                                set: {
                                    key: $($($(config.cardSetContainer)[0]).find('img')).attr('src').split('set=')[1].split('&')[0],
                                    name: $($(config.cardSetContainer)[1]).text().trim()
                                },
                                rarity: $(config.cardRarityContainer).text().trim(),
                                number: $(config.cardNumberContainer).text().trim(),
                                artist: $(config.cardArtistContainer).text().trim(),
                                mana: $(config.cardManaContainer).map((i, img) => {
                                    return $(img).attr('alt');
                                }).toArray(),
                                rulings: $(config.cardRulesContainer).map((i, element) => {
                                    return $(element).text().trim();
                                }).toArray()
                            }
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