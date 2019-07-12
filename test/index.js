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

            assert.equal(card.rulings[0].date.getTime(), new Date(2018, 9, 5).getTime());
            assert.equal(card.rulings[0].ruling, 
                `Unlike most dual lands, this land has two basic land types. It’s not basic, so cards such as District Guide can’t find it, but it does have the appropriate land types for effects such as that of Drowned Catacomb (from the Ixalan set).`);
            
            assert.equal(card.rulings[1].date.getTime(), new Date(2018, 9, 5).getTime());
            assert.equal(card.rulings[1].ruling, 
                `If an effect puts this land onto the battlefield tapped, you may pay 2 life, but it still enters tapped.`);

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

    it('should get card details: double faced', (done) => {
        cardCrawler.get(doubleFacedId).then((card) => {
            assert.ok(card);

            assert.ok(Array.isArray(card.faces));
            assert.equal(card.faces.length, 2);
            assert.equal(card.name, 'Huntmaster of the Fells');
            assert.equal(card.set.key, 'DKA');
            assert.equal(card.set.name, 'Dark Ascension');
            assert.equal(card.rarity, 'Mythic Rare');

            //#region card1
            const card1 = card.faces[0];
            assert.equal(card1.name, 'Huntmaster of the Fells');

            assert.equal(card1.mana[0], '2');
            assert.equal(card1.mana[1], 'Red');
            assert.equal(card1.mana[2], 'Green');

            assert.equal(card1.type, 'Creature');

            assert.ok(Array.isArray(card1.subTypes));
            assert.equal(card1.subTypes[0], 'Human');
            assert.equal(card1.subTypes[1], 'Werewolf');
            

            assert.equal(card1.cmc, '4');
            assert.equal(card1.rarity, 'Mythic Rare');
            assert.equal(card1.number, '140a');
            assert.equal(card1.artist, 'Chris Rahn');
            assert.equal(card1.pt, '2 / 2');
            assert.equal(card1.text, 
                `Whenever this creature enters the battlefield or transforms into Huntmaster of the Fells, create a 2/2 green Wolf creature token and you gain 2 life.\nAt the beginning of each upkeep, if no spells were cast last turn, transform Huntmaster of the Fells.`);   

            assert.ok(Array.isArray(card1.rulings));
            assert.equal(card1.rulings[0].date.getTime(), new Date(2016, 6, 13).getTime());
            assert.equal(card1.rulings[0].ruling, 
                `For more information on double-faced cards, see the Shadows over Innistrad mechanics article (http://magic.wizards.com/en/articles/archive/feature/shadows-over-innistrad-mechanics).`);
            //#endregion

            //#region card2
            const card2 = card.faces[1];
            assert.equal(card2.name, 'Ravager of the Fells');
            assert.equal(card2.mana.length, 0);
            assert.equal(card2.type, 'Creature');
            assert.ok(Array.isArray(card2.subTypes));
            assert.equal(card2.subTypes[0], 'Werewolf');
            assert.equal(card2.cmc, '4');
            assert.equal(card2.rarity, 'Mythic Rare');
            assert.equal(card2.number, '140b');
            assert.equal(card2.artist, 'Chris Rahn');
            assert.equal(card2.pt, '4 / 4');
            assert.equal(card2.text, 
                `Trample\nWhenever this creature transforms into Ravager of the Fells, it deals 2 damage to target opponent or planeswalker and 2 damage to up to one target creature that player or that planeswalker's controller controls.\nAt the beginning of each upkeep, if a player cast two or more spells last turn, transform Ravager of the Fells.`);
            //#endregion

            done();
        }, (error) => { done(error) });
    });

    it('should get card details: split card', (done) => {
        cardCrawler.get(splitCardId).then((card) => {
            assert.ok(card);

            assert.ok(Array.isArray(card.faces));
            assert.equal(card.faces.length, 2);

            assert.equal(card.name, 'Fire // Ice');
            assert.equal(card.set.key, 'AP');
            assert.equal(card.set.name, 'Apocalypse');
            assert.equal(card.rarity, 'Uncommon');

            //#region card1
            const card1 = card.faces[0];
            assert.equal(card1.name, 'Fire');

            assert.equal(card1.mana[0], '1');
            assert.equal(card1.mana[1], 'Red');

            assert.equal(card1.type, 'Instant');

            assert.ok(Array.isArray(card1.subTypes));
            
            assert.equal(card1.cmc, '2');
            assert.equal(card1.number, '128a');
            assert.equal(card1.artist, 'Franz Vohwinkel');
            assert.equal(card1.text.trim(), 
                `Fire deals 2 damage divided as you choose among one or two targets.`);

            assert.ok(Array.isArray(card1.rulings));
            assert.ok(card1.rulings[0].date.getTime(), new Date(2018, 11, 7).getTime());
            assert.ok(card1.rulings[0].ruling, 
                `You divide the damage as you cast Fire, not as it resolves. Each target must be assigned at least 1 damage. In other words, as you cast Fire, you choose whether to have it deal 2 damage to a single target, or deal 1 damage to each of two targets.`);
            
            assert.ok(card1.rulings[0].date.getTime(), new Date(2018, 11, 7).getTime());
            assert.ok(card1.rulings[0].ruling, 
                `If Fire targets two creatures and one becomes an illegal target, the remaining target is dealt 1 damage, not 2.`);
            //#endregion

            //#region card2
            const card2 = card.faces[1];
            assert.equal(card2.name, 'Ice');

            assert.equal(card2.mana[0], '1');
            assert.equal(card2.mana[1], 'Blue');

            assert.equal(card2.type, 'Instant');
            assert.ok(Array.isArray(card2.subTypes));
           
            assert.equal(card2.cmc, '2');
            assert.equal(card2.rarity, 'Uncommon');
            assert.equal(card2.number, '128b');
            assert.equal(card2.artist, 'Franz Vohwinkel');

            assert.equal(card2.text, 
                `Tap target permanent.\nDraw a card.`);

            assert.equal(card2.rulings[0].date.getTime(), new Date(2018, 11, 7).getTime());
            assert.equal(card2.rulings[0].ruling, 
                    `If the target permanent becomes an illegal target for Ice, the spell doesn’t resolve. You don’t draw a card.`);
            //#endregion
            
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
