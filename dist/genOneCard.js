"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genOneCard = void 0;
const canvas_1 = require("canvas");
const fs_1 = require("fs");
const textMargin = 50;
const borderMargin = 30;
const nameFontSize = 80;
const typeFontSize = 50;
const contentFontSize = 40;
const contentTextHeight = 300;
const statFontSize = 60;
const statHeight = 1000;
const statwidth = 240;
const manaFontSize = 60;
const manawidth = 170;
function genOneCard(card, destination) {
    (0, canvas_1.registerFont)('ComicSans.ttf', { family: 'Comic Sans' });
    const canvas = (0, canvas_1.createCanvas)(750, 1050);
    const ctx = canvas.getContext('2d');
    ctx.textDrawingMode = 'path';
    //make canvas
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    addBorders(card.element, ctx, canvas.width, canvas.height);
    ctx.globalCompositeOperation = 'destination-out';
    //mach bckgrd white & Borders
    addName(card.name, ctx, canvas.width);
    addMana(card.mana, ctx, canvas.width);
    addType(card.type, ctx, canvas.width);
    addContent(card.content, ctx, canvas.height, canvas.width);
    addStats(card.statline, ctx, canvas.height, canvas.width);
    const out = (0, fs_1.createWriteStream)(`${destination}.jpeg`);
    const stream = canvas.createJPEGStream();
    stream.pipe(out);
}
exports.genOneCard = genOneCard;
function addBorders(element, ctx, canvaswidth, canvasheight) {
    let borderColor = 'white';
    switch (element) {
        case "Metall":
            borderColor = "black";
            break;
        case "Holz":
            borderColor = "green";
            break;
        case "Erde":
            borderColor = "yellow";
            break;
        case "Wasser":
            borderColor = "blue";
            break;
        case "Feuer":
            borderColor = "red";
            break;
        case "Korrumpiert":
            borderColor = "purple";
            break;
        default:
            borderColor = "maroon";
            break;
    }
    ctx.fillStyle = borderColor;
    ctx.fillRect(0, 0, canvaswidth, borderMargin);
    ctx.fillRect(0, 0, borderMargin, canvasheight);
    ctx.fillRect(0, canvasheight - borderMargin, canvaswidth, canvasheight);
    ctx.fillRect(canvaswidth - borderMargin, 0, canvaswidth, canvasheight); //this is stupid and unnecessary, but it works
}
function addName(name, ctx, canvaswidth) {
    ctx.font = nameFontSize + 'px "Comic Sans"';
    let namewidth = ctx.measureText(name).width;
    let maxwidth = canvaswidth - (textMargin + manawidth);
    if (namewidth > maxwidth) {
        let currentFontSize = nameFontSize;
        currentFontSize = currentFontSize * maxwidth / namewidth;
        ctx.font = currentFontSize + 'px "Comic Sans"';
    }
    ctx.fillText(name, textMargin, 100);
}
function addMana(mana, ctx, canvaswidth) {
    let value = mana.match(/^(.*?)(?= Energie)/);
    ctx.font = manaFontSize + 'px "Comic Sans"';
    if (value != null) {
        let width = ctx.measureText(value[0]).width;
        ctx.fillText(value[0], canvaswidth - (manawidth / 2 + width / 2), 90);
    }
}
function addType(type, ctx, canvaswidth) {
    ctx.font = typeFontSize + 'px "Comic Sans"';
    let typewidth = ctx.measureText(type).width;
    let maxwidth = canvaswidth - (textMargin * 2);
    if (typewidth > maxwidth) {
        let currentFontSize = typeFontSize;
        currentFontSize = currentFontSize * maxwidth / typewidth;
        ctx.font = currentFontSize + 'px "Comic Sans"';
    }
    ctx.fillText(type, textMargin, 200);
}
function addContent(content, ctx, canvasheight, canvaswidth) {
    ctx.font = contentFontSize + "px 'Comic Sans'";
    let currentFontSize = contentFontSize;
    let outText = "";
    let splitContent = content.split(/ +/);
    for (let i = 0; i < splitContent.length; i++) {
        let tempText = outText + splitContent[i] + " ";
        if (ctx.measureText(tempText).width < canvaswidth - textMargin * 2)
            outText = tempText;
        else {
            outText += "\n";
            i--;
        }
        let metrics = ctx.measureText(outText);
        let actualHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
        if (actualHeight > canvasheight - (contentTextHeight + (canvasheight - statHeight) + statFontSize)) { // it just works, kann vlt funky werden
            i = 0;
            outText = "";
            currentFontSize -= 1;
            ctx.font = currentFontSize + "px 'Comic Sans'";
        }
    }
    ctx.fillText(outText, textMargin, contentTextHeight);
}
function addStats(statline, ctx, canvasheight, canvaswidth) {
    ctx.font = statFontSize + 'px "Comic Sans"';
    ctx.fillText(statline, canvaswidth - (statwidth / 2 + statFontSize / 2), statHeight);
}
//# sourceMappingURL=genOneCard.js.map