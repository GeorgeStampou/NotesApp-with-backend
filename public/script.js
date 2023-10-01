const notetxt = document.getElementById("noteText");
const form = document.getElementById("form");
const notesLst = document.getElementById("notesList");
const notesDiv = document.querySelector(".notes");

async function showNotes(){

    try {
        const response = await axios.get("/api/v1/notes");
        const {data} = response;
        console.log(data);
        if(data.length < 1){
            console.log("NO DATA AT DATABASE");
        }
        const allNotesLi = []
        data.forEach(item => {
            const {_id: id, name} = item;
            console.log(id, name);
            let outli = createLiNote(id, name);
            allNotesLi.push(outli.innerHTML);
            //notesLst.appendChild(outli);
            
        });
        notesLst.innerHTML = allNotesLi.join("");
        //console.log(allNotesLi.join(""));
    } catch (error) {
        console.log(error);
    }
    
    
}

showNotes();

/*  handles when the add note button is pressed. creates a new div, which has the li element with the text from the input
    user gave, and the buttons delete and edit. at the end resets the form so the input is empty. 
*/
function onClick(event){
    
    event.preventDefault();

    const nameInput = notetxt.value;

    try {
        axios.post("/api/v1/notes", {name: nameInput});
        showNotes();
    } catch (error) {
        console.log(error);
    }

    form.reset();
}

form.addEventListener("submit", onClick);


/* removes the list item which has div wit the li element and the buttons*/
// function removeItem(e){
//     console.log(e.target);
//     this.parentNode.remove();
//     // try {
//     //     await axios.delete(`/api/v1/notes/${id}`);
//     //     showNotes();
//     // } catch (error) {
//     //     console.log(error);
//     // }
// }


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


function createLiNote(id, name){
    const outli = createLi("");

    const newDiv = document.createElement("div");
    newDiv.setAttribute("class","libtnContainer");
    outli.appendChild(newDiv);
            
    const newLi = createLi(name);
    newDiv.appendChild(newLi);
    const editBtn = document.createElement("button");
    editBtn.setAttribute("class", "btn");
    editBtn.setAttribute("title", "Edit");
    editBtn.setAttribute("data-id", id)
    editBtn.innerHTML = "<img src='./icons/editIcon.ico' alt='edit icon'>";
    editBtn.addEventListener("click", editItem);
    newDiv.appendChild(editBtn);
    
    const deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("class","btn");
    deleteBtn.setAttribute("title", "Delete");
    deleteBtn.setAttribute("data-id", id);
    deleteBtn.innerHTML = "<img src='./icons/removeIcon.ico' alt='remove icon' >";
    //deleteBtn.addEventListener("click", removeItem);

    newDiv.appendChild(deleteBtn);
    return outli;
}


notesDiv.addEventListener("click", async(e)=>{
    const event = e.target;
    const id = event.parentElement.getAttribute("data-id");
    if(event.parentElement.getAttribute("title") === "Delete"){
        
        try {
            await axios.delete(`/api/v1/notes/${id}`);
            showNotes();
        } catch (error) {
            console.log(error);
        }
        console.log("delete done");
    }
   
    else return
})
