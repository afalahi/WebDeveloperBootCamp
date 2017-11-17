var age = prompt("How old are you");
if (age < 18) {
    alert("Sorry, we can't let you in")
} else if(age < 21) {
    alert("You can enter but cannot drink")
}
else{
    if (age == 21) {
        var bday="HAPPY BIRTHDAY!"
        if (age%2!==0) {
            var isOdd= "your age is odd!"
        }
        else{
            isOdd="your age is not odd"
        }
        alert("You can enter and drink and "+ bday + " and "+isOdd)
    }
    else{
        if (age%2!==0) {
            var isOdd= "your age is odd!"
        }
        else{
            isOdd="your age is not odd"
        }
        alert("You can enter and drink and " +isOdd)
    }
}