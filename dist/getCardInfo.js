"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCards = void 0;
const fs = __importStar(require("fs"));
let emptyCard = {
    name: '',
    element: '',
    type: '',
    content: '',
    mana: '',
    statline: ''
};
let cards = [];
const elements = /^(Metall|Feuer|Holz|Erde|Wasser|Korrumpiert)$/;
const manaPattern = /^.+ Energie$/;
const statlinePattern = /^([0-9]+|X)\/([0-9]+|X)$/;
function getCards(filename) {
    let data = fs.readFileSync(filename + '.txt', 'utf8');
    var separateLines = data.split(/\r?\n|\r|\n/g);
    cards[0] = JSON.parse(JSON.stringify(emptyCard));
    let conseqLineBr = 0;
    for (let i = 0; i < separateLines.length; i++) {
        let el = separateLines[i];
        if (el == '') {
            conseqLineBr++;
        }
        else {
            conseqLineBr = 0;
        }
        if (conseqLineBr == 2) {
            cards.unshift(JSON.parse(JSON.stringify(emptyCard)));
            conseqLineBr = 0;
            continue;
        }
        if (elements.test(el)) {
            cards[0].element = el;
        }
        else if (manaPattern.test(el)) {
            cards[0].mana = el;
        }
        else if (statlinePattern.test(el)) {
            cards[0].statline = el;
        }
        else if (cards[0].name == '') {
            cards[0].name = el;
        }
        else if (cards[0].type == '') {
            cards[0].type = el;
        }
        else {
            cards[0].content = `${cards[0].content}\n${el}`; //never touch!!! wackyness incoming & adds \n at the front !pls fix me!
        }
    }
    return cards;
}
exports.getCards = getCards;
//# sourceMappingURL=getCardInfo.js.map