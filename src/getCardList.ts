import fs from 'fs'
import { Card } from './custom'

const cardList: Card[] = JSON.parse(fs.readFileSync('saves/cardList.json').toString())

export function getDeckList(filename: string) {
    let data = fs.readFileSync(filename + '.txt','utf8')
    let deckList: Card[] = []
    const lines = data.split('\n');

    const regex = /(\d+)x\s(.+)/;

    for (const line of lines) {
        const match = regex.exec(line);
        if (match) {
            const number = match[1];
            const text = match[2];
            const card = cardList.find(obj => obj.name === text);
            if (card) {
                for (let i = 0; i < parseInt(number); i++) {
                    deckList.push(card)
                }
            } else {
                console.log("Could not find: " + text)
            }
        }
    }

    return deckList
}
//check CardList for exampleList items
//generate pdf