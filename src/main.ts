import { Card } from "./custom";
import { genOneCard } from "./genOneCard";
import { genPrintable } from "./genPrintable";
import { getCards } from "./getCardInfo";
import { setCardList } from "./setCardList";
import { getDeckList } from "./getCardList";
import { readFileSync, writeFileSync } from "fs";

//setCardList('cardList')
//genPrintable(getCards('cardList'))
genPrintable(getDeckList('listzwei'))

//const cardList: Card[] = JSON.parse(readFileSync('saves/cardList.json').toString())

//const items: Card[] = cardList.filter(item => item.element == "Erde" || item.element == "Holz")
/*
let outText = ""

for (let i = 0; i < items.length; i++) {
    outText += "1x " + items[i].name + "\n"
}
writeFileSync("single.txt", outText)*/

