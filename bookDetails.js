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
        <h1>${book.title}</h1>
        <img src="${book.formats['image/jpeg']}" alt="">
        <h2>By: ${book.authors[0].name}</h2>
        <p>Genre: ${book.subjects ? book.subjects.join(', ') : 'No genres available'}</p>
        <p>Bookshelves: ${book.bookshelves ? book.bookshelves.join(', ') : 'No additional info'}</p>
        <p><strong>Book ID:</strong> ${book.id}</p>
        <a href="${book.formats['text/html']}" target="_blank">Read Book</a>
    `;
}

// Getting the book id from URL and fetching the details
const bookId = getBookIdFromUrl();
if (bookId) {
    fetchBookDetails(bookId);
}
