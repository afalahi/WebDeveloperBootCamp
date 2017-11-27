var listItems=document.querySelectorAll("li");
for (let index = 0; index < listItems.length; index++) {
    listItems[index].addEventListener("mouseover",function () {
        this.classList.add("selected");
    });
    listItems[index].addEventListener("mouseout",function () {
        this.classList.remove("selected");
    });
    listItems[index].addEventListener("click",function () {
        this.classList.toggle("done");
    });
}