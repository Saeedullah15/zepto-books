// loading books 
function loadBookData() {
    fetch("https://gutendex.com/books")
        .then(res => res.json())
        .then(data => {
            displayBookData(data.results);
            search(data.results);
        })
}
loadBookData();

// displaying books
function displayBookData(bookData) {
    console.log(bookData);
    const booksContainer = document.getElementById("booksContainer");

    // clearing the container holding previous data
    booksContainer.innerHTML = "";

    bookData.forEach(book => {
        const bookDiv = document.createElement("div");
        bookDiv.classList.add("book");

        // Creating a list of genres
        const genres = book.subjects;
        let genreList = '<ul>';
        genres.forEach(genre => {
            genreList += `<li>${genre}</li>`;
        });
        genreList += '</ul>';

        bookDiv.innerHTML = `
            <img src=${book.formats['image/jpeg']} alt="cover image">
            <h2>Title: ${book.title}</h2>
            <p>Authors Name: ${book.authors.map(author => author.name)}</p>
            <hr>
            <p>Genre: ${genreList}</p>
            <hr>
            <p>Id: ${book.id}</p>
        `;

        booksContainer.appendChild(bookDiv);
    })
}

// search feature
function search(bookData) {
    console.log(bookData);

    document.getElementById('search-bar').addEventListener("input", function () {
        const searchTerm = this.value.toLowerCase();
        const filteredBooks = bookData.filter(book => book.title.toLowerCase().includes(searchTerm));
        displayBookData(filteredBooks);
    });
}

