const searchBtn = document.querySelector('#search-btn');
const searchField = document.querySelector('#search-field');
const bookCard = document.querySelector('#book-card');
//  Function Definatin
const errorMessage = style => {
    document.querySelector('#error-message').style.display = style;
}
const searchDisplaNone = style => {
    document.getElementById('search-result').style.display = style;
}
const searchResult = (result) => {
    const resultStyle = document.querySelector("#search-result");
  resultStyle.innerHTML=`<h3 class="common-color">Total Search Result : <span id="result">${result}</span></h3>`;
}
const toggleSpinner = style => {
  document.querySelector('#spinner-loading').style.display = style;
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
        const url = ` https://openlibrary.org/search.json?q=${searchText}`;
      searchField.value = "";
      toggleSpinner('block');
        fetch(url)
          .then((response) => response.json())
            .then((data) => bookDisplay(data));
    }
})
const bookDisplay = bookObj => {
    console.log(bookObj);
    bookCard.textContent = '';
    const books = bookObj.docs;
    // console.log(books)
    books.slice(0,12).forEach(book => {
        // console.log(book);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
               <div class="card h-100 " id="card">
              <img src=" https://covers.openlibrary.org/b/id/${
                book.cover_i
              }-M.jpg" class="card-img-top " alt="${
          book.name
        }" id ="image-resize"/>
              <div class="card-body ">
                <p class="card-title fs-4 fw-bold text-center common-color">${book.title}</p>
                <p class="fw-normal" >
                  Author : ${book.author_name.map((author) =>
                    author ? author : "No found Author"
                  )}
                </p>
                <p class="fw-normal">Publisher : ${
                  book.publisher[0] ? book.publisher[0] : "No publisher "
                }</p>
                <p class= "fw-normal" >First Publish Year : ${
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
  toggleSpinner('none');
 
}
   