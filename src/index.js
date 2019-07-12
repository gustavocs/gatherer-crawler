// index.js

// imports
const setsCrawler = require('./crawler/sets');
const cardsListCrawler = require('./crawler/cardList');
const cardCrawler = require('./crawler/card');
const cardLanguagesCrawler = require('./crawler/cardLanguages');
const cardPrintings = require('./crawler/cardPrintingsAndLegality');

const MongoDb = require('./db/mongoDb').MongoDb;
const db = new MongoDb();
let cardsToInsert = [];

const executeAsync = async () => {
    await getDataAsync();
    await db.insertManyOptimized(cardsToInsert);

    process.exit();
}

const execute = async () => {
    const sets = await setsCrawler.get();
    console.log(`All sets retrieved: ${ sets.join(', ') }. Inserting...`);
    db.insertMany('sets', sets.map((el, index) => { return { id: index, name: el } })).then(() => console.log('done!'));
    
    let setCards = {};
    for (const set in sets){
        setCards = await cardsListCrawler.get(sets[set]);
        console.log(`Retrieved ${ setCards.length } cards from ${sets[set]}`);
    }

    for (const set in Object.keys(setCards)) {
        for (const cardId in cards[set].cards) {
            let card = await cardCrawler.get(cardId);
            console.log(`Retrieved ${ card.name } succesfuly!`);

            const languages = await cardLanguagesCrawler.get(cardId);
            const printigsAndLegality = await cardPrintings.get(cardId)
            card = { 
                ...card,
                languages,
                printigsAndLegality
            }
            console.log(`Retrieved languages and printings succesfuly! Adding to cache...`);
            db.insert(card);
        }
    }
    
    process.exit();
}


const getDataAsync = async () => {
    const sets = await setsCrawler.get();
    console.log(`All sets retrieved: ${ sets.join(', ') }. Inserting...`);
    db.insertMany('sets', sets.map((el, index) => { return { id: index, name: el } })).then(() => console.log('done!'));
    
    await sets.forEach(async (set) => {
        const cards = await cardsListCrawler.get(set);
        console.log(`Retrieved ${ cards[set].cards.length } cards from ${set}`);
        cards[set].cards.forEach(async (cardId)  => {
            let card = await cardCrawler.get(cardId);
            console.log(`Retrieved ${ card.name } succesfuly!`);

            const languages = await cardLanguagesCrawler.get(cardId);
            const printigsAndLegality = await cardPrintings.get(cardId)
            card = { 
                ...card,
                languages,
                printigsAndLegality
            }
            console.log(`Retrieved languages and printings succesfuly! Adding to cache...`);
            cardsToInsert.push(card);
        });
    });
}

execute();
