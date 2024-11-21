  document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const bookId = params.get("id"); //the book id id=1
    const logo = document.querySelector('.logo');

    logo.addEventListener('click', () => {
      console.log(logo);
      
        window.location.href = 'index.html';
        
    })
    fetch("books.json")
      .then(response => {
        if (!response.ok) {
          throw new Error("Error fetching book data");
        }
        return response.json();
      })
      .then(books => {
        const book = books[bookId]; // Get the book details by id
        if (book) {
          displayBookDetails(book);
        } else {
          document.getElementById("book-details").innerHTML = "<p>Book not found.</p>";
        }
      })
      .catch(error => console.error("Error:", error));
  });

  function displayBookDetails(book) {
    const bookDetailsSection = document.getElementById("book-details");
    bookDetailsSection.innerHTML = `
    <section class="book-details">
      <div class="container">
        <img src="${book.cover}" alt="${book.title}" class="book-cover" />
        <div class="book-info">
        <h1 class="book-title">${book.title}</h1>
        <p class="book-author"><strong>Author:</strong> ${book.author.fullname || "Unknown"}</p>
        <p class="book-bio"><strong>Biography:</strong> ${book.author.biography || "No biography available."}</p>
        <p class="book-description"><strong>Description:</strong> ${book.description || "No description available."}</p>
        <p class="book-year"><strong>Publication Year:</strong> ${book.year || "unknown"}</p>
        </div>
      </div>
      </section>
    `;
  }

 
