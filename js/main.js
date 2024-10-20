const booksPerPage = 10;
let currentPage = 1;

// loading books 
function loadBookData() {
    fetch("https://gutendex.com/books")
        .then(res => res.json())
        .then(data => {
            displayBookData(data.results);
            // search(data.results);
            // filter(data.results);
            displayPaginatedBooks(data.results, currentPage);
            setupPagination(data.results);
        })
}
loadBookData();

// displaying books
function displayBookData(bookData) {
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
            <div class="bookDiv1">
                <h2>Title: ${book.title}</h2>
                <p>By: ${book.authors.map(author => author.name)}</p>
            </div>
            <hr>
            <div class="genre">
                <p>Genre: ${genreList}</p>
            </div>
            <hr>
            <div class="bookDiv3">
                <p>Id: ${book.id}</p>
                <button class="wishlist-btn" data-id="${book.id}">❤</button>
                <button>
                    <a href="bookDetails.html?id=${book.id}" id="details">Show Details</a>
                </button>
            </div>
        `;
        booksContainer.appendChild(bookDiv);
    });
    // Update wishlist icons after rendering books
    updateWishlistIcons();

    // showing book length
    let bookLength = document.getElementById("bookLength");
    bookLength.innerText = bookData.length;
}

// search feature
function search(bookData) {
    document.getElementById('search-bar').addEventListener("input", function () {
        const searchTerm = this.value.toLowerCase();
        const filteredBooks = bookData.filter(book => book.title.toLowerCase().includes(searchTerm));
        displayBookData(filteredBooks);
    });
}

// dropdown filter feature
function filter(bookData) {
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

// Update the heart icon based on wishlist status
function updateWishlistIcons() {
    document.querySelectorAll('.wishlist-btn').forEach(button => {
        const bookId = button.getAttribute('data-id');
        if (wishlist.includes(bookId)) {
            button.classList.add('liked');
        }
        else {
            button.classList.remove('liked');
        }
    });
}

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

document.getElementById('booksContainer').addEventListener('click', function (e) {
    if (e.target.classList.contains('wishlist-btn')) {
        const bookId = e.target.getAttribute('data-id');
        toggleWishlist(bookId);
    }
});

// pagination feature
function displayPaginatedBooks(bookData, currentPage) {
    const start = (currentPage - 1) * booksPerPage;
    const paginatedBooks = bookData.slice(start, start + booksPerPage);
    displayBookData(paginatedBooks);
    search(paginatedBooks);
    filter(paginatedBooks);
}

function setupPagination(bookData) {
    const totalPages = Math.ceil(bookData.length / booksPerPage);
    const pagination = document.getElementById('pagination');

    const span = document.createElement("span");
    span.innerText = "Page: ";

    pagination.innerHTML = '';
    pagination.appendChild(span);

    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.classList.add("pagination-btn");
        pageBtn.textContent = i;

        // default first page active
        if (i === 1) {
            pageBtn.classList.add('active');
        }

        pageBtn.addEventListener('click', function () {
            currentPage = i;
            displayPaginatedBooks(bookData, currentPage);
        });
        pagination.appendChild(pageBtn);
    }

    // Select all dynamically created buttons
    const pageButtons = document.querySelectorAll('.pagination-btn');

    // Add event listener to each button for the active class toggle
    pageButtons.forEach(button => {
        button.addEventListener('click', function () {
            pageButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
}
