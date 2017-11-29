//GLOBAL VARS
var colors=colorGenerator(6);
var squares=document.querySelectorAll(".square");
var pickedColor=colorPicker();
var colorDisplay= document.querySelector("#colorDisplay");
var messageDisplay=document.querySelector(".message");
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
            changeColors(clickedColor);
            document.querySelector("#header").style.backgroundColor=clickedColor;
        }
        else{
            this.style.backgroundColor="#232323";
            messageDisplay.textContent="Try Again!";
        }
    });
}