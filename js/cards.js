import { 
    cardsInfo,
    cardsContainer,
    createdCardsArray,
} from './constants';

export function generateCard() {
    let randomCardContent = cardsInfo.random(cardsInfo.length);
    createCard(randomCardContent.title, randomCardContent.content);
    cardOptions();
}


export function createCard(title, content) {
    let cardIndex = document.querySelectorAll('.card').length + 1;
    let cardTemplate = `
    <div class="card" data-index="${cardIndex}">
        <div class="card-header">
            <h1>${title}</h1>
        </div>
        <div class="card-content">
            <p>${content}</p>
        </div>
        <div class="card-buttons">
            <button class="btn green-btn open-popup">Открыть</button>
            <button class="btn red-btn remove-card">Удалить</button>
        </div>
        <div class="loading-wrapper">
            <div class="loading"></div>
        </div>
    </div>`;
    cardsContainer.innerHTML += cardTemplate;
    createdCardsArray.push({
        cardTitile: title,
        cardContent: content
    });
    localStorage.setItem('cards', JSON.stringify(createdCardsArray));
    hideLoader(cardIndex);
}

export function cardOptions() {
    const cardNavigation = document.querySelectorAll('.card-buttons');
        cardNavigation.forEach((el)=> {
            el.addEventListener('click', (e) => {
                if(e.target.classList.contains('remove-card')) {
                    const card = e.target.closest('.card');
                    removeCard(card);
                    refreshCardIndex();
                } else {
                    const card = e.target.closest('.card');
                    const cardTitleTxt = card.querySelector('.card-header h1').innerText;
                    const cardContentTxt = card.querySelector('.card-content p').innerText;
                    showPopup(cardTitleTxt, cardContentTxt);
                }
            })
        });
  }

 export function removeCard(card) {
    let index = card.getAttribute('data-index');
    createdCardsArray.splice(index - 1, 1);
    localStorage.setItem('cards', JSON.stringify(createdCardsArray));
    card.remove();
}

export function refreshCardIndex() {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index)=> {
        card.setAttribute('data-index', index + 1);
    });
  }

  function showPopup(title, content) {
    const popup = document.querySelector('.popup-overlay');
    const addContent = popup.querySelector('.popup-content');
    let cardPopupTemplate = 
        `<h2 class="title">${title}</h2>
        <p class="content">${content}</p>`;
        addContent.innerHTML = cardPopupTemplate;
    popup.style.cssText = "top: 0; visibility: visible; opacity: 1;";
  }
 
function hideLoader(index) {

    setTimeout(function () {
        const cardsLoader = document.querySelector(`.card[data-index="${index}"] .loading-wrapper`)
        cardsLoader.style.display = 'none';
        }, 3000);
  }