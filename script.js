let booksContainer = document.getElementById("grid-list");

// Function to fetch and display books
function fetchAndDisplayBooks() {
  fetch("books.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error fetching data");
      }
      return response.json();
    })
    .then((data) => {
      displayBooks(data); // Pass data directly to the display function
    })
    .catch((error) => console.error(error));
}

// Function to display books
function displayBooks(books) {
  booksContainer.innerHTML = ""; // Clear container before rendering

  books.forEach((book, i) => {
    let bookItem = document.createElement("li");
    bookItem.innerHTML = `
            <div class="product-card">
                <span class="card-badge">New</span>
                <div class="card-banner img-holder" style="--width: 384; --height: 480;">
                    <img src="${book.cover}" width="384" height="480" loading="lazy" alt="${book.title}" class="img-cover">
                    <div class="card-action">
                        <a href="details.html?id=${i}" class="action-btn details" aria-label="Quick View" title="Quick View">
                            <ion-icon name="eye-outline" aria-hidden="true"></ion-icon>
                        </a>
                        <button class="action-btn wishlist" aria-label="Add to Wishlist" title="Add to Wishlist" onclick="addToWishlist(${i})">
                            <ion-icon name="heart-outline" aria-hidden="true"></ion-icon>
                        </button>
                    </div>
                </div>
                <div class="card-content">
                <br>
                    <h2 class="card-title h3">${book.title}</h2>
                    <h2 class="card-price">${book.author?.fullname || "Unknown Author"}</h2>
                    <div class="rating-wrapper">
                        ${Array(5).fill('<ion-icon name="star-outline" aria-hidden="true"></ion-icon>').join("")}
                    </div>
                </div>
            </div>`;
    booksContainer.appendChild(bookItem);
  });

  window.books = books;
}

    // Function to add a book to wishlist and save it in local storage
function addToWishlist(bookIndex) {
  const book = window.books[bookIndex]; // Access the book by its index
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || []; // Retrieve wishlist from local storage

  // Avoid adding duplicates
  if (!wishlist.some((wish) => wish.title === book.title)) {
    wishlist.push(book);
    localStorage.setItem("wishlist", JSON.stringify(wishlist)); // Save updated wishlist
    // alert(`${book.title} has been added to your wishlist!`);
    updateBadgeCounter();
  } else {
    alert(`${book.title} is already in your wishlist.`);
  }
}

function updateBadgeCounter(){
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || []; // Retrieve wishlist from local storage
  const badge=document.querySelector(".count");
  badge.textContent=wishlist.length;
}
updateBadgeCounter();

// Fetch and display books on page load
fetchAndDisplayBooks();

// Fetch books and display them
// fetch("books.json")
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error("Error fetching data");
//     }
//     return response.json();
//   })
//   .then((data) => {
//     books = data;
//     displayBooks(books); // Pass books array to the function
//   })
//   .catch((error) => console.error(error));

const searchBook = document.querySelector("#search-book");
/**SEARCH BOOKS */
function search(value) {
  let data = books;
  const bookItem = document.querySelector("li");
  bookItem.innerHTML = "";

  for (let i = 0; i < data.length; i++) {
    if (data[i].title.toLowerCase().includes(value.toLowerCase())) {
      bookItem.innerHTML += `
            <section class="book-details">
                <div class="container">
                    <img src="${data[i].cover}" class="book-cover">
                        <div class="book-info">
                        <h1 class="book-title">${data[i].title}</h1>
                        
                        <p class="book-author" style="margin: 10px 0">${
                          data[i].author.fullname || "unknown"
                        }</p>
                        <p class="book-bio" style="margin: 10px 0">${
                          data[i].author.biography || "No biography available."
                        }</p>
                        <p class="book-description" style="margin: 10px 0">${
                          data[i].description || "No description available."
                        }</p>
                        <p class="book-year" style="margin: 10px 0">${
                          data[i].year || "unknown."
                        }</p>
                       
                </div>
                    <span class="wishlist">Add to wishlist</span>
                </div>
            </section>    
            `;

      localStorage.setItem("index", book);
    }
  }
  update(data);
}




