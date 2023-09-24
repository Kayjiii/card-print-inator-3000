"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDeckList = void 0;
const fs_1 = __importDefault(require("fs"));
const cardList = JSON.parse(fs_1.default.readFileSync('saves/cardList.json').toString());
function getDeckList(filename) {
    let data = fs_1.default.readFileSync(filename + '.txt', 'utf8');
    let deckList = [];
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
                    deckList.push(card);
                }
            }
            else {
                console.log("Could not find: " + text);
            }
        }
    }
    return deckList;
}
exports.getDeckList = getDeckList;
//check CardList for exampleList items
//generate pdf
//# sourceMappingURL=getCardList.js.map