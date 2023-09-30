"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const genPrintable_1 = require("./genPrintable");
const getCardList_1 = require("./getCardList");
//setCardList('cardList')
//genPrintable(getCards('cardList'))
(0, genPrintable_1.genPrintable)((0, getCardList_1.getDeckList)('listzwei'));
//const cardList: Card[] = JSON.parse(readFileSync('saves/cardList.json').toString())
//const items: Card[] = cardList.filter(item => item.element == "Erde" || item.element == "Holz")
/*
let outText = ""

for (let i = 0; i < items.length; i++) {
    outText += "1x " + items[i].name + "\n"
}
writeFileSync("single.txt", outText)*/
//# sourceMappingURL=main.js.map