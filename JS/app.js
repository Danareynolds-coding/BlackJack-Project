// variables

let deck;
let hitYes= true;

let dealerSum = 0;
let playerSum = 0;
let dealerAces = 0;
let playerAces = 0;
let facedown;

window.onload = function(){
    makeDeck();
    shuffleDeck();
    getStarted();
}

function makeDeck(){
    let values = ["A","Q","K","J","2","3","4","5","6","7","8","9","10"];
    let suites = ["C", "D", "S","H"]; 
    deck = [];  
    for (let i=0; i<suites.length; i++){
        for (let j=0; j<values.length; j++){
        deck.push(values[j] + "-" + suites[i]);
        } 
    } 
}

function shuffleDeck(){ 
    for (let i=0; i<deck.length; i++){
        const j = Math.floor(Math.random()* deck.length);
        let temp = deck[i];
        deck[i] = deck[j]
        deck[j] = temp;
    }   
}

function getStarted(){
    facedown = deck.pop();
    dealerSum += cardValue(facedown);
    dealerAces += isAce(facedown);
    while (dealerSum < 17 ){ 
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";          
        dealerSum += cardValue(card);
        dealerAces += isAce(card);
        document.getElementById("dealerCards").append(cardImg);
        }
    for (let i=0; i<2; i++){
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        playerSum += cardValue(card);
        playerAces += isAce(card);
        document.getElementById("playerCards").append(cardImg);
    }
    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stay").addEventListener("click", stay);
}

function hit(){
    if (!hitYes){
        return;
    } 
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        playerSum += cardValue(card);
        playerAces += isAce(card);        
        document.getElementById("playerCards").append(cardImg);
    if(reduceAce(playerSum, playerAces) > 21){
            hitYes = false;
    }
}


function cardValue(card){
    let data = card.split("-");
    let value = data[0];
    if (isNaN(value)){
        if(value == "A"){
        return 11;
        }
        return 10;
    }
    return parseInt(value);
}
function isAce(card){
    if(card[0] == "A"){
        return 1;
    }  
     return 0;
}

function reduceAce(playerSum, playerAces){
    while(playerSum > 21 && playerAces > 0){
        playerSum -= 10;
        playerAces -= 1;
    }
    return playerSum;
}

function stay(){
    dealerSum = reduceAce(dealerSum, dealerAces);
    playerSum = reduceAce(playerSum, playerAces);
    hitYes = false;
    document.getElementById("facedown").src = "./cards/" + facedown + ".png";
    let message = "";
    if (playerSum > 21){
        message = "You Lose!";
    }
    else if (dealerSum > 21){
        message = "You Win!";
    }else if (playerSum == dealerSum){
        message = "tie!";
    }
    else if (playerSum > dealerSum){
        message = "You Win!";
    }else if (playerSum < dealerSum){
        message = "You lose!";
    }
    document.getElementById("dealerSum").innerText = dealerSum; 
    document.getElementById("playerSum").innerText = playerSum;
    document.getElementById("win").innerText = message;   
    }

    




   

