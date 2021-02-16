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
        return this.title + " di " + this.author + ". " + this.pages + ' pagine, ' + this.read + '.';
    }; 
};

function saveLocal() {
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
  }
  
  function restoreLocal() {
    myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
    if (myLibrary === null) myLibrary = [];
};
  
restoreLocal();

// const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', '295', 'not read yet');
// const iSentieri = new Book('I sentieri', 'Italo Calvino', '58', 'already read');
// const leNotti = new Book('Le Notti Bianche', 'Fedor Dostoevskij', '95', 'not read yet');
// myLibrary.push(theHobbit);
// myLibrary.push(iSentieri);
// myLibrary.push(leNotti);

myLibrary.forEach(element => { 
    let para = document.createElement("p");   
    para.innerHTML = element.info();                  
    document.body.appendChild(para);
    let deleteButton = document.createElement("button");
    deleteButton.setAttribute('data-index', myLibrary.indexOf(element));
    deleteButton.innerText = "Delete Book";
    deleteButton.onclick = function removeBookFromLibrary() {
        delete myLibrary[deleteButton.dataset.index];
        saveLocal();
        document.body.removeChild(para);
    };    
    para.appendChild(deleteButton);
    let toggleReadButton = document.createElement("button");
    toggleReadButton.setAttribute('data-index', myLibrary.indexOf(element));
    toggleReadButton.innerText = "Letto/Non letto"
    toggleReadButton.onclick = function toggleRead() {
        if (myLibrary[toggleReadButton.dataset.index].read == "già letto") {
            myLibrary[toggleReadButton.dataset.index].read = "non ancora letto";
            saveLocal();
            para.innerText = myLibrary[toggleReadButton.dataset.index].info();
        } else if (myLibrary[toggleReadButton.dataset.index].read == "non ancora letto") {
            myLibrary[toggleReadButton.dataset.index].read = "già letto";
            saveLocal();
            para.innerText = myLibrary[toggleReadButton.dataset.index].info();
        };
        para.appendChild(toggleReadButton);
        para.appendChild(deleteButton);
    };
    para.appendChild(toggleReadButton);
}); 

function addBookToLibrary() {
    if (userRead[0].checked) {
        userRead.value = "già letto"
    } else {
        userRead.value = "non ancora letto"
    }
    myLibrary.push(new Book(userTitle.value, userAuthor.value, userPages.value, userRead.value));
    saveLocal();
    let para = document.createElement("p");   
    para.innerHTML = myLibrary[myLibrary.length - 1].info();                  
    document.body.appendChild(para);
    let deleteButton = document.createElement("button");
    deleteButton.setAttribute('data-index', myLibrary.length - 1);
    deleteButton.innerText = "Delete Book";
    deleteButton.onclick = function removeBookFromLibrary() {
        delete myLibrary[deleteButton.dataset.index];
        saveLocal();
        document.body.removeChild(para);
    };    
    para.appendChild(deleteButton);
    let toggleReadButton = document.createElement("button");
    toggleReadButton.setAttribute('data-index', myLibrary.length - 1);
    toggleReadButton.innerText = "Letto/Non letto"
    toggleReadButton.onclick = function toggleRead() {
        if (myLibrary[toggleReadButton.dataset.index].read == "già letto") {
            myLibrary[toggleReadButton.dataset.index].read = "non ancora letto";
            saveLocal();
            para.innerText = myLibrary[toggleReadButton.dataset.index].info();
        } else if (myLibrary[toggleReadButton.dataset.index].read == "non ancora letto") {
            myLibrary[toggleReadButton.dataset.index].read = "già letto";
            saveLocal();
            para.innerText = myLibrary[toggleReadButton.dataset.index].info();
        };
        para.appendChild(toggleReadButton);
        para.appendChild(deleteButton);
    };
    para.appendChild(toggleReadButton);
};