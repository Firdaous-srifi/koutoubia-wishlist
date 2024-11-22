document.addEventListener("DOMContentLoaded", () => {
  let wishlistData = JSON.parse(localStorage.getItem("wishlist")) || []; // Get wishlist from local storage
  const tbody = document.querySelector("tbody");
  const searchInput = document.querySelector("#search-book");

  // Function to render the wishlist in the table
  function renderWishlist(filteredData = wishlistData) {
    tbody.innerHTML = ""; 
    filteredData.forEach((book, index) => {
      tbody.innerHTML += `
          <tr>
            <td><img src="${book.cover}" class="book-cover"></td>
            <td><h1 class="book-title">${book.title}</h1></td>
            <h2 class="book-author"><strong>Author:</strong> ${book.author.fullname || "Unknown"}</h2>
            <td>
                <a href="${book.linkPDF}" class="btn" data-id="${index}">PDF</a>
                <button class="already-read" data-id="${index}">Unread</button>
                <br>
                <button class="delete-book" data-id="${index}">Delete</button>
            </td>
          </tr>
        `;
    });
  }

  // Render the full wishlist initially
  renderWishlist();

  // Search functionality
  searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase(); // Get the search term
    const filteredData = wishlistData.filter((book) =>
      book.title.toLowerCase().includes(searchTerm) || 
      (book.author.fullname && book.author.fullname.toLowerCase().includes(searchTerm))
    );
    renderWishlist(filteredData); // Render only matching books
  });


  tbody.addEventListener("click", (e) => {
    const target = e.target;

    // Already Read
if (target.classList.contains("already-read")) {
  if (target.textContent === "Unread") {
    target.style.backgroundColor = "#48d985"; // green
    target.textContent = "Unfinished";
  } else if (target.textContent === "Unfinished") {
    target.style.backgroundColor = "#00642a"; // dark green
    target.textContent = "Finished";
  } else {
    target.style.backgroundColor = "#030128"; // dark blue
    target.textContent = "Unread";
  }
}


    // Handle delete button
    if (target.classList.contains("delete-book")) {
      const bookIndex = target.getAttribute("data-id"); // Get the book's index from the button's data-id
      wishlistData.splice(bookIndex, 1); 

      // Update local storage and re-render the table
      localStorage.setItem("wishlist", JSON.stringify(wishlistData));
      renderWishlist();
      updateBadgeCounter();
    }
  });

  // Update wishlist badge
  function updateBadgeCounter() {
    const badge = document.querySelector(".count");
    badge.textContent = wishlistData.length;
  }

  updateBadgeCounter(); 
});
