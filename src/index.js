// index.js

// imports
const setsCrawler = require('./crawler/sets');
const cardsListCrawler = require('./crawler/cardList');
const cardCrawler = require('./crawler/card');
const cardLanguagesCrawler = require('./crawler/cardLanguages');
const cardPrintings = require('./crawler/cardPrintingsAndLegality');

const db = require('./db/client');

const execute = async () => {
    const sets = await setsCrawler.get();
    console.log(`All sets retrieved: ${ sets.join(', ') }. Inserting...`);
    db.insertMany('sets', sets.map((el, index) => { return { id: index, name: el } })).then(() => console.log('done!'));
    
    sets.forEach(async set => {
        const cards = await cardsListCrawler.get(set);
        console.log(`Retrieved ${ cards[set].cards.length } cards from ${set}`);

        for (const cardId of cards[set].cards) {
            let card = await cardCrawler.get(cardId);
            console.log(`Retrieved ${ card.name } succesfuly!`);

            const languages = await cardLanguagesCrawler.get(cardId);
            const printigsAndLegality = await cardPrintings.get(cardId)
            card = { 
                ...card,
                languages,
                printigsAndLegality
            }
            console.log(`Retrieved languages and printings succesfuly! Inserting...`);

            db.insert('cards', card).then(() => console.log('done!'));
        }
    });
}
                       
execute();
