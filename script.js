
let books = [];
let categories = [];
let wishListArray = [];

let categoriesContainer = document.getElementById("section popular");
let booksContainer = document.getElementById("grid-list");

fetch("books.json").then(results => {

    let myData = results.json();
    console.log(myData);
    return myData;
}).then((myData) => {

    myData.forEach(data => {

        books.push(data);

    });

    console.log(books);
    categoriesFunction(books);

});

wishListArray = getBooksFromLocalStorage();

console.log("wishList : ");
console.log(wishListArray);




function getBooksFromLocalStorage() {
    let books = JSON.parse(localStorage.getItem("books")) || [];
    return books;
}

function displayBooks(books) {
  booksContainer.innerHTML = ""; // Clear container before rendering

  for (let i = 0; i < books.length; i++) {
      let book = books[i];

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
                      <button class="action-btn wishlist" aria-label="Add to Wishlist" title="Add to Wishlist">
                          <ion-icon name="heart-outline" aria-hidden="true"></ion-icon>
                      </button>
                  </div>
              </div>
              <div class="card-content">
              <br>
                  <h2 class="card-title h3">${book.title}</h2>
                  <h2 class="card-price">${book.author.fullname}</h2>
                  <div class="rating-wrapper">
                      ${Array(5).fill('<ion-icon name="star-outline" aria-hidden="true"></ion-icon>').join('')}
                  </div>
              </div>
          </div>`;
      booksContainer.appendChild(bookItem);
  }
}

// Fetch books and display them
fetch("books.json")
  .then(response => {
      if (!response.ok) {
          throw new Error("Error fetching data");
      }
      return response.json();
  })
  .then(data => {
      books = data;
      displayBooks(books); // Pass books array to the function
  })
  .catch(error => console.error(error));

const searchBook = document.querySelector("#search-book");
                /**SEARCH BOOKS */
function search(value){
    let data = books;
    const bookItem = document.querySelector("li");
    bookItem.innerHTML="";

    for (let i = 0; i < data.length; i++) {
        if (data[i].title.toLowerCase().includes(value.toLowerCase())) {
            bookItem.innerHTML += `
            <section class="book-details">
                <div class="container">
                    <img src="${data[i].cover}" class="book-cover">
                        <div class="book-info">
                        <h1 class="book-title">${data[i].title}</h1>
                        
                        <p class="book-author" style="margin: 10px 0">${data[i].author.fullname || "unknown" }</p>
                        <p class="book-bio" style="margin: 10px 0">${data[i].author.biography || "No biography available."}</p>
                        <p class="book-description" style="margin: 10px 0">${data[i].description || "No description available."}</p>
                        <p class="book-year" style="margin: 10px 0">${data[i].year || "unknown."}</p>
                       
                </div>
                    <span class="wishlist">Add to wishlist</span>
                </div>
            </section>    
            `;

            localStorage.setItem("index", book);
        }
    }
    update(data)
}

                    /**WISHLIST */
//                     function update(data) {
//                         const bookInfos = document.querySelectorAll('.book-infos');
//                         const wishlist = document.querySelectorAll('.wishlist');
//                         const arrWishlist = JSON.parse(localStorage.getItem('arrayBooks'));
                    
//                         wishlist.forEach(item => {
//                             item.addEventListener('click', () => {
//                                 let title = item.parentElement.querySelector(".title");
                    
//                                 for (index in data){
//                                     if (title.textContent == data[index].title){
//                                         i = index;
//                                         break;
//                                     }
//                                 }
                    
//                                 for (const book of arrWishlist) {
//                                     if (book.id === data[i].id) {
//                                         return;
//                                     }
//                                 }
                    
//                                 arrWishlist.push(data[i]);
//                                 localStorage.setItem("arrayBooks", JSON.stringify(arrWishlist));
                    
//                                 // window.open("my_wish_reads.html", "_blank");
//                             });
//                         });

//                         document.querySelectorAll('.wishlist').forEach(item => {
//                             // Check if the item has been clicked before (based on a unique ID)
//                             const itemId = item.getAttribute('data-id'); // Make sure each .wishlist has a unique data-id attribute
//                             const isClicked = JSON.parse(localStorage.getItem('wishlistClicked'));
                    
//                             // If the item was clicked before, style it as clicked
//                             if (isClicked[itemId] === 'true') {
//                                 item.classList.remove('wishlist');
//                                 item.classList.add('clicked-button');
//                             }
                    
//                             item.addEventListener("click", () => {
//                                 const isClicked = JSON.parse(localStorage.getItem('wishlistClicked'));
//                                 // If already clicked, do nothing
//                                 if (JSON.parse(localStorage.getItem('wishlistClicked'))[itemId] === 'true') return;
                        
//                                 // Change style to appear clicked
//                                 item.classList.remove('wishlist');
//                                 item.classList.add('clicked-button');
                    
//                                 isClicked[itemId] = "true";
                    
//                                 // Save the clicked state to localStorage
//                                 localStorage.setItem(`wishlistClicked`, JSON.stringify(isClicked));
//                             });
//                         });       
//                     }


//                     const data =  JSON.parse(localStorage.getItem('arrayBooks'));
// let mainPage = document.querySelector('#wishlist');

// if (mainPage) {
//     mainPage.innerHTML += `
//         <table class="box">
//             <thead>
//                 <tr>
//                     <th>Cover</th>
//                     <th>Title</th>
//                     <th>Author</th>
//                     <th>Action</th>
//                 </tr>
//             </thead>
//             <tbody></tbody>
//         </table>
//     `;
//     // Select the tbody element correctly
//     const tbody = document.querySelector('tbody');

//     for (let i = 0; i < data.length; i++) {
//         // Append the rows to tbody
//         tbody.innerHTML += `
//             <tr>
//                 <td><img src="${data[i].cover}" class="img"></td>
//                 <td><h3 class="title">${data[i].title}</h3></td>
//                 <td><p class="full-name-author">${data[i].author.full_name}</p></td>
//                 <td><button class="delete-book">Delete</button></td>
//             </tr>
//         `;
//     }
// }

// document.querySelector('click', () =)