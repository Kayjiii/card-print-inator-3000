import path from "path";
import { genOneCard } from "./genOneCard";
import { getCards } from "./getCardInfo"
import * as fs from 'fs'
import { createCanvas, loadImage, registerFont } from "canvas";
import { createWriteStream } from "fs";
import { config } from "process";
import { Card } from "./custom";

export async function genPrintable(cards: Card[]) {
    /*fs.readdir('./pictures', (err, files) => {
        if (err) throw err;
      
        for (const file of files) {
          fs.unlink(path.join('./pictures', file), (err) => {
            if (err) throw err;
          });
        }
      });*/
    // delete all files from picture folder

    registerFont('ComicSans.ttf', { family: 'Comic Sans' })
    const canvas = createCanvas(2480, 3508, "pdf")
    const ctx = canvas.getContext("2d")
    ctx.textDrawingMode = 'glyph'
    let picNo = 1
    for (let i = 0; i < cards.length; i++) {
        const el = cards[i]
        genOneCard(el, `./pictures/${i}`)
    }
    setTimeout(async () => {
        for (let i = 0; i < cards.length; i++) {
            const el = cards[i];
            const img = await loadImage(`./pictures/${i}.jpeg`)
            switch (picNo) {
                case 1:
                    ctx.drawImage(img, 0, 0)
                    break;
                
                case 2:
                    ctx.drawImage(img, 750, 0)
                    break;
                
                case 3:
                    ctx.drawImage(img, 1500, 0)
                    break;
                
                case 4:
                    ctx.drawImage(img, 0, 1050)
                    break;
                    
                case 5:
                    ctx.drawImage(img, 750, 1050)
                    break;
    
                case 6:
                    ctx.drawImage(img, 1500, 1050)
                    break;
    
                case 7:
                    ctx.drawImage(img, 0, 2100)
                    break;
    
                case 8:
                    ctx.drawImage(img, 750, 2100)
                    break;
    
                case 9:
                    ctx.drawImage(img, 1500, 2100)
                    break;
            }
            picNo++
            if(picNo == 10) {
                ctx.addPage()
                picNo = 1
            }
        }
        const out = createWriteStream(`out.pdf`)
        const stream = canvas.createPDFStream()
        stream.pipe(out)
    }, 2000)


}