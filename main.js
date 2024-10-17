function loadBookData() {
    fetch("https://gutendex.com/books")
        .then(res => res.json())
        .then(data => displayBookData(data.results))
}

function displayBookData(bookData) {
    console.log(bookData);
    const booksContainer = document.getElementById("booksContainer");

    bookData.forEach(book => {
        const bookDiv = document.createElement("div");
        bookDiv.classList.add("book");

        // Create a list of genres
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

loadBookData();