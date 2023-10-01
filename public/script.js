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

function createLiNote(id, name){
    const outli = document.createElement("li");
    outli.innerText = "";

    const newDiv = document.createElement("div");
    newDiv.setAttribute("class","libtnContainer");
    outli.appendChild(newDiv);
            
    const newLi = document.createElement("li");
    newLi.innerText = name;
    newDiv.appendChild(newLi);
    const editBtn = document.createElement("button");
    editBtn.setAttribute("class", "btn");
    editBtn.setAttribute("title", "Edit");
    editBtn.setAttribute("data-id", id)
    editBtn.innerHTML = "<img src='./icons/editIcon.ico' alt='edit icon'>";
    newDiv.appendChild(editBtn);
    
    const deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("class","btn");
    deleteBtn.setAttribute("title", "Delete");
    deleteBtn.setAttribute("data-id", id);
    deleteBtn.innerHTML = "<img src='./icons/removeIcon.ico' alt='remove icon' >";

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

notesDiv.addEventListener("click", (e)=>{
    const event = e.target;
    const id = event.parentElement.getAttribute("id");
    if(event.parentElement.getAttribute("title")=== "Edit"){
        let item = event.parentElement.parentElement.firstChild.innerHTML;
        let itemInput = document.createElement("input");
        itemInput.type = "text";
        itemInput.value = item;
        itemInput.addEventListener("keypress", saveItem);
    
        event.parentElement.parentElement.firstChild.replaceWith(itemInput);
        itemInput.select();
    }
    else return
})



/*
    save the new value which typed at itemInput and by pressing "enter" or click. then calls the function which
    create li elements with the new value which the user has typed and replace the input type element (children[0])
    with the new li element.
*/
async function saveItem(event){
    let inputValue = event.target.value;
    const editbutton = event.target.parentNode.children[1];
    const id = editbutton.getAttribute("data-id");
    console.log(id);
    if(id === ""){
        console.log("ERROR NO ID");
    }
    if(inputValue.length > 0 && event.keyCode === 13){
        try {
            await axios.patch(`/api/v1/notes/${id}`, {name: inputValue});
            showNotes();
        } catch (error) {
            console.log(error);
        }
    }
}