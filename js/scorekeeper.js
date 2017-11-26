//Player One
var playerOne=document.querySelector("#p1");
var p1Points=0;
var p1Score=document.querySelector("#p1-score")
//Player Two
var playerTwo=document.querySelector("#p2");
var p2Points=0;
var p2Score=document.querySelector("#p2-score")
function addScore(player,points,score) {
    player.addEventListener("click",function(){
        var scoreLimit=document.querySelector("#score-limit").textContent
        if(points<Number(scoreLimit)){
            points++;
            score.textContent=points
            if(Number(scoreLimit)===points){
                score.classList.add("green")
        }
    }
    });
}
addScore(playerOne,p1Points,p1Score);
addScore(playerTwo,p2Points,p2Score);