//GLOBAL VARS
var squares=document.querySelectorAll(".square");
var numSquares=squares.length;
var colors=colorGenerator(numSquares);
var pickedColor=colorPicker();
var colorDisplay= document.querySelector("#colorDisplay");
var messageDisplay=document.querySelector(".message");
var resetButton=document.querySelector("#reset");
var mode=document.querySelectorAll("button.mode");
var modal = document.getElementById('myModal');
var close = document.getElementsByClassName("close")[0];
var selectDifficulty=document.querySelectorAll("#difficulty .mode");
/*
=====================
Functions
=====================
*/
//Color Changer
function changeColors(color) 
    {
        for (let i = 0; i < squares.length; i++) 
            {
                squares[i].style.backgroundColor=color;
            }
    }
//Color Picker
function colorPicker() 
    {
        var random=Math.floor(Math.random() * colors.length);
        return colors[random];
    }
//Color Generator
function colorGenerator(num) 
    {
        var arr=[]
        for (let index = 0; index < num; index++) 
            {
                arr.push(randomColor());
            }
        function randomColor() 
            {
                var red=Math.floor(Math.random() * 256);
                var green=Math.floor(Math.random() * 256);
                var blue=Math.floor(Math.random() * 256);
                return "rgb("+red+", "+green+", "+blue+")"
            }
        return arr;
    }
//Reset 
function reset() 
    {
        colors=colorGenerator(numSquares);
        pickedColor=colorPicker();
        colorDisplay.textContent=pickedColor;
        for (let index = 0; index < squares.length; index++) 
            {
                if(colors[index])
                    {
                        squares[index].style.backgroundColor=colors[index];
                        squares[index].style.display="block";
                    } 
                else
                    {
                        squares[index].style.display="none";
                    }
            }
        document.querySelector("h1").style.backgroundColor="steelblue";
        messageDisplay.textContent="";
    }
//Difficulty set
function difficulty(element,index) 
    {
        if(element.textContent==="Easy")
            {
                numSquares=3;
                reset();
                mode[index].classList.add("selected");
            }
        else if (element.textContent==="Medium")
            {
                numSquares=6;
                reset();
                mode[index].classList.add("selected");
            }
        else
            {
                numSquares=9;
                reset();
                mode[index].classList.add("selected");
            }
    }
/*
===================
End of Functions
===================
*/
//on page load show modal and select difficulty
document.body.onload=function()
    { 
        modal.style.display = "block";
        for (let index = 0; index < squares.length; index++) 
        {
            squares[index].style.display="none";
        }
    }
for (let index = 0; index < selectDifficulty.length; index++) 
    {
        selectDifficulty[index].addEventListener("click", function()
            {
                modal.style.display = "none";
                difficulty(this,index);
            });
        
    }
// When the user clicks on <span> (x), close the modal
close.onclick = function() 
    {
        modal.style.display = "none";
    }
//Sets the picked color on header
colorDisplay.textContent=pickedColor;
//game logic
for (let i = 0; i < squares.length; i++) 
    {
        //add event listeners to squares
        squares[i].addEventListener("click",function()
        {
            var clickedColor=this.style.backgroundColor;
            if (clickedColor===pickedColor) 
            {
                messageDisplay.textContent="Correct!";
                resetButton.textContent="Play Again?"
                changeColors(clickedColor);
                document.querySelector("h1").style.backgroundColor=clickedColor;
            }
            else
            {
                this.style.backgroundColor="#232323";
                messageDisplay.textContent="Try Again!";
            }
        });
    }
//reset colors
resetButton.addEventListener("click", function()
    {
        reset();
        this.textContent="New Colors";
    })
for (let index = 0; index < mode.length; index++) 
    {
        mode[index].addEventListener("click", function () 
            {
                mode.forEach(function(color)
                {
                    color.classList.remove("selected");
                })
                difficulty(this,index);
            });
    }