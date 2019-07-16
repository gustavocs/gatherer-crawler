// index.js

// imports
const ObservableArray = require('observable-collection').ObservableArray;

const setsCrawler = require('./crawler/sets');
const cardsListCrawler = require('./crawler/cardList');
const cardCrawler = require('./crawler/card');
const cardLanguagesCrawler = require('./crawler/cardLanguages');
const cardPrintingsCrawler = require('./crawler/cardPrintingsAndLegality');

const db = require('./db');

var subscribers = new Array();

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

    sets.forEach(async (set) => {
        if (!set.cards) {
            console.log(`${set.name} has no cards in database. Please review`);
            return;
        }
        const setCards = await db.getCardsBySet(set.name);
        const cardsToRetrieve = set.cards.filter(x => !setCards.some(c => c.id == x));

        if (cardsToRetrieve.length > 0) {
            cardsToInsert[set.name] = new ObservableArray();
            cardsToInsert[set.name].set = set.name;
            cardsToInsert[set.name].qty = cardsToRetrieve.length;

            subscribers.push(cardsToInsert[set.name].subscribe((arr) => { 
                if (arr.length > 0 && arr.length == arr.qty) {
                    db.insertCards(arr).then(() => console.log(`Inserted ${arr.length} cards from ${arr.set}`));
                }
            }));

            console.log(`Retrieving ${cardsToRetrieve.length} cards from ${set.name}`);
            cardsToRetrieve.forEach((cardId) => {
                cardCrawler.get(cardId).then(async (card) => {
                    db.insertCards(arr).then(() => console.log(`Retrieved ${card.name} (${set.name})`));
                    cardsToInsert[set.name].push(card);
                });
            });
        } else {
            console.log(`${set.name} is up to date! (${setCards.length} cards)`);
        }
    }); 
}

const updateCardLanguages = async () => {
    const sets = await db.getSets();
    let cardsToUpdate = {};

    sets.forEach(async (set) => {
        const setCards = await db.getCardsBySet(set.name);
        const cards = setCards.filter(c => set.cards.includes(c.id) && !c.languages);

        cardsToUpdate[set.name] = new ObservableArray();
        cardsToUpdate[set.name].set = set.name;
        cardsToUpdate[set.name].qty = cards.length;

        subscribers.push(cardsToUpdate[set.name].subscribe((arr) => { 
            if (arr.length > 0 && arr.length == arr.qty) {
                db.updateCards(arr).then(() => console.log(`Inserted languages for ${arr.length} cards from ${arr.set}`));
            }
        }));

        cards.forEach((card) => {
            cardLanguagesCrawler.get(card.id).then((languages) => {
                console.log(`Retrieved languages from ${ card.name } (${set.name}) succesfuly!`);
                cardsToUpdate[set.name].push({ id: card.id, obj: { languages } });
            });
        });
    }); 
}

const updateCardPrintings = async () => {
    const sets = await db.getSets();
    let cardsToUpdate = {};

    sets.forEach(async (set) => {
        const setCards = await db.getCardsBySet(set.name);
        const cards = setCards.filter(c => set.cards.includes(c.id) && !c.printingsAndLegality);

        cardsToUpdate[set.name] = new ObservableArray();
        cardsToUpdate[set.name].set = set.name;
        cardsToUpdate[set.name].qty = cards.length;

        subscribers.push(cardsToUpdate[set.name].subscribe((arr) => { 
            if (arr.length > 0 && arr.length == arr.qty) {
                db.updateCards(arr).then(() => console.log(`Inserted printings and legality for ${arr.length} cards from ${arr.set}`));
            }
        }));

        cards.forEach((card) => {
            cardPrintingsCrawler.get(card.id).then((printingsAndLegality) => {
                console.log(`Retrieved printings and legality from ${ card.name } (${set.name}) succesfuly!`);
                cardsToUpdate[set.name].push({ id: card.id, obj: { printingsAndLegality } });
            });
        });
    }); 
}

(async () => {
    await updateSets();
    await updateCards();
    await updateCardLanguages();
    await updateCardPrintings();
    // process.exit();
})();