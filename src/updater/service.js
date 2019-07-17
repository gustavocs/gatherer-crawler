const MongoDb = require('../db/mongoDb').MongoDb;
const db = new MongoDb();

const getSets = () => {
    return new Promise(async (resolve, reject) => {
        const result = await db.find('sets', {});
        resolve(result);

    }, (error) => { reject(error); });
}

const insertCard = (card) => {
    return new Promise(async (resolve, reject) => {
        db.insert('cards', card).then(() => resolve('done!'));
    }, (error) => { reject(error); });
}
const insertCards = (cards) => {
    return new Promise(async (resolve, reject) => {
        db.insertManyOptimized('cards', cards).then(() => resolve('done!'));
    }, (error) => { reject(error); });
}

const getCardsBySet = (set) => {
    return new Promise(async (resolve, reject) => {
        const result = await db.find('cards', { 'set.name': set });
        resolve(result);
    }, (error) => { reject(error); });
}

const getCard = (cardId) => {
    return new Promise(async (resolve, reject) => {
        const result = await db.find('cards', { id: cardId });
        resolve(result[0]);
    }, (error) => { reject(error); });
}

const updateCard = (cardId, obj) => {
    return new Promise(async (resolve, reject) => {
        db.update('cards', { id: cardId }, { obj })
            .then(() => resolve('done!'));
    }, (error) => { reject(error); });
}

const updateSets = (sets) => {
    return new Promise(async (resolve, reject) => {
        const dbSets = await db.find('sets', {});
        const setsToUpdate = sets.filter(f => !dbSets.find(s => s.name == f));
        if (setsToUpdate && setsToUpdate.length > 0) {
            db.insertMany('sets', sets.filter(f => !dbSets.find(s => s.name == f)).map((e, i) => { return { name: e } }))
                .then(() => resolve('done!'));
        } else { resolve('up to date!'); }
        

    }, (error) => { reject(error); });
}

const updateCardList = (set, cards) => {
    return new Promise(async (resolve, reject) => {
        db.update('sets', { name: set }, { cards })
            .then(() => resolve('done!'));
    }, (error) => { reject(error); });
}

const updateCards = (cards) => {
    return new Promise(async (resolve, reject) => {
        db.updateMany('cards', 'id', cards)
            .then(() => resolve('done!'));
    }, (error) => { reject(error); });
}


module.exports = { updateSets, getSets, updateCardList, getCard, insertCard, insertCards, updateCard, getCardsBySet, updateCards };
