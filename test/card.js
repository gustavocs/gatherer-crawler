// imports
const assert = require('chai').assert;

const setsCrawler = require('../src/crawler/sets');
const cardListCrawler = require('../src/crawler/cardList');
const cardCrawler = require('../src/crawler/card');
const cardLanguageCrawler = require('../src/crawler/cardLanguages');
const cardPrintingsCrawler = require('../src/crawler/cardPrintingsAndLegality');

// Temple Garden
const cardId = 89093;

const set = 'Apocalypse';

describe('Crawler tests', () => {
    it('should get sets', (done) => {
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
            assert.equal(cardList[set].cards.length, 143);

            done();
        }, (error) => { done(error) });
    });

    it.only('should get card details: dual land', (done) => {
        cardCrawler.get(cardId).then((card) => {
            assert.ok(card);
            assert.equal(card.name, 'Temple Garden');

            assert.equal(card.set.key, 'RAV');
            assert.equal(card.set.name, 'Ravnica: City of Guilds');

            assert.ok(card.types);
            assert.ok(Array.isArray(card.types));
            assert.equal(card.types[0], 'Land');
            assert.ok(card.subTypes);
            assert.ok(Array.isArray(card.subTypes));
            assert.equal(card.subTypes[0], 'Forest');
            assert.equal(card.subTypes[1], 'Plains');

            assert.equal(card.cmc, '');
            assert.equal(card.rarity, 'Rare');
            assert.equal(card.number, 284);
            assert.equal(card.artist, 'Rob Alexander');

            assert.equal(card.text, `(Tap: Add Green or White.)
                As Temple Garden enters the battlefield, you may pay 2 life. If you don't, it enters the battlefield tapped.`);

            done();
        }, (error) => { done(error) });
    });

    it('should get languages', (done) => {
        cardLanguageCrawler.get(cardId).then((languages) => {
            assert.ok(languages);
            assert.ok(Array.isArray(languages));
            assert.ok(languages.length > 0);

            done();
        }, (error) => { done(error) });
    });

    it('should get prints and legality', (done) => {
        cardPrintingsCrawler.get(cardId).then((printingsAndLegality) => {
            assert.ok(printingsAndLegality);

            assert.ok(printingsAndLegality.printings);
            assert.ok(printingsAndLegality.legality);

            assert.ok(Array.isArray(printingsAndLegality.printings));
            assert.ok(Array.isArray(printingsAndLegality.legality));

            done();
        }, (error) => { done(error) });
    });
});
