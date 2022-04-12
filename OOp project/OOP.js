// This work was done by DOM
const bookForm = document.getElementById('book-form');
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const articalInput = document.getElementById('artical');
const bookListTbody = document.getElementById('book-list');
const showErrors = document.getElementById('showErrors');

bookForm.addEventListener('submit', bookFormFunction);

function bookFormFunction(event) {
    event.preventDefault(); // It is used to stop default functionalty 
    const ui = new UI; // User Interface
    
    //Now we are using if condition which is that if these value are not available then show the Error with message.
    if (!titleInput.value || !authorInput.value || !articalInput.value) {
        // alert(' You have to fill out this fields ');
        ui.showMessage('you have to fill out this fields!', 'error');
        return;
    }  

    // then if these values are avilable then ;
    const titleInputValue = titleInput.value;
    const articalInputValue = articalInput.value;
    const authorInputValue = authorInput.value;

   const book= new bookObject(titleInputValue, authorInputValue, articalInputValue);
    
   // We can also use this method {title:"booktitle" , author: "author" , artical:"book artical"}

   ui.addBook(book);// the function we made in prototype of UI

    // show this
    ui.showMessage('book added successfully!');

    bindAllDeleteBtn();
}

function bindAllDeleteBtn() {
    const deleteBtns = document.getElementsByClassName('delete');

    if (deleteBtns.length > 0) {
        for (let index = 0; index < deleteBtns.length; index++) {
            const singleItem = deleteBtns[index];
            singleItem.addEventListener('click', deleteBookHandler);
        }
    }

}


function deleteBookHandler(event) {
    event.preventDefault();
    const currentElement = event.target;// It target the current element.
    const ui = new UI;
    ui.removeBook(currentElement);
    ui.showMessage('book deleted successfully!');
}

// Now we use OOP(object oriented programming);

function UI() {

}

UI.prototype.addBook = function(book) {
    const tableRowElement = document.createElement('tr');
    tableRowElement.innerHTML = `
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.artical}</td>
                    <td><a href="#" class="delete">X<a></td>
                `;
    bookListTbody.appendChild(tableRowElement);

    titleInput.value = "";
    authorInput.value = "";
    articalInput.value = "";
}

UI.prototype.removeBook = function(currentElement) {
    if (confirm("Are You Sure")) {
        currentElement.parentElement.parentElement.remove();
    }
}

UI.prototype.showMessage = function(message, type = "success") {

    showErrors.innerHTML = "";

    const messageElement = document.createElement('div');
    messageElement.className = `alert ${type == 'success' ? 'success' : 'error'}`;
    messageElement.innerText = message;
    showErrors.appendChild(messageElement);

    //2000 = 2 second
    setTimeout(function() {
        messageElement.remove();
    }, 2000)
}

//creating  Book Object function and we call it up.
function bookObject(title, author, artical) {
    this.title = title;
    this.artical = artical;
    this.author = author;
}