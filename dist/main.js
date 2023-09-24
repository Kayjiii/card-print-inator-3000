"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const genPrintable_1 = require("./genPrintable");
const getCardInfo_1 = require("./getCardInfo");
const setCardList_1 = require("./setCardList");
(0, setCardList_1.setCardList)('cardList');
(0, genPrintable_1.genPrintable)((0, getCardInfo_1.getCards)('cardList'));
//genPrintable(getDeckList('exampleList'))
//# sourceMappingURL=main.js.map