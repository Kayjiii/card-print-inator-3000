import * as fs from 'fs'
import { Card } from "./custom";
import { log } from 'console';

let emptyCard: Card = {
    name: '',
    element: '',
    type: '',
    content: '',
    mana: '',
    statline: ''
} 

let cards: Card[] = []
const elements = /^(Metall|Feuer|Holz|Erde|Wasser|Korrumpiert)$/
const manaPattern = /^.+ Energie$/
const statlinePattern = /^([0-9]+|X)\/([0-9]+|X)$/

export function getCards(filename: string) {
    let data = fs.readFileSync(filename + '.txt','utf8')
    var separateLines = data.split(/\r?\n|\r|\n/g)

    cards[0] = JSON.parse(JSON.stringify(emptyCard))

    let conseqLineBr = 0
    for (let i = 0; i < separateLines.length; i++) {

        let el = separateLines[i]
        if(el == '') {
            conseqLineBr++
        } else {
            conseqLineBr = 0
        } if (conseqLineBr == 2){
            cards.unshift(JSON.parse(JSON.stringify(emptyCard)))
            conseqLineBr = 0
            continue
        }
        
        if (elements.test(el)) {
            cards[0].element = el
        } else if (manaPattern.test(el) && cards[0].mana == "") {
            cards[0].mana = el
        } else if (statlinePattern.test(el)) {
            cards[0].statline = el
        } else if(cards[0].name == '') {
            cards[0].name = el
        } else if(cards[0].type == '') {
            cards[0].type = el
        } else {
            cards[0].content = `${cards[0].content}\n${el}` //never touch!!! wackyness incoming & adds \n at the front !pls fix me!
        }
    }
    
    return cards
}

