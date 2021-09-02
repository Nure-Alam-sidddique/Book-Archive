const searchBtn = document.querySelector('#search-btn');
const searchField = document.querySelector('#search-field');
const bookCard = document.querySelector('#book-card');
//  Function Definatin
const errorMessage = style => {
    document.querySelector('#error-message').style.display = style;
}
//  display block and None function
const searchDisplaNone = style => {
    document.getElementById('search-result').style.display = style;
}
//  search Total result count function
const searchResult = (result) => {
    const resultStyle = document.querySelector("#search-result");
  resultStyle.innerHTML=`<h3 class="text-success left-border ps-1">Total Search Result : <span id="result">${result}</span></h3>`;
}
//  spinner Loading function
const toggleSpinner = style => {
  document.querySelector('#spinner-loading').style.display = style;
}
//  Click button for Load data form API
searchBtn.addEventListener('click', event => {
    // console.log("I love Allah");
  const searchText = searchField.value;
  //  Erro Handling part
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
      // load data
        fetch(url)
          .then((response) => response.json())
            .then((data) => bookDisplay(data));
    }
})
//  calling after loading and  Display book function
const bookDisplay = bookObj => {
    // console.log(bookObj);
    bookCard.textContent = '';
    const books = bookObj.docs;
    // console.log(books)
  //  Loop Array
    books.slice(0,12).forEach(book => {
        // console.log(book);
        const div = document.createElement('div');
      div.classList.add('col');
      //  Card Create to show display
      // console.log(book.author_name);
      const authorName = book.author_name
        ? book.author_name.map((name) => name)
        : "<span class='text-danger'>No found Author</span>";
      // console.log(authorName);
        div.innerHTML = `
               <div class="card h-100 " id="card">
              <img src=" https://covers.openlibrary.org/b/id/${
                book.cover_i
              }-M.jpg" class="card-img-top " alt="${
          book.name
        }" id ="image-resize"/>
              <div class="card-body ">
                <p class="card-title fs-4 fw-bold text-center title-color">${
                  book.title
                }</p>
                <p><span class="fw-bold text-secondary ">Author :</span>
                ${authorName}
                </p>
                <p class="fw-normal"><span class="fw-bold text-secondary">Publisher :</span> ${
                  book.publisher[0] ? book.publisher[0] : "No publisher "
                }</p>
                <p class= "fw-normal" ><span class="fw-bold text-secondary ">First Publish Year : </span> ${
                  book.first_publish_year
                    ? book.first_publish_year
                    : "<span class='text-danger'>No publish year</span>"
                }</p>
              </div>
            </div>
        `;
        bookCard.appendChild(div);
    });
  //  After card loading this function call to show total count book Number from the search and do display block and toggole spinner display none
    searchResult(bookObj.num_found);
  searchDisplaNone('block');
  toggleSpinner('none');
 
}
   