"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCardList = void 0;
const getCardInfo_1 = require("./getCardInfo");
const fs_1 = __importDefault(require("fs"));
function setCardList(filename) {
    fs_1.default.writeFileSync('saves/cardList.json', JSON.stringify((0, getCardInfo_1.getCards)(filename), null, 2));
}
exports.setCardList = setCardList;
//# sourceMappingURL=setCardList.js.map