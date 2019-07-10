// imports
const cardCrawler = require('../crawler/card');
const cardLanguageCrawler = require('../crawler/cardLanguages');
const cardPrintingsCrawler = require('../crawler/cardPrintingsAndLegality');

const db = require('../db/client');

const cardId = 89093;

// call
cardCrawler.get(cardId).then((card) => {
    cardLanguageCrawler.get(cardId).then((languages) => {
        card = { 
            ...card,
            languages,
        }
        cardPrintingsCrawler.get(cardId).then(async (printings) => {
            card = { 
                ...card,
                printings,
            }
            
            const result = await db.insert('cards', card);
            console.log(result);
        });
    });
});


