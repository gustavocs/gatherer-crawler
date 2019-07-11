// imports
const cardCrawler = require('./crawler/card');

const cardId = 27166;

cardCrawler.get(cardId).then((card) => {
    console.log(card);
    }, (error) => console.log(error)
);
