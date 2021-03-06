const config = require("./config");
const c = require('./_crawler');
const cardProperty = require('./config/cardProperty');

const bindCard = ($, cardId, single, containerId) => {
    const types = $(config.cardContainer(cardProperty.TYPE, single, containerId)).text().trim().split('—');

    $(`${config.cardContainer(cardProperty.TEXT, single, containerId)} img`).map((i, img) => {
        $(img).replaceWith(`[${$(img).attr('alt')}]`);
    });

    let text = '';
    $(`${config.cardContainer(cardProperty.TEXT, single, containerId)} .cardtextbox`).map((i, textString) => {
        text = text.concat(`${$(textString).text().trim()}${(i < $(`${config.cardContainer(cardProperty.TEXT, single, containerId)} .cardtextbox`).length - 1) ? '\n' : ''}`);
    });

    cardId = (single) ? cardId : $(config.cardContainer(cardProperty.IMAGE, single, containerId)).attr('src').split('multiverseid=')[1].split('&')[0];
    card = {
        id: parseInt(cardId),
        text: text.trim(),
        imageUrl: config.cardImageUrl(cardId),
        name: $(config.cardContainer(cardProperty.NAME, single, containerId)).text().trim(),
        cmc: parseInt($(config.cardContainer(cardProperty.CMC, single, containerId)).text().trim()),
        type: types[0].trim(),
        rarity: $(config.cardContainer(cardProperty.RARITY, single, containerId)).text().trim(),
        number: $(config.cardContainer(cardProperty.NUMBER, single, containerId)).text().trim(),
        artist: $(config.cardContainer(cardProperty.ARTIST, single, containerId)).text().trim(),
        pt: $(config.cardContainer(cardProperty.POWER_THOUGHNESS, single, containerId)).text().trim(),
        subTypes: (types.length > 1) ?
            $(types)[1].trim().split(' ') : [],
        set: {
            key: $($($(config.cardContainer(cardProperty.SET, single, containerId)).eq(0)).find('img')).attr('src').split('set=')[1].split('&')[0],
            name: $($(config.cardContainer(cardProperty.SET, single, containerId)).eq(1)).text().trim()
        },
        mana: $(config.cardContainer(cardProperty.MANA, single, containerId)).map((i, img) => {
            return $(img).attr('alt');
        }).toArray(),
        rulings: $(config.cardRulingsContainer(single, containerId)).map((i, element) => {
            return {
                date: new Date($(element).find('td').eq(0).text().trim()), 
                ruling: $(element).find('td').eq(1).text().trim() };
        }).toArray()
    };

    return card;
}

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

                        if($(`${config.cardComponentContainer} .cardDetails`).length == 1) {
                            card = bindCard($, cardId, true);
                        } else {
                            card = {
                                id: parseInt(cardId),
                                name: $(config.cardTitleContainer).text().trim(),
                                faces: new Array()
                            } 
                            
                            $(config.cardComponentContainer).toArray().forEach((e) => {
                                const id = $(e).find('div').first().attr('id');
                                const face = bindCard($, cardId, false, id.substring(id.indexOf('SubContent_ctl')+14, (id.length - 17)));
                                card.faces.push(face);
                            });

                            card.set = card.faces[0].set;
                            card.rarity = card.faces[0].rarity;
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
