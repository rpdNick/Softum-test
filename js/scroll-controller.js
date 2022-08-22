import { generateCard } from './cards';
import {
    cardsContainer,
} from './constants';

let runfiledCardsInWatchArea = false;

export function filedCardsInWatchArea() {
    if (!runfiledCardsInWatchArea && isLastVisible()) {
        do {
            generateCard();
        } while (isLastVisible());
        runfiledCardsInWatchArea = false;
    }
}

function isLastVisible() {
    const lastElement = cardsContainer.lastElementChild;
    return isVisible(lastElement);
}

function isVisible(el) {
    if (!el) return true
    const b = el.getBoundingClientRect()
    const isVisible =  b.bottom <= (window.innerHeight + 100)
    return isVisible;
}