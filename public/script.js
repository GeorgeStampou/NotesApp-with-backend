const notetxt = document.getElementById("noteText");
const form = document.getElementById("form");
const notesLst = document.getElementById("notesList");

/*  handles when the add note button is pressed. creates a new div, which has the li element with the text from the input
    user gave, and the buttons delete and edit. at the end resets the form so the input is empty. 
*/
function onClick(event){
    
    event.preventDefault();

    const outli = createLi("");


    const newDiv = document.createElement("div");
    newDiv.setAttribute("class","libtnContainer");
    outli.appendChild(newDiv)
      
    const newLi = createLi(notetxt.value);
    newDiv.appendChild(newLi);

    const editBtn = document.createElement("button");
    editBtn.setAttribute("class", "btn");
    editBtn.setAttribute("title", "Edit");
    editBtn.innerHTML = "<img src='./icons/editIcon.ico' alt='edit icon'>";
    editBtn.addEventListener("click", editItem);
    newDiv.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("class","btn");
    deleteBtn.setAttribute("title", "Delete");
    deleteBtn.innerHTML = "<img src='./icons/removeIcon.ico' alt='remove icon' >";

    newDiv.appendChild(deleteBtn).addEventListener("click", removeItem);
    notesLst.appendChild(outli);
    
    form.reset();
}

form.addEventListener("submit", onClick);


/* removes the list item which has div wit the li element and the buttons*/
function removeItem(){
    this.parentNode.remove();
}


/*
    saves the initial value to item. then creates a new input which replace the li and add two event listeners
    for saving the new value. add at the parent parent node the new input element and removes the li.
*/

function editItem(event){

    let item = event.target.parentNode.parentNode.firstChild.innerHTML;
    console.log(item);
    let itemInput = document.createElement("input");
    itemInput.type = "text";
    itemInput.value = item;
    itemInput.addEventListener("keypress", saveItem);
    itemInput.addEventListener("click", saveItem);
    console.log(event.target.parentNode.parentNode.firstChild);
    event.target.parentNode.parentNode.firstChild.replaceWith(itemInput);
    itemInput.select();

}

/*
    save the new value which typed at itemInput and by pressing "enter" or click. then calls the function which
    create li elements with the new value which the user has typed and replace the input type element (children[0])
    with the new li element.
*/
function saveItem(event){
    let inputValue = event.target.value;
    if(inputValue.length > 0 && (event.keyCode === 13 || event.type === "click")){
        let newLi = createLi(inputValue);
        event.target.parentNode.children[0].replaceWith(newLi);
    }
}

/* creates a new li element with the key which triggers the action (calls the function) and value for the text of li.*/
function createLi(value){
    let li = document.createElement("li");
    li.innerText = value;
    return li;

}
