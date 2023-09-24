"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genPrintable = void 0;
const genOneCard_1 = require("./genOneCard");
const canvas_1 = require("canvas");
const fs_1 = require("fs");
async function genPrintable(cards) {
    /*fs.readdir('./pictures', (err, files) => {
        if (err) throw err;
      
        for (const file of files) {
          fs.unlink(path.join('./pictures', file), (err) => {
            if (err) throw err;
          });
        }
      });*/
    // delete all files from picture folder
    (0, canvas_1.registerFont)('ComicSans.ttf', { family: 'Comic Sans' });
    const canvas = (0, canvas_1.createCanvas)(2480, 3508, "pdf");
    const ctx = canvas.getContext("2d");
    ctx.textDrawingMode = 'glyph';
    let picNo = 1;
    for (let i = 0; i < cards.length; i++) {
        const el = cards[i];
        (0, genOneCard_1.genOneCard)(el, `./pictures/${i}`);
    }
    setTimeout(async () => {
        for (let i = 0; i < cards.length; i++) {
            const el = cards[i];
            const img = await (0, canvas_1.loadImage)(`./pictures/${i}.jpeg`);
            switch (picNo) {
                case 1:
                    ctx.drawImage(img, 0, 0);
                    break;
                case 2:
                    ctx.drawImage(img, 750, 0);
                    break;
                case 3:
                    ctx.drawImage(img, 1500, 0);
                    break;
                case 4:
                    ctx.drawImage(img, 0, 1050);
                    break;
                case 5:
                    ctx.drawImage(img, 750, 1050);
                    break;
                case 6:
                    ctx.drawImage(img, 1500, 1050);
                    break;
                case 7:
                    ctx.drawImage(img, 0, 2100);
                    break;
                case 8:
                    ctx.drawImage(img, 750, 2100);
                    break;
                case 9:
                    ctx.drawImage(img, 1500, 2100);
                    break;
            }
            picNo++;
            if (picNo == 10) {
                ctx.addPage();
                picNo = 1;
            }
        }
        const out = (0, fs_1.createWriteStream)(`out.pdf`);
        const stream = canvas.createPDFStream();
        stream.pipe(out);
    }, 2000);
}
exports.genPrintable = genPrintable;
//# sourceMappingURL=genPrintable.js.map