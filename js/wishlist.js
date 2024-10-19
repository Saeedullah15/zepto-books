let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

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
                <button class="wishlist-btn liked" data-id="${book.id}">❤</button>
                <button>
                    <a href="bookDetails.html?id=${book.id}" id="details">Show Details</a>
                </button>
            </div>
        `;
        wishlistBooksContainer.appendChild(bookDiv);
    });
    // Update wishlist icons after rendering books
    updateWishlistIcons();

    // showing book length
    let bookLength = document.getElementById("bookLength");
    bookLength.innerText = wishlistBooks.length;
}

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

document.getElementById('wishlistBooksContainer').addEventListener('click', function (e) {
    if (e.target.classList.contains('wishlist-btn')) {
        const bookId = e.target.getAttribute('data-id');
        toggleWishlist(bookId);
    }
});
