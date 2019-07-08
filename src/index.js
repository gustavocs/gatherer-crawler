// index.js

// imports
const editionsCrawler = require('./crawler/editionsCrawler');
const cardsCrawler = require('./crawler/cardsCrawler');

// call
editionsCrawler.getEditions()
    .then((result) => {
        result.toArray().forEach(edition => {
            if (edition){
                cardsCrawler.getCards(edition).then((cardIds) => {
                    console.log(`${edition}: ${cardIds.length}`);
                });
            }
        });
    }, (error) => console.log(error)
);
