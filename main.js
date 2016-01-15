'use strict'

$(document).ready(init);

var sum = 0;
var stockArray = ["A-Hearts", "A-Diamond", "A-Hearts", "A-Spade", "2-Hearts", "2-Diamond", "2-Hearts", "2-Spade", "3-Hearts", "3-Diamond", "3-Hearts", "3-Spade", "4-Hearts", "4-Diamond", "4-Hearts", "4-Spade", "5-Hearts", "5-Diamond", "5-Hearts", "5-Spade", "6-Hearts", "6-Diamond", "6-Hearts", "6-Spade", "7-Hearts", "7-Diamond", "7-Hearts", "7-Spade", "8-Hearts", "8-Diamond", "8-Hearts", "8-Spade", "9-Hearts", "9-Diamond", "9-Hearts", "9-Spade", "10-Hearts", "10-Diamond", "10-Hearts", "10-Spade", "J-Hearts", "J-Diamond", "J-Hearts", "J-Spade", "Q-Hearts", "Q-Diamond", "Q-Hearts", "Q-Spade", "K-Hearts", "K-Diamond", "K-Hearts", "K-Spade"]
var modifiedArray = _.shuffle(stockArray);
var playerDeck = [];
var compDeck = [];
var pTotal = 0;
var cTotal = 0;
var ace = false;
var cace = true;


function init(){
  $('#deal').on('click' , dealMe);
  $('#hitMe').on('click' , hitMe);

  $('#hitMe').hide();
  $('#stand').on('click' , standMe);

 }

function dealMe(event){
  $(event.target).hide();
  $('#hitMe').show();

  for(var i = 0; i < 2; i++){
      var cardDraw = Math.floor(Math.random() * modifiedArray.length);
      playerDeck.push(modifiedArray.splice(cardDraw, 1));
    }
    console.log('PlayerDeal: ', playerDeck)
    $("#pDisplay").text(playerDeck);

    playerCalc();
    compDeal();
    return playerDeck;
}

function compDeal(event){
  for(var i = 0; i < 2; i++){
      var cardDraw = Math.floor(Math.random() * modifiedArray.length);
      compDeck.push(modifiedArray.splice(cardDraw, 1));
    }
    console.log('ComputerDeal: ', compDeck)
    $("#cDisplay").text(compDeck[0]);
    compcalc();
    return compDeck;

}

function hitMe(){
  
  playerCalc();

  if (pTotal > 21){
    alert('Player LOST !!!')
    $("#cDisplay").text(compDeck);
    $( '.cscore' ).text('Dealers Score: '+ cTotal); 
    $( '.pscore' ).text('Players Score: '+ pTotal);
  }
  
  if(pTotal < 21){
    for(var i = 0; i < 1; i++){
        var cardDraw = Math.floor(Math.random() * modifiedArray.length);
        playerDeck.push(modifiedArray.splice(cardDraw, 1));
      }
      
      console.log('Player hit', pTotal);
  }
  playerCalc();
  if (pTotal > 21){
    alert('Player LOST !!!')
    $("#cDisplay").text(compDeck);
    $( '.cscore' ).text('Dealers Score: '+ cTotal); 
    $( '.pscore' ).text('Players Score: '+ pTotal);
  }
   console.log('playerCalc AFTER HIT:', pTotal)
   console.log('playerDec:', playerDeck)
   if (ace){
     if (pTotal> 21){
      pTotal = pTotal - 10;
     }
   }
   $("#pDisplay").text(playerDeck);

}


function playerCalc(){
  console.log('ptotal Before', pTotal)
  //var pSplit = playerDeck.split
  var letterValue;
  pTotal =0; 
  for(var i = 0; i < playerDeck.length; i++){
    var pSplit = playerDeck[i].join('');
    var cardValue = pSplit.slice(0,1);
    //$( '.player' ).append( $( "h2" )).text(pSplit).addClass( "player" ); 

    letterValue = 0;

    if (cardValue === 'Q' || cardValue === 'J' || cardValue === 'K' || cardValue ==='1'){
      //console.log('QQQQ')
      letterValue = 10;
    }
    if(cardValue === 'A'){
      //Console.log('AAAAA')
      //alert('You Got an Ace!! If you bust ! ace= 1')
      letterValue = 11;
      ace = true ;
    }
    if(/\d/.test(cardValue)){
      letterValue = Number(cardValue);
      if(letterValue === 1){
        letterValue = 10;
      }
    }
   pTotal = pTotal + letterValue;
   console.log('playerCalc:', pTotal)
  $( '.pscore' ).text('PlayersScore: '+ pTotal);

  }
  return pTotal;
}

function standMe(){

  var computerHit = compcalc();
  //console.log('COMPHIT!!!:', computerHit)
  if (computerHit < 17){
    for(var i = 0; i < 1; i++){
      var cardDraw = Math.floor(Math.random() * modifiedArray.length);
      compDeck.push(modifiedArray.splice(cardDraw, 1));
    }
  } 
  var newCompTotal = compcalc()
  
  console.log("OMG!! COMP ADD:", newCompTotal);
  if (cace){
     if (pTotal> 21){
      pTotal = pTotal - 11;
     }
  }
  if(newCompTotal>21){
    alert("Computer Bust!!")
    $("#cDisplay").text(compDeck);
    $( '.cscore' ).text('Dealers Score: '+ newCompTotal); 
    $( '.pscore' ).text('PlayersScore: '+ pTotal);

  }
  else if(newCompTotal > pTotal){
    alert('Computer WON !!')
    $("#cDisplay").text(compDeck);
    $( '.cscore' ).text('Dealers Score: '+ newCompTotal); 
    $( '.pscore' ).text('PlayersScore: '+ pTotal);

    $('#hitMe').hide();
    $('#stand').hide();

  }
  else
    alert("Player Won")
    $("#cDisplay").text(compDeck);
    $( '.cscore' ).text('Dealers Score: '+ newCompTotal); 
    $( '.pscore' ).text('Players Score: '+ pTotal);


}

function compcalc(){
  //var cSplit = compDeck.split
  
  var letterValue = 0;
  cTotal = 0;
  for(var i = 0; i < compDeck.length; i++){
    var cSplit = compDeck[i].join('');
    var cardValue = cSplit.slice(0,1);
    letterValue = 0;
    //$( '.dealer' ).append( $( "h3" )).text(cSplit).addClass( ".dealer" ); 
    console.log('COMPDECK', compDeck)
    
    if (cardValue === 'Q' || cardValue === 'J' || cardValue === 'K' || cardValue ==='1'){
      //console.log('QQQQ')
      letterValue = 10;
    }
    if(cardValue === 'A'){
      //Console.log('AAAAA')
      //alert('You Got an Ace!! If you bust ! ace= 1')
      letterValue = 11;
      cace = true ;
    }
    if(/\d/.test(cardValue)){
      letterValue = Number(cardValue);
      if(letterValue === 1){
        letterValue = 10;
      }
    }
    cTotal = cTotal + letterValue;
    //debugger;
    console.log('cTOTAL : ', cTotal);

  }
  
  return cTotal;
}




