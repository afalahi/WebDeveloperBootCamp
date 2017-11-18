var number=prompt("Guess the number");
if (number<=2) {
    alert("The number is too low")
    console.log(number)
} else if(number>=9) {
    alert("The number is too high")
}
else if (number==7){
    alert("You guessed right!")
}
else{
    alert("Wrong number!")
}