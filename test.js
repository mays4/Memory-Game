/*
 * Create a list that holds all of your cards
 */

// const deck = document.querySelector('.deck');

let matchedCards =0;
let moves = 0;
let  openCards =[];
let modal = document.getElementsByClassName('modal')[0];
let closeIcon = document.querySelector('.close');
let restart = document.querySelector('.restart');
let buttonAgain = document.querySelector('.playAgain');
const cardDeck = document.querySelector('.deck');

createDeck();
addListener();

// timerStart()

// const  stars = document.querySelectorAll('.fa fa-star');

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function createDeck () {
    const cards= document.querySelectorAll('.card');
    console.log(cards)
    let cardList = [...cards];
    // console.log(cardList)
    
    const  shuffledCards = shuffle(cardList);
   for ( card of cards){
   const oldList = card;
   oldList.remove();
}

const fragmentDeck = document.createDocumentFragment();

for ( let i of  shuffledCards) {

const newCard = document.createElement('li');
newCard.innerHTML = i.innerHTML;
newCard.className = i.className;
fragmentDeck.appendChild(newCard);
}
const newDeckList = document.querySelector('.deck');
newDeckList.appendChild(fragmentDeck);
  console.log(newDeckList)   
}
    
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
function addListener() {
    cardDeck.addEventListener('click',flip);
}
function RemoveListener(){
    cardDeck.removeEventListener('click',flip);
}
    
function flip(ev){
        if (ev.target.className === 'card'){
          
                ev.target.classList.add('open','show');
                openCards.push(ev.target);
                // console.log(openCards)
                timerStart();
                if (openCards.length === 2 ){
                      checkCards();
                    }
        }
    }
function checkCards(){
        RemoveListener();
        moveCounter();
        
        if(openCards[0].innerHTML === openCards[1].innerHTML){
            setTimeout(match, 100);
        }  
        else {
            RemoveListener()
            setTimeout(notMatch, 500);
            
        }
}
function match(){
    openCards[0].classList.add('match');
	openCards[1].classList.add('match');
	openCards[0].classList.remove('open', 'show');
	openCards[1].classList.remove('open', 'show');
    matchedCards +=2;
    if (matchedCards === 16){
        setTimeout(complete, 400);
    }
    openCards = [];
    addListener();
}
function notMatch(){
    openCards[0].classList.add('unmatched');
    openCards[1].classList.add('unmatched');
    setTimeout(function(){
        openCards[0].classList.remove('open', 'show','unmatched');
        openCards[1].classList.remove('open', 'show','unmatched');
   
        openCards = [];
        addListener();
    },500);
    // openCards = [];
    //  addListener();
}       
function complete(){
    stopTimer(); 
    console.log ("game complete");
    youWon();
       
}
function moveCounter(){
    let counter = document.querySelector('.moves');
    moves ++;
    counter.innerHTML = moves;
        //remove stars
        const  stars = document.querySelectorAll('.fa-star');
        let starList =[...stars]
        // console.log(starList )
        if (moves > 10 && moves < 16){
            for (i = 0; i < 3; i++){
                if (i > 1){ 
                    starList[i].style.visibility ="hidden";
                    //  console.log(starList[i])     
                }
            }
        }
    else if (moves > 16){
        for (i=0; i < 3 ; i++){
            if (i > 0){      
                starList[i].style.visibility = "hidden";   
                //  console.log(starList[i])
                    }
            }
        }
    }

    //timer
    let time = 0;
    let startTimer;
    const timer = document.querySelector('.timer');
   
    
    function timerStart(){ 
        time++; 
        startTimer = setInterval(function(){
            
        let mins = Math.floor(time/60);
        let sec = time % 60 ;
     
        // console.log(sec);
        // console.log(mins);
        if (sec < 10){
            timer.innerHTML =`${mins} :0 ${sec}`;
        }
        else{
            timer.innerHTML =`${mins} : ${sec}`;
        }
    },1000);
    }
     
    
    function stopTimer(){
        clearInterval(startTimer);
             sec = 0;
            mins = 0;  
        }
             
        
function youWon(){
           openModal();
           stopTimer(); 
        }
         
function openModal(){
    modal.style.display = 'block';
    var starRating = document.querySelector(".stars").innerHTML;
    let movesTotal = document.querySelector('.totalMoves');
    let timeTotal = document.querySelector('.totalTime');
    // let starTotal= document.getElementsByClassName('totalRating');
    document.getElementById("rating").innerHTML = starRating;
    movesTotal.innerHTML = moves;
    timeTotal.innerHTML = timer.innerHTML;
 }
 closeIcon.addEventListener(("click"),close);
 buttonAgain.addEventListener(("click"),reset);

function close(){
    stopTimer()
    modal.style.display =" none";
    location.reload(true);
       
    };
function reset (){
    modal.style.display =" none";
    stopTimer();
        // createDeck ();
    location.reload(true);
    };

restartGame()
   
function restartGame() {
    restart.addEventListener(("click"),function(){
    // console.log('restart button');
    location.reload(true);
    });
}

