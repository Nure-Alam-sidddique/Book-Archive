const searchBtn = document.querySelector('#search-btn');
const searchField = document.querySelector('#search-field');
const bookCard = document.querySelector('#book-card');

const errorMessage = style => {
    document.querySelector('#error-message').style.display = style;
}
const searchDisplaNone = style => {
    document.getElementById('search-result').style.display = style;
}
const searchResult = (result) => {
    const resultStyle = document.querySelector("#search-result");
  resultStyle.innerHTML=`<h3 class="text-success">Total Search Result : <span class="text-bold text-dark">${result}</span></h3>`;
}
//  Click button for Load data form API
searchBtn.addEventListener('click', event => {
    // console.log("I love Allah");
    const searchText = searchField.value;
    if (searchText === "") {
        errorMessage('block');
        bookCard.textContent = '';
        searchDisplaNone('none');
    }
    else {
        errorMessage('none');
        searchDisplaNone('none');
        const url = ` http://openlibrary.org/search.json?q=${searchText}`;
        searchField.value = "";
        fetch(url)
          .then((response) => response.json())
            .then((data) => bookDisplay(data));
    }
})
const bookDisplay = bookObj => {
    console.log(bookObj);
    bookCard.textContent = '';
    const books = bookObj.docs;
    console.log(books)
    books.slice(0,9).forEach(book => {
        console.log(book);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
               <div class="card h-100 ">
              <img src=" https://covers.openlibrary.org/b/id/${
                book.cover_i
              }-M.jpg" class="card-img-top" alt="${
          book.name
        }" id ="image-resize"/>
              <div class="card-body">
                <h5 class="card-title">${book.title}</h5>
                <p >
                  Author Name: ${book.author_name.map((author) =>
                    author ? author : "No found Author"
                  )}
                </p>
                <p>Publisher Name: ${
                  book.publisher[0] ? book.publisher[0] : "No publisher "
                }</p>
                <p>Publish Year: ${
                  book.first_publish_year
                    ? book.first_publish_year
                    : "No publish year"
                }</p>
              </div>
            </div>
        `;
        bookCard.appendChild(div);
    });
    searchResult(bookObj.num_found);
    searchDisplaNone('block');
 
}
   