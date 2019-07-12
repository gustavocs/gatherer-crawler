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
        db.insertMany('sets', result.map((el, index) => { return { id: index, name: el } }));
        result.forEach(set => {
            cardsListCrawler.get(set).then((cardIds) => {
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
                                
                                db.insert('cards', card);
                            });
                        });
                    });
                });
            });
        });
    }, (error) => console.log(error)
);
