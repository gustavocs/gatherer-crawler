// imports
const assert = require('chai').assert;

const setsCrawler = require('../src/crawler/sets');
const cardListCrawler = require('../src/crawler/cardList');
const cardCrawler = require('../src/crawler/card');
const cardLanguageCrawler = require('../src/crawler/cardLanguages');
const cardPrintingsCrawler = require('../src/crawler/cardPrintingsAndLegality');

// Set: Apocalypse
const set = 'Apocalypse';

// Dual land: Temple Garden RAV
const dualLandCardId = 89093;

// Basic land: Mountain M20
const landCardId = 467027;

// Creature - Wizard: Grim Lavamancer Torment
const creatureId = 36111;

// Planeswalker: Legendary Planeswalker — Liliana Innistrad
const planeswalkerId = 235597;

// Double faced: Huntmaster of the Fells
const doubleFacedId = 262875;

// Split card: Fire / Ice
const splitCardId = 27166;

describe('Crawler tests', () => {
    it('should get all sets', (done) => {
        setsCrawler.get().then((sets) => {
            assert.ok(sets);
            assert.ok(Array.isArray(sets));
            assert.ok(sets.length > 1);

            done();
        }, (error) => { done(error) });
    });

    it('should get card list given a set', (done) => {
        cardListCrawler.get(set).then((cardList) => {
            assert.ok(cardList);
            assert.ok(cardList[set]);
            assert.ok(Array.isArray(cardList[set].cards));

            done();
        }, (error) => { done(error) });
    });

    it('should get card details: basic land', (done) => {
        cardCrawler.get(landCardId).then((card) => {
            assert.ok(card);
            assert.equal(card.name, 'Mountain');

            assert.equal(card.set.key, 'M20');
            assert.equal(card.set.name, 'Core Set 2020');

            assert.ok(card.type);
            assert.equal(card.type, 'Basic Land');

            assert.ok(card.subTypes);
            assert.ok(Array.isArray(card.subTypes));
            assert.equal(card.subTypes[0], 'Mountain');

            assert.equal(card.cmc, '');
            assert.equal(card.rarity, 'Basic Land');

            assert.equal(card.text, 
                `R`);

            done();
        }, (error) => { done(error) });
    });

    it('should get card details: shock land', (done) => {
        cardCrawler.get(dualLandCardId).then((card) => {
            assert.ok(card);
            assert.equal(card.name, 'Temple Garden');

            assert.equal(card.set.key, 'RAV');
            assert.equal(card.set.name, 'Ravnica: City of Guilds');

            assert.ok(card.type);
            assert.equal(card.type, 'Land');

            assert.ok(card.subTypes);
            assert.ok(Array.isArray(card.subTypes));
            assert.equal(card.subTypes[0], 'Forest');
            assert.equal(card.subTypes[1], 'Plains');

            assert.equal(card.cmc, '');
            assert.equal(card.rarity, 'Rare');
            assert.equal(card.number, 284);
            assert.equal(card.artist, 'Rob Alexander');

            assert.equal(card.text, 
                `([Tap]: Add [Green] or [White].)\nAs Temple Garden enters the battlefield, you may pay 2 life. If you don't, it enters the battlefield tapped.`);

            done();
        }, (error) => { done(error) });
    });

    it('should get card details: creature', (done) => {
        cardCrawler.get(creatureId).then((card) => {
            assert.ok(card);
            assert.equal(card.name, 'Grim Lavamancer');

            assert.equal(card.set.key, 'TOR');
            assert.equal(card.set.name, 'Torment');

            assert.ok(card.type);
            assert.equal(card.type, 'Creature');

            assert.ok(card.subTypes);
            assert.ok(Array.isArray(card.subTypes));
            assert.equal(card.subTypes[0], 'Human');
            assert.equal(card.subTypes[1], 'Wizard');

            assert.equal(card.mana[0], 'Red');
            assert.equal(card.cmc, '1');
            assert.equal(card.rarity, 'Rare');
            assert.equal(card.number, 100);
            assert.equal(card.artist, 'Jim Nelson');

            assert.equal(card.text, 
                `[Red], [Tap], Exile two cards from your graveyard: Grim Lavamancer deals 2 damage to any target.`);

            done();
        }, (error) => { done(error) });
    });

    it('should get card details: planeswalker', (done) => {
        cardCrawler.get(planeswalkerId).then((card) => {
            assert.ok(card);
            assert.equal(card.name, 'Liliana of the Veil');

            assert.equal(card.set.key, 'ISD');
            assert.equal(card.set.name, 'Innistrad');

            assert.ok(card.type);
            assert.equal(card.type, 'Legendary Planeswalker');

            assert.ok(card.subTypes);
            assert.ok(Array.isArray(card.subTypes));
            assert.equal(card.subTypes[0], 'Liliana');

            assert.equal(card.mana[0], '1');
            assert.equal(card.mana[1], 'Black');
            assert.equal(card.mana[2], 'Black');

            assert.equal(card.cmc, '3');
            assert.equal(card.rarity, 'Mythic Rare');
            assert.equal(card.number, 105);
            assert.equal(card.artist, 'Steve Argyle');

            assert.equal(card.text, 
                `+1: Each player discards a card.\n−2: Target player sacrifices a creature.\n−6: Separate all permanents target player controls into two piles. That player sacrifices all permanents in the pile of their choice.`);

            done();
        }, (error) => { done(error) });
    });

    it.only('should get card details: double faced', (done) => {
        cardCrawler.get(doubleFacedId).then((card) => {
            assert.ok(card);
            
            done();
        }, (error) => { done(error) });
    });

    it.only('should get card details: split card', (done) => {
        cardCrawler.get(splitCardId).then((card) => {
            assert.ok(card);
            
            done();
        }, (error) => { done(error) });
    });

    it('should get languages', (done) => {
        cardLanguageCrawler.get(dualLandCardId).then((languages) => {
            assert.ok(languages);
            assert.ok(Array.isArray(languages));
            assert.ok(languages.length > 0);

            done();
        }, (error) => { done(error) });
    });

    it('should get prints and legality', (done) => {
        cardPrintingsCrawler.get(dualLandCardId).then((printingsAndLegality) => {
            assert.ok(printingsAndLegality);

            assert.ok(printingsAndLegality.printings);
            assert.ok(printingsAndLegality.legality);

            assert.ok(Array.isArray(printingsAndLegality.printings));
            assert.ok(Array.isArray(printingsAndLegality.legality));

            done();
        }, (error) => { done(error) });
    });
});
