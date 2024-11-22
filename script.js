const booksContainer = document.getElementById("grid-list");

//***fetchiiing */
function fetchAndDisplayBooks() {
  fetch("books.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error fetching data");
      }
      return response.json();
    })
    .then((data) => {
      displayBooks(data);
    })
    .catch((error) => {
      console.error(error);
    });
}


////************FUNCTION displayBooks */
function displayBooks(books) {
  booksContainer.innerHTML = "";

  books.forEach((book, i) => {
    let bookItem = document.createElement("li");
    bookItem.innerHTML = `
      <div class="product-card">
          <span class="card-badge">New</span>
          <div class="card-banner img-holder" style="--width: 384; --height: 480;">
              <img src="${book.cover}" width="384" height="480" loading="lazy" class="img-cover">
              <div class="card-action">
                  <a href="details.html?id=${i}" class="action-btn details" aria-label="Quick View" title="Quick View">
                      <ion-icon name="eye-outline" aria-hidden="true"></ion-icon>
                  </a>
                  <button class="action-btn wishlist" aria-label="Add to Wishlist" title="Add to Wishlist" onclick="addToWishlist(${i})">
                      <ion-icon name="heart-outline" aria-hidden="true"></ion-icon>
                  </button>
              </div>
          </div>
          <br>
          <div class="card-content">
              <h2 class="card-title h3">${book.title}</h2>
              <h2 class="book-author">${book.author?.fullname || "Unknown Author"}</h2>
          </div>
      </div>`;
    booksContainer.appendChild(bookItem);
  });

  window.books = books; // Save books globally
}


/****************FUNCTION AddToWishList */

function addToWishlist(bookIndex) {
  //bring
  const book = window.books[bookIndex];
  
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  if (!wishlist.some((wish) => wish.title === book.title)) {
    wishlist.push(book);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    updateBadgeCounter();
  } else {
    alert(`${book.title} is already in your wishlist.`);
  }
}



/** FUNCTION IPDATEBADGECOUNTER*/

function updateBadgeCounter() {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  const badge = document.querySelector(".count");
  badge.textContent = wishlist.length;
}

/****************FUNCTION SEARCH */

const searchBook = document.querySelector("#search-book");


function search(value) {
  booksContainer.innerHTML = "";

  let filteredBooks = window.books.filter((book) =>
    book.title.toLowerCase().includes(value.toLowerCase())
  );

  if (filteredBooks.length === 0) {
    booksContainer.innerHTML = `<p>No books found matching "${value}".</p>`;
    return;
  }

  filteredBooks.forEach((book, i) => {
    let bookItem = document.createElement("li");
    bookItem.innerHTML = `
      <div class="product-card">
          <span class="card-badge">New</span>
          <div class="card-banner img-holder" style="--width: 384; --height: 480;">
              <img src="${book.cover}" width="384" height="480" loading="lazy" class="img-cover">
              <div class="card-action">
                  <a href="details.html?id=${i}" class="action-btn details" aria-label="Quick View" title="Quick View">
                      <ion-icon name="eye-outline" aria-hidden="true"></ion-icon>
                  </a>
                  <button class="action-btn wishlist" aria-label="Add to Wishlist" title="Add to Wishlist" onclick="addToWishlist(${i})">
                      <ion-icon name="heart-outline" aria-hidden="true"></ion-icon>
                  </button>
              </div>
              </div>
          
          <br>
          <div class="card-content">
              <h2 class="card-title h3">${book.title}</h2>
              <h2 class="book-author">${book.author?.fullname || "Unknown Author"}</h2>
          </div>
      </div>`;
    booksContainer.appendChild(bookItem);
  });
}

searchBook.addEventListener("input", (e) => {
  search(e.target.value);
});

fetchAndDisplayBooks();
updateBadgeCounter();
