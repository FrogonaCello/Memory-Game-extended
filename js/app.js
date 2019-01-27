let cards = ['fa-diamond', 'fa-diamond',
            'fa-paper-plane-o', 'fa-paper-plane-o',
            'fa-anchor', 'fa-anchor',
            'fa-bolt', 'fa-bolt',
            'fa-cube', 'fa-cube',
            'fa-leaf', 'fa-leaf',
            'fa-bicycle', 'fa-bicycle',
            'fa-bomb', 'fa-bomb',
            ];

function generateCard(card) {
    return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
}

function winTheGame() {
    let winnerLi = document.createElement("LI");
    let winnerText = document.createTextNode(`Congratulation, you won! Your score is ${moves} Moves!`);
    winnerLi.appendChild(winnerText);
    winnerLi.classList.add('winner');
    document.querySelector('.deck').appendChild(winnerLi);
    console.log("you won!")
};


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


function initGame() {
    const deck = document.querySelector('.deck');
    let cardHTML = shuffle(cards).map(function(card) {
        return generateCard(card);
    });
    moves = 0;
    moveCounter.innerText = moves;
    deck.innerHTML = cardHTML.join('');
}


let moves = 0;
let moveCounter = document.querySelector('.moves');

initGame();

const cardsAll = document.querySelectorAll('.card');
let openCards = [];
let matchedCards = [];
let changeDeck = document.querySelector('.deck');
let starsWinner = document.querySelector('.stars');
let checkWinner = document.querySelector('.check');
const deck = document.querySelector('.deck');

function game() {
    cardsAll.forEach(function(card) {
        card.addEventListener('click',function(event) {
            if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')){
                openCards.push(card);
                card.classList.add('open', 'show');
            
                               
                if (openCards.length == 2) {
                
                    // do the cards match?
                    if (openCards[0].dataset.card == openCards[1].dataset.card) {
                        openCards[0].classList.add('match');
                        openCards[0].classList.add('open');
                        openCards[0].classList.add('show');

                        openCards[1].classList.add('match');
                        openCards[1].classList.add('open');
                        openCards[1].classList.add('show');

                        matchedCards.push(openCards[0], openCards[1]);
                        openCards = [];

                        // Game is won
                        if (matchedCards.length == 16) {
                                matchedCards.forEach(function(card) {
                                    card.classList.add('end');
                                    changeDeck.classList.add('won');
                                });
                            starsWinner.classList.add('winner-stars');
                            checkWinner.classList.add('winner-check');
                            return winTheGame();
                           }
                    }

                        // remove cards, when they don´t match
                    else {    
                        setTimeout(function(){
                            openCards.forEach(function(card) {
                                card.classList.remove('open', 'show');
                            });

                            openCards = [];
                        }, 1000);
                    }

                    moves += 1;
                    moveCounter.innerText = moves;
                }
            }
        });
    });
}

game();


 // restart the Game

const reload = document.querySelector('.restart');

reload.addEventListener('click', function() {
    location.reload();
});
