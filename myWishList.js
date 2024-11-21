document.addEventListener("DOMContentLoaded", () => {
  let wishlistData = JSON.parse(localStorage.getItem("wishlist")) || []; // Get wishlist from local storage
  // let alreadyRead = JSON.parse(localStorage.getItem("already-read")) || [];
  console.log(wishlistData);

  const tbody = document.querySelector("tbody");

  // Function to render the wishlist in the table
  function renderWishlist() {
    tbody.innerHTML = ""; // Clear table content
    wishlistData.forEach((book, index) => {
      tbody.innerHTML += `
      <br><br><br><br><br><br><br><br><br><br><br><br>
          <tr>
            <td><img src="${book.cover}"  class="book-cover"></td>
            <td><h1 class="book-title">${book.title}</h3></td>
            <br>
            <h2 class="book-author"><strong>Author:</strong> ${book.author.fullname || "Unknown"}</h2>
            <td>
                <a href="${book.linkPDF}" class="btn" data-id="${index}">PDF</a>
                <button class="already-read" data-id="${index}">read</button>
                <br>
                <button class="delete-book" data-id="${index}">Delete</button>
            </td>
            
          </tr>
        `;
    });
  }
  // Initial render of wishlist
  renderWishlist();

  // Attach a single event listener to the table for delegation
  tbody.addEventListener("click", (e) => {
    const target = e.target;

    // Handle delete button
    if (target.classList.contains("delete-book")) {
      const bookIndex = target.getAttribute("data-id"); // Get the book's index from the button's data-id
      wishlistData.splice(bookIndex, 1); // Remove the book from the array

      // Update local storage and re-render the table
      localStorage.setItem("wishlist", JSON.stringify(wishlistData));
      renderWishlist();
      updateBadgeCounter();

      // alert("Book removed from wishlist.");
    }
  });
});


readBook();

let deleteBtn = document.querySelectorAll(".delete-book");

function readBook() {
  let readBtn = document.querySelectorAll(".already-read");

  readBtn.forEach((btn) => {
    const itemId = btn.getAttribute("data-id");
    const isClicked = JSON.parse(localStorage.getItem("readBook"));

    // If the item was clicked before, style it as clicked
    if (isClicked[itemId] == "true") {
      btn.style.backgroundColor = "#28a745";
      btn.innerHTML += "<span><i class='fa-solid fa-check'></i></span>";
    }

    btn.addEventListener("click", () => {
      const isClicked = JSON.parse(localStorage.getItem("readBook"));
      if (isClicked[itemId] == "true") {
        // If already clicked, revert the changes
        btn.style.backgroundColor = "#fd7e14";
        btn.innerHTML = "read ";
        isClicked[itemId] = "false";
      } else {
        // Change style to indicate clicked
        btn.style.backgroundColor = "#28a745";
        btn.innerHTML += "<span><i class='fa-solid fa-check'></i></span>";
        isClicked[itemId] = "true";
      }

  
      localStorage.setItem(`readBook`, JSON.stringify(isClicked));
      
    });
  });
}

readBook();
      // UPDATE BADGE
function updateBadgeCounter(){
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || []; // Retrieve wishlist from local storage
  const badge=document.querySelector(".count");
  badge.textContent=wishlist.length;
}
updateBadgeCounter();
