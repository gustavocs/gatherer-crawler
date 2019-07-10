const config = require("./config");
const c = require('./_crawler');

const get = (cardId) => {
    return new Promise((resolve, reject) => {
        c.queue([{
            uri: config.cardPrintingsAndLegalityUrl(cardId),
            callback: (error, res, done)  => {
                if (error){
                    reject(error);
                } else {
                    const $ = res.$;

                    const printings = $($(config.cardPrintingsContainer)[0]).find('.cardItem').map((i, element) => {
                        return {
                            id: $($(element).find('a').first()).attr('href').split('multiverseid=')[1].split('&')[0],
                            edition: $($(element).find('td')[2]).text().trim(),
                        };  
                    });

                    const legality = $($(config.cardPrintingsContainer)[1]).find('.cardItem').map((i, element) => {
                        return {
                            [$($(element).find('td')[0]).text().trim()]: $($(element).find('td')[1]).text().trim(), 
                        };  
                    });

                    resolve({
                        printings: printings.toArray(),
                        legality: legality.toArray()
                    }); 
                }
                done();
            }
        }]);
    });
}

module.exports = { get };