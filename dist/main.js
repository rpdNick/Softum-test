/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/cards.js":
/*!*********************!*\
  !*** ./js/cards.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "cardOptions": () => (/* binding */ cardOptions),
/* harmony export */   "createCard": () => (/* binding */ createCard),
/* harmony export */   "generateCard": () => (/* binding */ generateCard),
/* harmony export */   "refreshCardIndex": () => (/* binding */ refreshCardIndex),
/* harmony export */   "removeCard": () => (/* binding */ removeCard)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./js/constants.js");


function generateCard() {
    let randomCardContent = _constants__WEBPACK_IMPORTED_MODULE_0__.cardsInfo.random(_constants__WEBPACK_IMPORTED_MODULE_0__.cardsInfo.length);
    createCard(randomCardContent.title, randomCardContent.content);
    cardOptions();
}


function createCard(title, content) {
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
    _constants__WEBPACK_IMPORTED_MODULE_0__.cardsContainer.innerHTML += cardTemplate;
    _constants__WEBPACK_IMPORTED_MODULE_0__.createdCardsArray.push({
        cardTitile: title,
        cardContent: content
    });
    localStorage.setItem('cards', JSON.stringify(_constants__WEBPACK_IMPORTED_MODULE_0__.createdCardsArray));
    hideLoader(cardIndex);
}

function cardOptions() {
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

 function removeCard(card) {
    let index = card.getAttribute('data-index');
    _constants__WEBPACK_IMPORTED_MODULE_0__.createdCardsArray.splice(index - 1, 1);
    localStorage.setItem('cards', JSON.stringify(_constants__WEBPACK_IMPORTED_MODULE_0__.createdCardsArray));
    card.remove();
}

function refreshCardIndex() {
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

/***/ }),

/***/ "./js/constants.js":
/*!*************************!*\
  !*** ./js/constants.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "cardsContainer": () => (/* binding */ cardsContainer),
/* harmony export */   "cardsInfo": () => (/* binding */ cardsInfo),
/* harmony export */   "createdCardsArray": () => (/* binding */ createdCardsArray),
/* harmony export */   "fillCards": () => (/* binding */ fillCards),
/* harmony export */   "headerNav": () => (/* binding */ headerNav),
/* harmony export */   "topBtn": () => (/* binding */ topBtn)
/* harmony export */ });
const headerNav = document.querySelector('.header-navbar');
const cardsContainer = document.querySelector('.cards-container');
const fillCards = document.getElementById('switch');
const topBtn = document.getElementById('top-btn');
let createdCardsArray = [];

const cardsInfo = 
    [{
        title: 'This is a title for a card',
        content: 'A summary will also be present. Usually two to three brief sentences about the content on the detail page.'
    },
    {
        title: 'Card title',
        content: 'Some quick example text to build on the card title and make up the bulk of the card content.'
    },
    {
        title: 'One more card title',
        content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero, reprehenderit inventore! Quod recusandae et laborum explicabo asperiores velit facere nesciunt similique, odio delectus, quam modi. Quibusdam, optio. Saepe, itaque corporis?'
    }]

/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scroll_controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scroll-controller */ "./js/scroll-controller.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./js/constants.js");
/* harmony import */ var _cards__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cards */ "./js/cards.js");




_constants__WEBPACK_IMPORTED_MODULE_1__.headerNav.addEventListener('click', (e)=> {
    const type = e.target.getAttribute('data-type');
    switch (type) {
        case 'add-card':
            let randomCardContent = _constants__WEBPACK_IMPORTED_MODULE_1__.cardsInfo.random(_constants__WEBPACK_IMPORTED_MODULE_1__.cardsInfo.length);
            (0,_cards__WEBPACK_IMPORTED_MODULE_2__.createCard)(randomCardContent.title, randomCardContent.content);
            (0,_cards__WEBPACK_IMPORTED_MODULE_2__.cardOptions)();
            break;
        case 'delete-card':
            let cards = document.querySelectorAll('.card');
            if (cards.length > 0) {
                let lastCard = cards[cards.length - 1];
                (0,_cards__WEBPACK_IMPORTED_MODULE_2__.removeCard)(lastCard);
                (0,_cards__WEBPACK_IMPORTED_MODULE_2__.refreshCardIndex)();
            }
            break;
        case 'fill-cards':
            console.log('fill-cards');
            break;
        case 'clear-cards':
            const cardsList = document.querySelectorAll('.cards-container .card');
            clearCards(cardsList);
            (0,_cards__WEBPACK_IMPORTED_MODULE_2__.refreshCardIndex)();
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
        _constants__WEBPACK_IMPORTED_MODULE_1__.createdCardsArray.splice(1, cardsList.length - 1);
        localStorage.setItem('cards', JSON.stringify(_constants__WEBPACK_IMPORTED_MODULE_1__.createdCardsArray));
        _constants__WEBPACK_IMPORTED_MODULE_1__.fillCards.checked = false;
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
            (0,_cards__WEBPACK_IMPORTED_MODULE_2__.createCard)(card.cardTitile, card.cardContent);
        })
    }
  }

  document.addEventListener("DOMContentLoaded", function(event) { 
        displayCreatedCards();
        (0,_cards__WEBPACK_IMPORTED_MODULE_2__.cardOptions)();
  });


  _constants__WEBPACK_IMPORTED_MODULE_1__.fillCards.addEventListener('change', function() {
    if (this.checked) {
        window.addEventListener('scroll', _scroll_controller__WEBPACK_IMPORTED_MODULE_0__.filedCardsInWatchArea);
        (0,_scroll_controller__WEBPACK_IMPORTED_MODULE_0__.filedCardsInWatchArea)();
    } else {
        window.removeEventListener('scroll', _scroll_controller__WEBPACK_IMPORTED_MODULE_0__.filedCardsInWatchArea);
    }
  });

  _constants__WEBPACK_IMPORTED_MODULE_1__.topBtn.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });
  window.onscroll = () => window.scrollY > 500 ? _constants__WEBPACK_IMPORTED_MODULE_1__.topBtn.style.opacity = 1 : _constants__WEBPACK_IMPORTED_MODULE_1__.topBtn.style.opacity = 0;



/***/ }),

/***/ "./js/scroll-controller.js":
/*!*********************************!*\
  !*** ./js/scroll-controller.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "filedCardsInWatchArea": () => (/* binding */ filedCardsInWatchArea)
/* harmony export */ });
/* harmony import */ var _cards__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cards */ "./js/cards.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./js/constants.js");



let runfiledCardsInWatchArea = false;

function filedCardsInWatchArea() {
    if (!runfiledCardsInWatchArea && isLastVisible()) {
        do {
            (0,_cards__WEBPACK_IMPORTED_MODULE_0__.generateCard)();
        } while (isLastVisible());
        runfiledCardsInWatchArea = false;
    }
}

function isLastVisible() {
    const lastElement = _constants__WEBPACK_IMPORTED_MODULE_1__.cardsContainer.lastElementChild;
    return isVisible(lastElement);
}

function isVisible(el) {
    if (!el) return true
    const b = el.getBoundingClientRect()
    const isVisible =  b.bottom <= (window.innerHeight + 100)
    return isVisible;
}

/***/ }),

/***/ "./style/style.css":
/*!*************************!*\
  !*** ./style/style.css ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./js/index.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../style/style.css */ "./style/style.css");
/* harmony import */ var _script_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./script.js */ "./js/script.js");



})();

/******/ })()
;
//# sourceMappingURL=main.js.map