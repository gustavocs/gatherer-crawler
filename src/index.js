// index.js

// imports
const setsCrawler = require('./crawler/sets');
const cardsListCrawler = require('./crawler/cardList');
const cardCrawler = require('./crawler/card');
const cardLanguagesCrawler = require('./crawler/cardLanguages');
const cardPrintings = require('./crawler/cardPrintingsAndLegality');

const db = require('./db/client');

setsCrawler.get()
    .then((result) => {
        result.toArray().forEach(set => {
            cardsListCrawler.get(edition).then((cardIds) => {
                cardIds[set].cards.forEach(cardId => {
                    cardCrawler.get(cardId).then((card) => {
                        cardLanguagesCrawler.get(cardId).then((languages) => {
                            card = { 
                                ...card,
                                languages,
                            }
                            cardPrintings.get(cardId).then((printigsAndLegality) => {
                                card = { 
                                    ...card,
                                    printigsAndLegality,
                                }
                                
                                db.insert(card);
                            });
                        });
                    });
                });
            });
        });
    }, (error) => console.log(error)
);
