var secretNumber = 7;

var number=prompt("Guess the number");
number = Number(number)
if (number<secretNumber) {
    alert("The number is too low");
    console.log(number)
} else if(number>secretNumber) {
    alert("The number is too high");
}
else if (number===secretNumber){
    alert("You guessed right!");
}
else{
    alert("Wrong number!");
}