
const title= document.getElementById("title");
const author = document.getElementById("author");
const genre = document.getElementById("genre");
const status = document.getElementById("status");
const pages = document.getElementById("pages");
const addBtn = document.getElementById("add-btn");
const tableBody = document.querySelector("tbody");
const totalRead = document.querySelector(".total-read");
const totalToRead = document.querySelector(".total-to-read");
const totalBooks = document.querySelector(".total-books");




let myLibrary = [
//   
];

// Book constructor
class Book {
    constructor(title, author, genre, pages, status) {
        this.title = title.value,
            this.author = author.value,
            this.genre = genre.value,
            this.pages = pages.value,
            this.status = status.value;
            
    }
}

const addBookToLibrary = (e) => {
    e.preventDefault(); // doesn't submit the form 
    let book = new Book(title, author, genre, pages, status) 
    myLibrary.push(book);
    document.getElementById("form").reset(); // reset the form once new book is added
    createTableBody(myLibrary); // create new row with new addition 
    countBooks(myLibrary);
    }
   
addBtn.addEventListener("click", addBookToLibrary);


// display books in html 
function createTableBody (myLibrary, book) {
    tableBody.innerHTML = " ";
    for (book of myLibrary) {
        const row = document.createElement("tr"); // for each object, create new row
        // row.setAttribute("data-id", [i]); 
        tableBody.appendChild(row); // add the row to the table body

        // Book TITLE
        const bookTitle = document.createElement("td");
        bookTitle.textContent = book.title;
        row.appendChild(bookTitle);

        // Book AUTHOR
        const bookAuthor = document.createElement("td");
        bookAuthor.textContent = book.author;
        row.appendChild(bookAuthor);

        // Book GENRE
        const bookGenre = document.createElement("td");
        bookGenre.textContent = book.genre;
        row.appendChild(bookGenre);

        // Book PAGES
        const bookPages = document.createElement("td");
        bookPages.textContent = book.pages;
        row.appendChild(bookPages);

        // Book SHELF
        const bookShelf = document.createElement("td");
        bookShelf.classList.add("book-shelf");
        bookShelf.textContent = book.status;
        row.appendChild(bookShelf)

        // Edit button 
        const bookEdit = document.createElement("td");
        const editBtn = document.createElement("i");
        editBtn.classList.add("far", "fa-edit");
        editBtn.addEventListener("click", () =>{
            if (book.status === "Read") {
                book.status = "To Read";
                bookShelf.textContent = book.status;
            } else {
                book.status = "Read";
                bookShelf.textContent = book.status;
            }
            countBooks(myLibrary);
        });
        bookEdit.appendChild(editBtn);
        row.appendChild(bookEdit);

        // DELETE BUTTON
        const deleteCell = document.createElement("td");
        const deleteBtn = document.createElement("i") // create a button, name it, add text content 
        deleteBtn.classList.add("delete-btn", "far", "fa-trash-alt");
        deleteBtn.addEventListener("click", deleteBooks);
        deleteCell.appendChild(deleteBtn)
        row.appendChild(deleteCell);
    }
}

// // delete book functionality 
function deleteBooks () {
    let index = this.parentElement.parentElement.dataset.id; 
    myLibrary.splice(index, 1);
    myLibrary = myLibrary;
    countBooks(myLibrary); 
    createTableBody(myLibrary);   
       
    
};

// count books per category every time a book is added AND the shelf is changed

function countBooks (myLibrary, book) {
    let readCount = 0;
    let unreadCount = 0;
    totalRead.textContent = 0;
    totalToRead.textContent = 0;
    for (book of myLibrary) {
        if (book.status === "Read") {
            readCount += 1;
            totalRead.textContent = readCount;
        } else if (book.status === "To Read") {
            unreadCount += 1;
            totalToRead.textContent = unreadCount;
        }
    }
    totalBooks.textContent = myLibrary.length;
};


