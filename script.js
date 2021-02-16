const userTitle = document.getElementById("title");
const userAuthor = document.getElementById("author");
const userPages = document.getElementById("pages");
const userRead = document.getElementsByName("read/not read");

let myLibrary = []; 

function Book (title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read; 
    this.info = function() {
        return this.title + " by " + this.author + ". " + this.pages + ' pages, ' + this.read + '.';
    }; 
};

function addBookToLibrary() {
    if (userRead[0].checked) {
        userRead.value = "already read";
    } else {
        userRead.value = "not read yet";
    };
    myLibrary.push(new Book(userTitle.value, userAuthor.value, userPages.value, userRead.value));
    saveLocal();
    userTitle.value = "";
    userAuthor.value = "";
    userPages.value = "";
    userRead[0].checked = false;
    userRead[1].checked = false;
    let para = document.createElement("p");
    para.classList.add("book-para");
    para.innerHTML = myLibrary[myLibrary.length - 1].info();                
    document.body.appendChild(para);
    para.appendChild(document.createElement("br"));
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.setAttribute('data-index', myLibrary.length - 1);
    deleteButton.innerText = "Delete Book";
    deleteButton.onclick = function removeBookFromLibrary() {
        delete myLibrary[deleteButton.dataset.index];
        saveLocal();
        document.body.removeChild(para);
    };    
    para.appendChild(deleteButton);
    let toggleReadButton = document.createElement("button");
    toggleReadButton.classList.add("toggle-button");
    toggleReadButton.setAttribute('data-index', myLibrary.length - 1);
    toggleReadButton.innerText = "Read/Not read";
    toggleReadButton.onclick = function toggleRead() {
        if (myLibrary[toggleReadButton.dataset.index].read == "already read") {
            myLibrary[toggleReadButton.dataset.index].read = "not read yet";
            saveLocal();
            para.innerText = myLibrary[toggleReadButton.dataset.index].info();
            para.appendChild(document.createElement("br"));
        } else if (myLibrary[toggleReadButton.dataset.index].read == "not read yet") {
            myLibrary[toggleReadButton.dataset.index].read = "already read";
            saveLocal();
            para.innerText = myLibrary[toggleReadButton.dataset.index].info();
            para.appendChild(document.createElement("br"));
        };
        para.appendChild(deleteButton);
        para.appendChild(toggleReadButton);
    };
    para.appendChild(toggleReadButton);
};

function saveLocal() {
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
};
  
function restoreLocal() {
    myLibrary = (JSON.parse(localStorage.getItem("myLibrary")));
    if (myLibrary === null) myLibrary = [];
    myLibrary.forEach(element => {
        if (element != null) {
        element.__proto__  = new Book;
        };
    });
};
  
restoreLocal();

myLibrary.forEach(element => {
    if (element != null) {
    let para = document.createElement("p"); 
    para.classList.add("book-para");
    para.innerHTML = element.info();                  
    document.body.appendChild(para);
    para.appendChild(document.createElement("br"));
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.setAttribute('data-index', myLibrary.indexOf(element));
    deleteButton.innerText = "Delete Book";
    deleteButton.onclick = function removeBookFromLibrary() {
        delete myLibrary[deleteButton.dataset.index];
        saveLocal();
        document.body.removeChild(para);
    };    
    para.appendChild(deleteButton);
    let toggleReadButton = document.createElement("button");
    toggleReadButton.classList.add("toggle-button");
    toggleReadButton.setAttribute('data-index', myLibrary.indexOf(element));
    toggleReadButton.innerText = "Read/Not read";
    toggleReadButton.onclick = function toggleRead() {
        if (myLibrary[toggleReadButton.dataset.index].read == "already read") {
            myLibrary[toggleReadButton.dataset.index].read = "not read yet";
            saveLocal();
            para.innerText = myLibrary[toggleReadButton.dataset.index].info();
            para.appendChild(document.createElement("br"));
        } else if (myLibrary[toggleReadButton.dataset.index].read == "not read yet") {
            myLibrary[toggleReadButton.dataset.index].read = "already read";
            saveLocal();
            para.innerText = myLibrary[toggleReadButton.dataset.index].info();
            para.appendChild(document.createElement("br"));
        };
        para.appendChild(deleteButton);
        para.appendChild(toggleReadButton);
    };
    para.appendChild(toggleReadButton);
    };
}); 