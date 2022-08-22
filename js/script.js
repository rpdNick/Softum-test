import { filedCardsInWatchArea } from './scroll-controller';
import { 
    cardsInfo, 
    headerNav, 
    fillCards,
    createdCardsArray,
    topBtn
} from './constants';
import { 
    createCard,
    cardOptions,
    removeCard,
    refreshCardIndex
 } from './cards';

headerNav.addEventListener('click', (e)=> {
    const type = e.target.getAttribute('data-type');
    switch (type) {
        case 'add-card':
            let randomCardContent = cardsInfo.random(cardsInfo.length);
            createCard(randomCardContent.title, randomCardContent.content);
            cardOptions();
            break;
        case 'delete-card':
            let cards = document.querySelectorAll('.card');
            if (cards.length > 0) {
                let lastCard = cards[cards.length - 1];
                removeCard(lastCard);
                refreshCardIndex();
            }
            break;
        case 'fill-cards':
            console.log('fill-cards');
            break;
        case 'clear-cards':
            const cardsList = document.querySelectorAll('.cards-container .card');
            clearCards(cardsList);
            refreshCardIndex();
            break;
        case 'show-history':
            console.log('show-history');
            break;
    }
});

function clearCards(cardsList) {
    if(cardsList.length > 0) {
        for (let i = 0; i < cardsList.length; i++) {
            if (i > 0) {
                cardsList[i].remove();
            }
        }
        createdCardsArray.splice(1, cardsList.length - 1);
        localStorage.setItem('cards', JSON.stringify(createdCardsArray));
        fillCards.checked = false;
    }
}

    /*get random element from array*/
    Array.prototype.random = function () {
    return this[Math.floor((Math.random()*this.length))];
  }
  
  document.querySelector('.close-popup').addEventListener('click', function() {
    this.closest('.popup-overlay').style.cssText = "top: -300; visibility: hidden; opacity: 0;";
  });

  function displayCreatedCards() {
    let storedCards = JSON.parse(localStorage.getItem('cards'));
    if(storedCards != null) {
        storedCards.forEach((card) => {
            createCard(card.cardTitile, card.cardContent);
        })
    }
  }

  document.addEventListener("DOMContentLoaded", function(event) { 
        displayCreatedCards();
        cardOptions();
  });


  fillCards.addEventListener('change', function() {
    if (this.checked) {
        window.addEventListener('scroll', filedCardsInWatchArea);
        filedCardsInWatchArea();
    } else {
        window.removeEventListener('scroll', filedCardsInWatchArea);
    }
  });

  topBtn.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });
  window.onscroll = () => window.scrollY > 500 ? topBtn.style.opacity = 1 : topBtn.style.opacity = 0;

