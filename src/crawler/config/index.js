module.exports = {
    defaultUrl: 'https://gatherer.wizards.com/Pages/Default.aspx',
    
    editionsContainer: '#ctl00_ctl00_MainContent_Content_SearchControls_setAddText',
    cardsPerPage: 100,

    cardComponentContainer: '.cardComponentContainer .cardDetails',
    cardIdContainer: '.cardItemTable .cardTitle a',
    cardNameContainer: '#ctl00_ctl00_ctl00_MainContent_SubContent_SubContent_nameRow .value',
    cardImageContainer: '.cardDetails .cardImage img',
    cardManaContainer: '#ctl00_ctl00_ctl00_MainContent_SubContent_SubContent_manaRow .value img',
    cardCmcContainer: '#ctl00_ctl00_ctl00_MainContent_SubContent_SubContent_cmcRow .value',
    cardTypeContainer: '#ctl00_ctl00_ctl00_MainContent_SubContent_SubContent_typeRow .value',
    cardTextContainer: '#ctl00_ctl00_ctl00_MainContent_SubContent_SubContent_textRow .value',
    cardFlavorContainer: '#ctl00_ctl00_ctl00_MainContent_SubContent_SubContent_flavorRow .value .flavortextbox',
    cardPtContainer: '#ctl00_ctl00_ctl00_MainContent_SubContent_SubContent_ptRow .value',
    cardSetContainer: '#ctl00_ctl00_ctl00_MainContent_SubContent_SubContent_setRow .value a',
    cardRarityContainer: '#ctl00_ctl00_ctl00_MainContent_SubContent_SubContent_rarityRow .value span',
    cardNumberContainer: '#ctl00_ctl00_ctl00_MainContent_SubContent_SubContent_numberRow .value',
    cardArtistContainer: '#ctl00_ctl00_ctl00_MainContent_SubContent_SubContent_artistRow .value a',
    
    cardRulesContainer: '.rulingsTable .rulingsText',
    cardLanguageContainer: '.cardList .cardItem',

    cardPrintingsContainer: '.cardList', // 0
    cardLegalityContainer: '.cardList', // 1

    cardPrintingsAndLegalityUrl: (cardId) => { return `https://gatherer.wizards.com/Pages/Card/Printings.aspx?multiverseid=${cardId}`; },
    cardDetailsUrl: (cardId) => { return `https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=${cardId}` },
    cardLanguagesUrl: (cardId) => { return `https://gatherer.wizards.com/Pages/Card/Languages.aspx?multiverseid=${cardId}` },
    cardSearchUrl: (edition, page) => { return `https://gatherer.wizards.com/Pages/Search/Default.aspx?set=["${edition}"]&page=${page}`; },
    cardImageUrl: (cardId) => { return `https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=${cardId}&type=card` },
    setIconImageUrl: (key, rarity) => { return `https://gatherer.wizards.com/Handlers/Image.ashx?type=symbol&set=${key}&size=small&rarity=${rarity}` }
};