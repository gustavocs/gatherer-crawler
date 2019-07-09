// imports
const cardCrawler = require('../crawler/cardCrawler');
const cardId = 394005;

// call
cardCrawler.getCard(cardId).then((card) => {
    console.log(`${card}`);
});
