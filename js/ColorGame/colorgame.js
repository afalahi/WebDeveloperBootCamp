//GLOBAL VARS
var numSquares=6;
var colors=colorGenerator(numSquares);
var squares=document.querySelectorAll(".square");
var pickedColor=colorPicker();
var colorDisplay= document.querySelector("#colorDisplay");
var messageDisplay=document.querySelector(".message");
var resetButton=document.querySelector("#reset");
var mode=document.querySelectorAll(".mode");
var modal = document.getElementById('myModal');
var span = document.getElementsByClassName("close")[0];
var body=document.body.onload=function(){ modal.style.display = "block"}
//Functions
//Color Changer
function changeColors(color) {
    for (let i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor=color;
    }
}
//Color Picker
function colorPicker() {
    var random=Math.floor(Math.random() * colors.length);
    return colors[random];
}
//Color Generator
function colorGenerator(num) {
    var arr=[]
    for (let index = 0; index < num; index++) {
        arr.push(randomColor());             
    }
    function randomColor() {
        var red=Math.floor(Math.random() * 256);
        var green=Math.floor(Math.random() * 256);
        var blue=Math.floor(Math.random() * 256);
        return "rgb("+red+", "+green+", "+blue+")"
    }
    return arr;
}
colorDisplay.textContent=pickedColor;

for (let i = 0; i < squares.length; i++) {
    //sets initial colors
    squares[i].style.backgroundColor=colors[i];
    //add event listeners to squares
    squares[i].addEventListener("click",function(){
        var clickedColor=this.style.backgroundColor;
        if (clickedColor===pickedColor) {
            messageDisplay.textContent="Correct!";
            resetButton.textContent="Play Again?"
            changeColors(clickedColor);
            document.querySelector("#header").style.backgroundColor=clickedColor;
        }
        else{
            this.style.backgroundColor="#232323";
            messageDisplay.textContent="Try Again!";
        }
    });
}
resetButton.addEventListener("click",function(){
    colors=colorGenerator(numSquares);
    pickedColor=colorPicker();
    colorDisplay.textContent=pickedColor;
    for (let i = 0; i < squares.length; i++) {
        //sets initial colors
        squares[i].style.backgroundColor=colors[i];
    }
    document.querySelector("h1").style.backgroundColor="steelblue";
    messageDisplay.textContent="";
    this.textContent="New Colors"
});

for (let index = 0; index < mode.length; index++) {
    mode[index].addEventListener("click", function () {
        this.classList.add("selected");
    });
    
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//     }
// }
// easy.addEventListener("click", function () {
//     numSquares=3;
//     hard.classList.remove("selected");
//     easy.classList.add("selected");
//     colors=colorGenerator(numSquares);
//     pickedColor=colorPicker();
//     colorDisplay.textContent=pickedColor;
//     for (let index = 0; index < squares.length; index++) {
//         if(colors[index]){
//             squares[index].style.backgroundColor=colors[index];
//         } else{
//             squares[index].style.display="none";
//         }
//     }
// });
// hard.addEventListener("click", function () {
//     numSquares=6
//     easy.classList.remove("selected");
//     hard.classList.add("selected");
//     colors=colorGenerator(numSquares);
//     pickedColor=colorPicker();
//     for (let index = 0; index < squares.length; index++) {
//             squares[index].style.backgroundColor=colors[index];
//             squares[index].style.display="block";
//     }
// });