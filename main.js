const booksPerPage = 10;
let currentPage = 1;

// loading books 
function loadBookData() {
    fetch("https://gutendex.com/books")
        .then(res => res.json())
        .then(data => {
            displayBookData(data.results);
            search(data.results);
            filter(data.results);
            displayWishlistBooks(data.results);
            displayPaginatedBooks(data.results, currentPage);
            setupPagination(data.results);
        })
}
loadBookData();

// displaying books
function displayBookData(bookData) {
    // console.log(bookData, bookData.length);
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
            <button class="wishlist-btn" data-id="${book.id}">❤</button>
        `;
        booksContainer.appendChild(bookDiv);
    });

    // showing book length
    let bookLength = document.getElementById("bookLength");
    bookLength.innerText = bookData.length;
}

// search feature
function search(bookData) {
    // console.log(bookData);

    document.getElementById('search-bar').addEventListener("input", function () {
        const searchTerm = this.value.toLowerCase();
        const filteredBooks = bookData.filter(book => book.title.toLowerCase().includes(searchTerm));
        displayBookData(filteredBooks);
    });
}

// dropdown filter feature
function filter(bookData) {
    // console.log(bookData);
    document.getElementById('genre-filter').addEventListener('change', function () {
        const selectedGenre = this.value;

        if (selectedGenre === 'all') {
            displayBookData(bookData);
        } else {
            const filteredBooks = bookData.filter(book => book.bookshelves.includes(selectedGenre));
            displayBookData(filteredBooks);
        }
    });

}

// wishlist feature with local-storage
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

// Function to add/remove book from wishlist
function toggleWishlist(bookId) {
    if (wishlist.includes(bookId)) {
        wishlist = wishlist.filter(id => id !== bookId);
    } else {
        wishlist.push(bookId);
    }
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistIcons();
}

// Update the heart icon based on wishlist status
function updateWishlistIcons() {
    document.querySelectorAll('.wishlist-btn').forEach(button => {
        const bookId = button.getAttribute('data-id');
        if (wishlist.includes(bookId)) {
            button.classList.add('liked');
        } else {
            button.classList.remove('liked');
        }
    });
}

document.getElementById('booksContainer').addEventListener('click', function (e) {
    if (e.target.classList.contains('wishlist-btn')) {
        const bookId = e.target.getAttribute('data-id');
        toggleWishlist(bookId);
    }
});

// display wishlist books
function displayWishlistBooks(bookData) {
    document.getElementById('wishlist-link').addEventListener('click', function () {
        const wishlistBooks = bookData.filter(book => wishlist.includes(book.id.toString()));
        displayBookData(wishlistBooks);

        // hiding searchbar and dropdown
        const searchBar = document.getElementById("search-bar");
        const genreFilter = document.getElementById("genre-filter");
        const pagination = document.getElementById("pagination");
        searchBar.style.display = "none";
        genreFilter.style.display = "none";
        pagination.style.display = "none";
    });
}

// pagination feature
// const booksPerPage = 10;
// let currentPage = 1;

function displayPaginatedBooks(bookData, currentPage) {
    const start = (currentPage - 1) * booksPerPage;
    const paginatedBooks = bookData.slice(start, start + booksPerPage);
    displayBookData(paginatedBooks);
}

function setupPagination(bookData) {
    const totalPages = Math.ceil(bookData.length / booksPerPage);
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = ''; // Clear previous pagination

    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.textContent = i;

        pageBtn.addEventListener('click', function () {
            currentPage = i;
            displayPaginatedBooks(bookData, currentPage);
        });
        pagination.appendChild(pageBtn);
    }
}

// displayPaginatedBooks(allBooks, currentPage);
// setupPagination(allBooks);

