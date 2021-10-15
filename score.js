// Win conditions currently are if score is
//outdated
let bacteriaWinAmount = 5;
let completeCounter = 0;
let playerKillCount =0;


let bacteriaScoreWinAmount = 100;
let bacteriaWin = false;
let bacteriaScore =0;


let playerScoreWinAmount = 60;
let playerWin = false;
let playerScore =0;



score = function(bacteriaArray, numOfBacteria) { 
    playerScoreWinAmount = numOfBacteria*10;
    bacteriaScoreWinAmount = numOfBacteria*10;
    if(playerWin&&!bacteriaWin){

        document.getElementById("playerScore").innerHTML = "Player Wins. Score: " + getPlayerScore();
      // End Game  
      return;
    }

    if(bacteriaWin){
        document.getElementById("bacteriaScore").innerHTML = "Bacteria Wins. Score: " + getBacteriaScore();
        document.getElementById("playerScore").innerHTML = "Player Loses. Score: " + getPlayerScore();
        // End Game
        return;
    }



    for(let i=0; i < bacteriaArray.length; i++){
        // Change to different identifier after crust changes
       if(bacteriaArray[i].radius >= maxRadius && !bacteriaArray[i].fullyGrown){
       completeCounter++; 
       bacteriaArray[i].fullyGrown = true;
       updateBacteriaScore(5);
       }
       if(completeCounter >= bacteriaWinAmount){
        // Bacteria Wins. Pause
        bacteriaWin = true;
      }
      
      if(playerKillCount >= numOfBacteria){
         // alert("player Wins" + playerKillCount);
        playerWin = true;
      }    
      
   }
  // document.getElementById("playerScore").innerHTML = "Score: 69";
}

updatePlayerScore = function(amount){

    playerScore += amount;
    document.getElementById("playerScore").innerHTML = "Player Score: " + getPlayerScore();

    if(playerScore >= playerScoreWinAmount){
        // Player Wins. Pause
     document.getElementById("playerScore").innerHTML = "Player Wins. Score: " + getPlayerScore();
     playerWin = true;
    }
}

updateBacteriaScore = function(amount){

    bacteriaScore += amount;
    document.getElementById("bacteriaScore").innerHTML = "Bacteria Score: " + getBacteriaScore();

    if(bacteriaScore >= bacteriaScoreWinAmount){
        // Bacteria Wins. Pause
     document.getElementById("bacteriaScore").innerHTML = "Bacteria Wins. Score: " + getBacteriaScore();
     bacteriaWin = true;
    }
}

getPlayerScore= function(){

    return Math.round(playerScore*100)/100;
}

getBacteriaScore= function(){

    return Math.round(bacteriaScore*100)/100;
}

bacteriaPopped = function(){
    playerKillCount++;
}