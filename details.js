
window.onload = function() {
  //mylogoelemnt
  let logo = document.querySelector('.logo');
  logo.onclick = function() {
      window.location.href = 'index.html';
  }

  let bookId = window.location.search; 
  bookId = bookId.replace('?id=', ''); //query s

  // lfetch
  fetch("books.json")
      .then(function(response) {
          return response.json();
      })
      .then(function(books) {
          
          let book = books[bookId];
          
          
          if (book) {
              showBookDetails(book);
          }else {
              document.getElementById("book-details").innerHTML = "Book not found";
          }
      })
      
}

// FUNCTION DYAL DETAILS
function showBookDetails(book) {
  // location
  let bookDetailsDiv = document.getElementById("book-details");
  
  
  let bookHTML = `
      <section class="book-details">
          <div class="container">
              <!-- Book Cover -->
              <img src="${book.cover}" alt="${book.title}" class="book-cover" />
              
              <div class="book-info">
                  <!-- Book Title -->
                  <h1 class="book-title">${book.title}</h1>
                  
                  <!-- Author Name -->
                  <p class="book-author">
                      <strong>Author:</strong> 
                      ${book.author.fullname || "Unknown"}
                  </p>
                  
                  <!-- Author Biography -->
                  <p class="book-bio">
                      <strong>Biography:</strong> 
                      ${book.author.biography || "No biography available"}
                  </p>
                  
                  <!-- Book Description -->
                  <p class="book-description">
                      <strong>Description:</strong> 
                      ${book.description || "No description available"}
                  </p>
                  
                  <!-- Publication Year -->
                  <p class="book-year">
                      <strong>Publication Year:</strong> 
                      ${book.year || "Unknown"}
                  </p>
                  
                  <!-- Read Button -->
                  <a href="${book.linkPDF}" class="btn">Read Book</a>
              </div>
          </div>
      </section>
  `;
  
  // Put 
  bookDetailsDiv.innerHTML = bookHTML;
}