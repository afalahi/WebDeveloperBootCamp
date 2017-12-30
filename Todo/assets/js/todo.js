jQuery(document).ready(function($) {
//toggle input
$("#add-new").on("click", function(){
    $("input[type='text'").slideToggle("slow");
});
//add new items
$("input[type='text']").on("keypress", function(event){
    if(event.which===13){
       var newTodo=$(this).val();
       $(this).val("");
       $("ul").append("<li><span class='delete'><span class='fal fa-trash-alt'></span></span> "+newTodo+"</li>");
    }
});
//check off completed items
$("#todoList").on("click", "li", function () {
    $(this).toggleClass("complete")
});
//delete completed items
$("#todoList").on("click", ".delete", function(event){
    $(this).parent().fadeOut("slow",function(){
        $(this).remove();
    });
    event.stopPropagation();
});
});