//Player One
var playerOne=document.querySelector("#p1");
var p1Points=0;
var p1Score=document.querySelector("#p1-score")
//Player Two
var playerTwo=document.querySelector("#p2");
var p2Points=0;
var p2Score=document.querySelector("#p2-score")
var gameOver=false;
function addScore(player,points,score) {
    var scoreLimit=document.querySelector("#score-limit").textContent
    player.addEventListener("click",function(){
        if(!gameOver){
            points++;            
            if(Number(scoreLimit)===points){
                gameOver=true
                score.classList.add("green")
            }
            score.textContent=points
        }
    });
}
addScore(playerOne,p1Points,p1Score);
addScore(playerTwo,p2Points,p2Score);