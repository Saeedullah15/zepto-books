function getBookIdFromUrl() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get('id');
}

function fetchBookDetails(bookId) {
    fetch(`https://gutendex.com/books/${bookId}`)
        .then(res => res.json())
        .then(data => {
            displayBookDetails(data);
        })
}

function displayBookDetails(book) {
    const bookDetailsContainer = document.getElementById('bookDetailsContainer');

    bookDetailsContainer.innerHTML = `
        <img src="${book.formats['image/jpeg']}" alt="">
        <h1>Title: ${book.title}</h1>
        <h2>Authors: ${book.authors[0].name}</h2>
        <p><strong>Genre:</strong> ${book.subjects ? book.subjects.join(', ') : 'No genres available'}</p>
        <p><strong>Bookshelves:</strong> ${book.bookshelves ? book.bookshelves.join(', ') : 'No additional info'}</p>
        <p><strong>Book ID:</strong> ${book.id}</p>
        <button>
            <a href="${book.formats['text/html']}" class="read-btn" target="_blank">Read Book</a>
        </button>
    `;
}

// Getting the book id from URL and fetching the details
const bookId = getBookIdFromUrl();
if (bookId) {
    fetchBookDetails(bookId);
}
