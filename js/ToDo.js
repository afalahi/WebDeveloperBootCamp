var todos=[];

var input=prompt("What would you like to do");

while (input !=="quit") {
    if (input ==="list") {
        console.log(todos)
    } else if(input==="add") {
        var addTodo=prompt("Add Task");
        todos.push(addTodo);
    }
    input=prompt("What would you like to do")
}
console.log("Quit!")