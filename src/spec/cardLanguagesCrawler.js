// imports
const crawler = require('../crawler/cardLanguagesCrawler');
const cardId = 31761;

// call
crawler.getLanguages(cardId).then((cards) => {
    cards.forEach(card => {
        console.log(`${card}`);
    });
});
