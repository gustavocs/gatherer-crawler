const config = require("./config");
const c = require('./_crawler');

const get = (cardId) => {
    return new Promise((resolve, reject) => {
        c.queue([{
            uri: config.cardLanguagesUrl(cardId),
            callback: (error, res, done)  => {
                if (error){
                    reject(error);
                } else {
                    const $ = res.$;
                    const languages = $(config.cardLanguageContainer).map((i, element) => {
                        const id = $($(element).find('a').first()).attr('href').split('=')[1];
                        
                        return {
                            id,
                            imageUrl: config.cardImageUrl(id),
                            language: $($(element).find('td')[1]).text().trim(),
                            translatedLanguage: $($(element).find('td')[2]).text().trim(),
                            translatedName: $($(element).find('td')[0]).text().trim()
                        };  
                    });
                    resolve(languages.toArray()); 
                }
                done();
            }
        }]);
    });
}

module.exports = { get };