function loadData() {
    fetch("https://gutendex.com/books")
        .then(res => res.json())
        .then(data => console.log(data.results))
}
loadData();