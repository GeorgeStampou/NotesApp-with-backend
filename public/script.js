const notetxt = document.getElementById("noteText");
const form = document.getElementById("form");
const notesLst = document.getElementById("notesList");
const notesDiv = document.querySelector(".notes");
const noNotesDiv = document.querySelector(".no-notes-div");

// load notes from database
async function showNotes() {

    try{
        const response = await axios.get("/api/v1/notes");
        const {data} = response;
        if(data.length < 1){
            if(noNotesDiv.classList.contains("inactive")) {
                noNotesDiv.classList.remove("inactive");
            }
            noNotesDiv.innerHTML = '<h3>No notes in list</h3>'
        }
        const allNotesLi = []
        data.forEach(item => {
            const {_id: id, name} = item;
            let outli = createLiNote(id, name);
            allNotesLi.push(outli.innerHTML);
            
        });
        notesLst.innerHTML = allNotesLi.join("");
    } catch (error) {
        console.log(error);
    }
    
    
}

showNotes();

// post the new note to the database and then shows all the notes. triggers on click of button "Add note".
async function onClick(event) {
    
    event.preventDefault();

    const nameInput = notetxt.value;

    try {
        await axios.post("/api/v1/notes", {name: nameInput});
        noNotesDiv.classList.add("inactive");
        showNotes();
    } catch (error) {
        console.log(error);
        alert(error);
    }

    form.reset();
}

form.addEventListener("submit", onClick);


// creates new list element for the note
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

// delete from database when delete button is clicked
notesDiv.addEventListener("click", async (e) => {
    const event = e.target;
    const id = event.parentElement.getAttribute("data-id");
    if(id === "") {
        console.log("ERROR WITH ID");
    }
    if(event.parentElement.getAttribute("title") === "Delete") {
        try {
            await axios.delete(`/api/v1/notes/${id}`);
            showNotes();
        } catch (error) {
            console.log(error);
        }
    }
})

// handles the click of edit button. calls saveItem for saving.
notesDiv.addEventListener("click", (e) => {
    const event = e.target;
    if(event.parentElement.getAttribute("title") === "Edit") {
        const item = event.parentElement.parentElement.firstChild.innerHTML;
        const itemInput = document.createElement("input");
        itemInput.type = "text";
        itemInput.value = item;
        itemInput.addEventListener("keypress", saveItem);
    
        event.parentElement.parentElement.firstChild.replaceWith(itemInput);
        itemInput.select();
    }
})


/*
    saves the new value which typed at itemInput and by pressing "enter". then with the id of the notes replaces with the new value
    and calls the showNotes.
*/
async function saveItem(event) {
    
    const inputValue = event.target.value;
    const editbutton = event.target.parentNode.children[1];
    const id = editbutton.getAttribute("data-id");
    if(id === "") {
        console.log("ERROR WITH ID");
    }
    if(inputValue.length > 0 && event.keyCode === 13) {
        try {
            await axios.patch(`/api/v1/notes/${id}`, { name: inputValue });
            showNotes();
        } catch (error) {
            console.log(error);
        }
    }
}
