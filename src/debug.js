// imports
const cardCrawler = require('./crawler/card');

// Temple Garden
const cardId = 89093;

cardCrawler.get(cardId).then((card) => {
    console.log(card);
    }, (error) => console.log(error)
);
