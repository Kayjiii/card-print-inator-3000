import { getCards } from "./getCardInfo"
import fs from 'fs'

export function setCardList(filename: string) {
    fs.writeFileSync('saves/cardList.json', JSON.stringify(getCards(filename), null, 2))
}