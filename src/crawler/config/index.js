const cardProperty = require('./cardProperty');

module.exports = {
    defaultUrl: 'https://gatherer.wizards.com/Pages/Default.aspx',
    editionsContainer: '#ctl00_ctl00_MainContent_Content_SearchControls_setAddText',
    cardsPerPage: 100,
    cardComponentContainer: '.cardComponentContainer',
    cardIdContainer: '.cardItemTable .cardTitle a',
    cardImageContainer: '.cardDetails .cardImage img',
    cardRulesContainer: '.rulingsTable .rulingsText',
    cardLanguageContainer: '.cardList .cardItem',
    cardPrintingsContainer: '.cardList', // 0
    cardLegalityContainer: '.cardList', // 1
    cardTitleContainer: '.contentTitle span',

    cardRulingsContainer: (single, containerId) => {
        const singleCardContainerId = '#ctl00_ctl00_ctl00_MainContent_SubContent_SubContent_rulingsContainer tr';
        const doubleCardContainerId = `#ctl00_ctl00_ctl00_MainContent_SubContent_SubContent_ctl${containerId}_rulingsContainer tr`;

        return (single) ? singleCardContainerId 
            : doubleCardContainerId;
    },

    cardContainer: (property, single, containerId) => {
        let container = '';
        const singleCardContainerId = '#ctl00_ctl00_ctl00_MainContent_SubContent_SubContent_';
        const doubleCardContainerId = `#ctl00_ctl00_ctl00_MainContent_SubContent_SubContent_ctl${containerId}_`;

        switch (property) {
            case cardProperty.NAME: { container = 'nameRow .value'; break; }
            case cardProperty.MANA: { container = 'manaRow .value img'; break; }
            case cardProperty.CMC: { container = 'cmcRow .value'; break; }
            case cardProperty.TYPE: { container = 'typeRow .value'; break; }
            case cardProperty.TEXT: { container = 'textRow .value'; break; }
            case cardProperty.FLAVOR: { container = 'flavorRow .value'; break; }
            case cardProperty.POWER_THOUGHNESS: { container = 'ptRow .value'; break; }
            case cardProperty.SET: { container = 'setRow .value a'; break; }
            case cardProperty.RARITY: { container = 'rarityRow .value span'; break; }
            case cardProperty.NUMBER: { container = 'numberRow .value'; break; }
            case cardProperty.ARTIST: { container = 'artistRow .value a'; break; }
            case cardProperty.IMAGE: { container = 'cardImage'; break; }
        }

        return (single) ? `${singleCardContainerId + container }` 
            : `${doubleCardContainerId + container }` ;
    },

    cardPrintingsAndLegalityUrl: (cardId) => { return `https://gatherer.wizards.com/Pages/Card/Printings.aspx?multiverseid=${cardId}`; },
    cardDetailsUrl: (cardId) => { return `https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=${cardId}` },
    cardLanguagesUrl: (cardId) => { return `https://gatherer.wizards.com/Pages/Card/Languages.aspx?multiverseid=${cardId}` },
    cardSearchUrl: (edition, page) => { return encodeURI(`https://gatherer.wizards.com/Pages/Search/Default.aspx?set=["${edition}"]&page=${page}`); },
    cardImageUrl: (cardId) => { return `https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=${cardId}&type=card` },
    setIconImageUrl: (key, rarity) => { return `https://gatherer.wizards.com/Handlers/Image.ashx?type=symbol&set=${key}&size=small&rarity=${rarity}` }
};