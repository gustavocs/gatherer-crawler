// imports
const ObservableArray = require('observable-collection').ObservableArray;

const setsCrawler = require('../crawler/sets');
const cardsListCrawler = require('../crawler/cardList');
const cardCrawler = require('../crawler/card');
const cardLanguagesCrawler = require('../crawler/cardLanguages');
const cardPrintingsCrawler = require('../crawler/cardPrintingsAndLegality');

const service = require('./service');

var subscribers = new Array();
var updatingSets = false;

const updateSets = async () => {
    const setsRetrieved = await setsCrawler.get();
    console.log(`All sets retrieved: ${ setsRetrieved.join(', ') }. Updating...`);
    console.log(
        await service.updateSets(setsRetrieved));

    const sets = await service.getSets();
    sets.forEach(async (set) => {
        if (!set.cards) {
            updatingSets = true;
            console.log(`${set.name} has no card list in database. Retrieving...`);
            const cards = await cardsListCrawler.get(set.name);
            if (cards) { 
                console.log(`Retrieved ${ cards.length } cards from ${set.name}. Inserting...`);
                console.log(
                    await service.updateCardList(set.name, cards));
            }
        }
    });
}

const updateCards = async () => {
    const sets = await service.getSets();
    let cardsToInsert = new Array();

    for (const set of sets) {
        if (!set.cards) {
            console.log(`Warning: ${set.name} has no cards in database.`);
            continue;
        }
        const setCards = await service.getCardsBySet(set.name);
        const cardsToRetrieve = set.cards.filter(x => !setCards.some(c => c.id == x));

        if (cardsToRetrieve.length > 0) {
            console.log(`${set.name} has ${cardsToRetrieve.length} to be retrieved. Starting...`);
            cardsToInsert[set.name] = new ObservableArray();
            cardsToInsert[set.name].set = set.name;
            cardsToInsert[set.name].qty = cardsToRetrieve.length;

            subscribers.push(cardsToInsert[set.name].subscribe((arr) => { 
                if (arr.length > 0 && arr.length == arr.qty) {
                    service.insertCards(arr).then(() => console.log(`Inserted ${arr.length} cards from ${arr.set}`));
                }
            }));

            console.log(`Retrieving ${cardsToRetrieve.length} cards from ${set.name}`);
            cardsToRetrieve.forEach((cardId) => {
                cardCrawler.get(cardId).then(async (card) => {
                    console.log(`Retrieved ${card.name} (${set.name})`);
                    cardsToInsert[set.name].push(card);
                });
            });
        } else {
            console.log(`${set.name} is up to date! (${setCards.length} cards)`);
        }
    } 
}

const updateCardLanguages = async () => {
    const sets = await service.getSets();
    let cardsToUpdate = {};

    sets.forEach(async (set) => {
        const setCards = await service.getCardsBySet(set.name);
        const cards = setCards.filter(c => set.cards.includes(c.id) && !c.languages);

        if (cards && cards.length > 0) {
            cardsToUpdate[set.name] = new ObservableArray();
            cardsToUpdate[set.name].set = set.name;
            cardsToUpdate[set.name].qty = cards.length;

            subscribers.push(cardsToUpdate[set.name].subscribe((arr) => { 
                if (arr.length > 0 && arr.length == arr.qty) {
                    service.updateCards(arr).then(() => console.log(`Inserted languages for ${arr.length} cards from ${arr.set}`));
                }
            }));

            cards.forEach((card) => {
                cardLanguagesCrawler.get(card.id).then((languages) => {
                    console.log(`Retrieved languages from ${ card.name } (${set.name}) succesfuly!`);
                    cardsToUpdate[set.name].push({ id: card.id, obj: { languages } });
                });
            });
        } else {
            console.log(`${set.name} languages are up to date!`);
        }
    }); 
}

const updateCardPrintings = async () => {
    const sets = await service.getSets();
    let cardsToUpdate = {};

    sets.forEach(async (set) => {
        const setCards = await service.getCardsBySet(set.name);
        const cards = setCards.filter(c => set.cards.includes(c.id) && !c.printings && !c.legality);

        if (cards && cards.length > 0) {
            cardsToUpdate[set.name] = new ObservableArray();
            cardsToUpdate[set.name].set = set.name;
            cardsToUpdate[set.name].qty = cards.length;

            subscribers.push(cardsToUpdate[set.name].subscribe((arr) => { 
                if (arr.length > 0 && arr.length == arr.qty) {
                    service.updateCards(arr).then(() => console.log(`Inserted printings and legality for ${arr.length} cards from ${arr.set}`));
                }
            }));

            cards.forEach((card) => {
                cardPrintingsCrawler.get(card.id).then((printingsAndLegality) => {
                    console.log(`Retrieved printings and legality from ${ card.name } (${set.name}) succesfuly!`);
                    cardsToUpdate[set.name].push({ id: card.id, obj: { ...printingsAndLegality } });
                });
            });
        } else {
            console.log(`${set.name} printings and legality are up to date!`);
        }
    }); 
}

const execute = async () => {
    await updateSets();

    if (updatingSets) {
        console.log('Sets are being update. Skipping cards. Please wait to sets update to finish and run application again.');
    } else {
        await updateCards();

        if (subscribers && subscribers.length > 0) {
            console.log('Skipping languages and printings / legalit work. Please wait to cards search to finish and run application again.');
        } else {
            await updateCardLanguages();
            await updateCardPrintings();
        }
    }
};

module.exports = { execute };