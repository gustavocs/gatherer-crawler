// index.js

// imports
const editionsCrawler = require('./crawler/editionsCrawler');
const cardsListCrawler = require('./crawler/cardListCrawler');
const cardCrawler = require('./crawler/cardCrawler');

// call
editionsCrawler.getEditions()
    .then((result) => {
        result.toArray().forEach(edition => {
            if (edition){
                cardsListCrawler.getCardList(edition).then((cardIds) => {
                    cardIds[edition].cards.forEach(cardId => {
                        cardCrawler.getCard(cardId).then((card) => {
                            console.log(`${card}`);
                        });
                    });
                    console.log(`${edition}: ${cardIds[edition].cards.length}`);
                });
            }
        });
    }, (error) => console.log(error)
);
