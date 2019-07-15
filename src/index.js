// index.js

// imports
const setsCrawler = require('./crawler/sets');
const cardsListCrawler = require('./crawler/cardList');
const cardCrawler = require('./crawler/card');
const cardLanguagesCrawler = require('./crawler/cardLanguages');
const cardPrintingsCrawler = require('./crawler/cardPrintingsAndLegality');

const db = require('./db');

const execute = async () => {
    await updateSets();
    await updateCards();
    await updateCardLanguages();
    await updateCardPrintings();
    //process.exit();
}

const updateSets = async () => {
    const setsRetrieved = await setsCrawler.get();
    console.log(`All sets retrieved: ${ setsRetrieved.join(', ') }. Updating...`);
    console.log(
        await db.updateSets(setsRetrieved));

    const sets = await db.getSets();
    await sets.forEach(async (set, i) => {
        if (!set.cards) {
            const cards = await cardsListCrawler.get(set.name);
            if (cards && cards.length > 0) { 
                console.log(`Retrieved ${ cards.length } cards from ${set.name}. Inserting...`);
                console.log(
                    await db.updateCardList(set.name, cards));
            }
        }
    });
}

const updateCards = async () => {
    const sets = await db.getSets();
    let cardsToInsert = new Array();

    for (const j in sets) {
        const set = sets[j];
        if (set.cards) {
            for (const i in set.cards) {
                const card = await db.getCard(set.cards[i]);
                if (!card) {
                    let card = await cardCrawler.get(set.cards[i]);
                    console.log(`Retrieved ${ card.name } (${set.name}) succesfuly! Added to queue...`);
                    cardsToInsert.push(card);
                } else {
                    console.log(`${card.name} (${set.name}) already in database.`);
                }  
            }
            if (cardsToInsert.length > 0) {
                console.log(`Inserting ${cardsToInsert.length} from ${set.name} cards to db...`);
                console.log(
                    await db.insertCards(cardsToInsert));
                cardsToInsert = [];
            }
        }   
    }
    console.log('finished!');
}

const updateCardLanguages = async () => {
    const sets = await db.getSets();
    let cardsToUpdate = new Array();

    for (const j in sets) {
        const set = sets[j];
        if (set.cards) {
            for (const i in set.cards) {
                const card = await db.getCard(set.cards[i]);
                if (!card.languages) {
                    const languages = await cardLanguagesCrawler.get(set.cards[i]);
                    console.log(`Retrieved languages from ${ card.name } (${set.name}) succesfuly!`);
                    cardsToUpdate.push({ id: set.cards[i], languages });
                } else {
                    console.log(`${card.name} (${set.name}) languages already in database.`);
                }  
            }
            if (cardsToUpdate.length > 0) {
                console.log(`Inserting ${cardsToUpdate.length} languages from ${set.name} cards to db...`);
                for (const lang in cardsToUpdate) {
                    console.log(
                        await db.updateCard(lang.id, lang.languages));
                }
                cardsToUpdate = [];
            }
        }   
    }
    console.log('finished!');
}

const updateCardPrintings = async () => {
    const sets = await db.getSets();
    let cardsToUpdate = new Array();

    for (const j in sets) {
        const set = sets[j];
        if (set.cards) {
            for (const i in set.cards) {
                const card = await db.getCard(set.cards[i]);
                if (!card.printings) {
                    const printingsAndLegality = await cardPrintingsCrawler.get(set.cards[i]);
                    console.log(`Retrieved printings and legality from ${ card.name } (${set.name}) succesfuly!`);
                    cardsToUpdate.push({ id: set.cards[i], printingsAndLegality });
                } else {
                    console.log(`${card.name} (${set.name}) printings and legality already in database.`);
                }  
            }
            if (cardsToUpdate.length > 0) {
                console.log(`Inserting ${cardsToUpdate.length} printings and legality from ${set.name} cards to db...`);
                for (const lang in cardsToUpdate) {
                    console.log(
                        await db.updateCard(lang.id, lang.printingsAndLegality));
                }
                cardsToUpdate = [];
            }
        }   
    }
    console.log('finished!');
}

execute();