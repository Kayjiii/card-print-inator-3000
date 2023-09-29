"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const genPrintable_1 = require("./genPrintable");
const setCardList_1 = require("./setCardList");
const getCardList_1 = require("./getCardList");
(0, setCardList_1.setCardList)('cardList');
//genPrintable(getCards('cardList'))
(0, genPrintable_1.genPrintable)((0, getCardList_1.getDeckList)('exampleList'));
//# sourceMappingURL=main.js.map