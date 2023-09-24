import { Card } from "./custom";
import { genOneCard } from "./genOneCard";
import { genPrintable } from "./genPrintable";
import { getCards } from "./getCardInfo";
import { setCardList } from "./setCardList";
import { getDeckList } from "./getCardList";

//setCardList('cardList')
genPrintable(getCards('cardList'))
//genPrintable(getDeckList('exampleList'))


