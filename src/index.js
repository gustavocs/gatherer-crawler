#!/usr/bin/env node --max-old-space-size=4096

const updater = require('./updater');
const cardCrawler = require('./crawler/card');
const cardLanguagesCrawler = require('./crawler/cardLanguages');
const cardPrintingsAndLegalityCrawler = require('./crawler/cardPrintingsAndLegality');

(async() => {
    if (!process.argv[2]) {
        console.log('No argument passed.');
    } else {
        switch (process.argv[2]) {
            case 'update': { updater.execute(); break; }
            case 'card' : {
                const cardId = process.argv[3];
                if (!cardId) { console.log('No card id passed as argument'); break; }
                let card = await cardCrawler.get(cardId);
                const languages = await cardLanguagesCrawler.get(cardId);
                const printingsAndLegality  = await cardPrintingsAndLegalityCrawler.get(cardId);
    
                card = {
                    ...card,
                    ...printingsAndLegality,
                    languages
                };
    
                console.log(card);
                break;
             }
             default: console.log('Unsupported function.');
        }
    }
})();


