import { createCanvas, registerFont, CanvasRenderingContext2D } from "canvas";
import { createWriteStream } from "fs";
import { Card } from "./custom";


const textMargin = 50
let borderMargin = 30
let nameFontSize = 80

let typeFontSize = 60


let contentFontSize = 40
let contentTextHeight = 300

let statFontSize = 60
let statHeight = 1000
let statwidth = 240

let manaFontSize = 60
let manawidth = 140

export function genOneCard(card: Card, destination:string) {

    registerFont('ComicSans.ttf', { family: 'Comic Sans' })
    const canvas = createCanvas(750, 1050)
    const ctx = canvas.getContext('2d')
    ctx.textDrawingMode = 'path'
    //make canvas

    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    addBorders(card.element, ctx, canvas.width, canvas.height)
    ctx.globalCompositeOperation = 'destination-out'
    //mach bckgrd white & Borders

    addName(card.name, ctx, canvas.width)

    addMana(card.mana, ctx, canvas.width)

    addType(card.type, ctx, canvas.width)

    addContent(card.content, ctx, canvas.height, canvas.width)

    addStats(card.statline, ctx, canvas.height, canvas.width)

    const out = createWriteStream(`${destination}.jpeg`)
    const stream = canvas.createJPEGStream()
    stream.pipe(out)
}


function addBorders(element: string, ctx: CanvasRenderingContext2D, canvaswidth: number, canvasheight: number) {
    let borderColor = 'white'
    switch (element) {
        case "Metall":
            borderColor = "black"
            break
    
        case "Holz":
            borderColor = "green"
            break

        case "Erde":
            borderColor = "yellow"
            break

        case "Wasser":
            borderColor = "blue"
            break

        case "Feuer":
            borderColor = "red"
            break

        case "Korrumpiert":
            borderColor = "purple"
            break

        default:
            borderColor = "maroon"
            break
    }
    ctx.fillStyle = borderColor
    ctx.fillRect(0, 0, canvaswidth, borderMargin)
    ctx.fillRect(0, 0, borderMargin, canvasheight)
    ctx.fillRect(0, canvasheight - borderMargin, canvaswidth, canvasheight)
    ctx.fillRect(canvaswidth - borderMargin, 0, canvaswidth, canvasheight) //this is stupid and unnecessary, but it works
}

function addName(name:string, ctx:CanvasRenderingContext2D, canvaswidth:number) {
    ctx.font = nameFontSize + 'px "Comic Sans"'
    let namewidth = ctx.measureText(name).width;

    let maxwidth = canvaswidth - (textMargin + manawidth)
    if (namewidth > maxwidth) {
        nameFontSize = nameFontSize * maxwidth / namewidth
        ctx.font = nameFontSize + 'px "Comic Sans"'
    }
    ctx.fillText(name, textMargin, 90)
}

function addMana(mana:string, ctx:CanvasRenderingContext2D, canvaswidth:number) {
    let value = mana.match(/^(.*?)(?= Energie)/)
    ctx.font = manaFontSize + 'px "Comic Sans"'
    if (value != null) {
        let width = ctx.measureText(value[0]).width
        ctx.fillText(value[0], canvaswidth - (manawidth / 2 + width), 90)
    }
}

function addType(type:string, ctx:CanvasRenderingContext2D, canvaswidth:number) {
    ctx.font = typeFontSize + 'px "Comic Sans"'
    let typewidth = ctx.measureText(type).width;

    let maxwidth = canvaswidth - (textMargin * 2)
    if (typewidth > maxwidth) {
        typeFontSize = typeFontSize * maxwidth / typewidth
        ctx.font = typeFontSize + 'px "Comic Sans"'
    }
    ctx.fillText(type, textMargin, 200)
}

function addContent(content: string, ctx: CanvasRenderingContext2D, canvasheight: number, canvaswidth: number) {
    ctx.font = contentFontSize + "px 'Comic Sans'"

    let currentFontSize = contentFontSize
    let outText = ""
    let splitContent = content.split(/ +/)

    for (let i = 0; i < splitContent.length; i++) {
        let tempText = outText + splitContent[i] + " "
        if (ctx.measureText(tempText).width < canvaswidth - textMargin * 2)
            outText = tempText
        else{
            outText += "\n"
            i--
        } 

        let metrics = ctx.measureText(outText);
        let actualHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent
        if(actualHeight > canvasheight - (contentTextHeight + (canvasheight - statHeight) + statFontSize)) { // it just works, kann vlt funky werden
            i = 0
            outText = ""
            currentFontSize -= 1
            ctx.font = currentFontSize + "px 'Comic Sans'"
        }
    }
    
    ctx.fillText(outText, textMargin, contentTextHeight)
}

function addStats(statline: string, ctx: CanvasRenderingContext2D, canvasheight: number, canvaswidth: number) {
    ctx.font = statFontSize + 'px "Comic Sans"'
    ctx.fillText(statline, canvaswidth - (statwidth / 2 + statFontSize / 2), statHeight)
}