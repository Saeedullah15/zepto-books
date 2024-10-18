const wishlist = JSON.parse(localStorage.getItem("wishlist"));
console.log(wishlist);

// loading books 
function loadBookData() {
    fetch("https://gutendex.com/books")
        .then(res => res.json())
        .then(data => {
            displayBookData(data.results);
        })
}
loadBookData();

// displaying books
function displayBookData(bookData) {
    let wishlistBooks = [];
    for (const bookId of wishlist) {
        let eachBook = bookData.find(book => book.id === JSON.parse(bookId));
        wishlistBooks.push(eachBook);
    }
    console.log(wishlistBooks);

    const wishlistBooksContainer = document.getElementById("wishlistBooksContainer");

    wishlistBooks.forEach(book => {
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
            <button class="wishlist-btn" data-id="${book.id}">❤</button>
            <a href="bookDetails.html?id=${book.id}" id="">Show Details</a>
        `;
        wishlistBooksContainer.appendChild(bookDiv);
    });

    // showing book length
    let bookLength = document.getElementById("bookLength");
    bookLength.innerText = wishlistBooks.length;
}