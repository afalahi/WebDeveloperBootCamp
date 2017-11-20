var todos=[];

var input=prompt("What would you like to do");

while (input !=="quit") {
    if (input ==="list") {
        todos.forEach(function(todo,index){
            console.log(index+": "+todo)
        })
    } else if(input==="add") {
        var addTodo=prompt("Add Task");
        todos.push(addTodo);
        console.log(addTodo+" added to list")
    }
    else if(input==="delete"){
        var index=prompt("Enter index you want to delete")
        todos.splice(index,1)
    }
    input=prompt("What would you like to do")
}
console.log("Quit!")