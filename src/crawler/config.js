module.exports = {
    defaultUrl: 'https://gatherer.wizards.com/Pages/Default.aspx',
    editionsContainer: '#ctl00_ctl00_MainContent_Content_SearchControls_setAddText',
    cardsPerPage: 100,
    cardIdContainer: '.cardItemTable .cardTitle a',
    cardNameContainer: '#ctl00_ctl00_ctl00_MainContent_SubContent_SubContent_nameRow .value',
    cardImageContainer: '.cardDetails .cardImage img',
    cardManaContainer: '#ctl00_ctl00_ctl00_MainContent_SubContent_SubContent_manaRow .value img',
    cardCmcContainer: '#ctl00_ctl00_ctl00_MainContent_SubContent_SubContent_cmcRow .value',
    cardTypeContainer: '#ctl00_ctl00_ctl00_MainContent_SubContent_SubContent_typeRow .value',
    cardFlavorContainer: '#ctl00_ctl00_ctl00_MainContent_SubContent_SubContent_flavorRow .value .flavortextbox',
    cardPtContainer: '#ctl00_ctl00_ctl00_MainContent_SubContent_SubContent_ptRow .value',
    cardRarityContainer: '#ctl00_ctl00_ctl00_MainContent_SubContent_SubContent_rarityRow .value span',
    cardNumberContainer: '#ctl00_ctl00_ctl00_MainContent_SubContent_SubContent_numberRow .value',
    cardArtistContainer: '#ctl00_ctl00_ctl00_MainContent_SubContent_SubContent_artistRow .value a',
    cardRulesContainer: '.rulingsTable .rulingsText',
    cardLanguageContainer: '.cardList .cardItem',

    cardSearchUrl: (edition, page) => { return `https://gatherer.wizards.com/Pages/Search/Default.aspx?set=["${edition}"]&page=${page}`; },
    cardDetailsUrl: (cardId) => { return `https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=${cardId}` },
    cardLanguagesUrl: (cardId) => { return `https://gatherer.wizards.com/Pages/Card/Languages.aspx?multiverseid=${cardId}` },
    cardImageUrl: (cardId) => { return `https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=${cardId}&type=card` }
};