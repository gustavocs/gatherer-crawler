# gatherer-crawler
**Gatherer Crawler** is a web crawler that gets Magic: The Gathering card database from [Gatherer](https://gatherer.wizards.com) and save it to a **mongoDb**.

**gatherer crawler** retrieves all card information, rulings, languages and printings.

Sample JSON card:

```json
{   "id": 430589,
    "text": "[Red], [Tap], Exile two cards from your graveyard: Grim Lavamancer deals 2 damage to any target.",
    "imageUrl": "https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=430589&type=card",
    "name": "Grim Lavamancer",
    "cmc": "1",
    "type": "Creature",
    "subTypes": ["Human","Wizard"],
    "rarity": "Rare",
    "number": "50",
    "artist": "Michael Sutfin",
    "pt":"1 / 1",
    "set": { 
        "key": "E01",
        "name": "Archenemy: Nicol Bolas" },
    "mana": ["Red"],
    "rulings":[
        { 
            "date": "2011-09-22T03:00:00.000Z",
            "ruling": "The two cards are exiled as the cost of Grim Lavamancer’s ability is paid. Players can’t respond to the paying of costs by trying to move those cards to another zone."
        }
    ],
    "languages": [],
    "printings": [],
    "legality": []
}
```

## featuring / pre-requisites
- [Node.js](https://nodejs.org/en/download/)
- [MongoDb](http://mongodb.com)
- [node-crawler](http://nodecrawler.org/)

## before starting
Adjust your database instance url and database name in `config.js` file.
```
module.exports = {
    databaseUrl: 'mongodb://localhost:27017',
    databaseName: 'Magic',
    crawlerMaxConnections: 20 // doesn't look like too much for Gatherer server
}
```
Then install packages and create a symlink to gatherer-crawler:
```
npm install
npm link
```

## update database
Generates / updates a database with sets and cards data from Gatherer. 
```
gatherer-crawler update
```

Update task runs asyncronously and inserts and updates cards separated by editions in batches to avoid opening too many TCP connections to mongoDB that could cause SO to runs out of buffer.

After inserting / updating cards from a edition, it clears edition queue to free out memory space. Even though it sometimes could runs out of memory (ie. when crawler couldn't retrieve all cards from many editions for some reason and task accumulates too many cards saved in memory before inserting). In this case, it's just stop executing and run it again.

Please notice:

1. Tasks that update languages, printings and legality could run only after card database is complete for obvious reasons :)

2. Gatherer Crawler performance depends on the Gatherer availability and speed response. It has a default timeout and retry policy, so sometimes you can get a lot of timeout errors. When that happens, I strongly advice you to wait for the Gatherer to be stable and start update task again.   


## single card information


```
gatherer-crawler card [cardId]
```

enjoy!
