/***********************************************
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
***********************************************/


/****** showPage function ******/
const ul = document.querySelector(".student-list");
const perPage = 9;

/****** showPage function ******/
function showPage(list, page) {
   // two variables represent the index for the first and last student on the page
   const startIndex = page * perPage - perPage;
   const endIndex = page * perPage;
   ul.innerHTML = ''; // set ul html to an empty string

   // loop over the length of the `list` parameter 
   for (let i = 0; i < list.length; i++) {
            
      // conditional statement creating the div depending on the 'startIndex' and 'endIndex' value
      if (i >= startIndex && i < endIndex) {
         // use template literal for student elements
         let html = `
         <li class="student-item cf">
            <div class="student-details">
               <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture">
               <h3>${list[i].name.first} ${list[i].name.last}</h3>
               <span class="email">${list[i].email}</span>
            </div>
            <div class="joined-details">
               <span class="date">Joined ${list[i].registered.date}</span>
            </div>
         </li>`;
         ul.insertAdjacentHTML('beforeend', html); // insert html into DOM
      }
   }
}

/****** addPagination function ******/
function addPagination(list) {
   
   const numOfPages = Math.ceil(list.length / perPage);   // variable to calculate the number of pages needed
   const paginationUl = document.querySelector(".link-list");  // getting the ul element using it's class of 'link-list'
   paginationUl.innerHTML = '';  // set innerHTML of ul to empty string
   
   for (let i = 1; i <= numOfPages; i++) {
      const button = `<li><button type="button">${i}</button></li>`; // using a template literal to dynamically change the buttons text
      paginationUl.insertAdjacentHTML("beforeend", button); // insert the button inside the ul element but after it's last child element
      paginationUl.firstChild.firstChild.className = "active";  // adding the class 'active' to the first button
            
      // event handler on ul for a click event
      paginationUl.addEventListener("click", (e) => {
         // conditional statement if event target is a button then..
         if (e.target.tagName === "BUTTON") {
            const activeLi = document.querySelector('button.active'); // selecting the first button with a class of 'active'
            activeLi.className = '';   // setting that button class to an empty string
            e.target.className = "active";   // setting the target button's class to 'active'
            showPage(list, e.target.textContent);  // call the show page function with the data parameter and buttons text content for the page number
         }
      });
   }
}

/********** createFilter function **********/

function createFilter() {
  const header = document.querySelector(".header");
  const searchBar = `
   <label for="search" class="student-search">
      <input id="search" placeholder="Search by name...">
      <button type="button"><img src="img/icn-search.svg" class= "submit" alt="Search icon"></button>
   </label>`;
   header.insertAdjacentHTML('beforeend', searchBar);
}


/********** SearchFilter function **********/
function SearchFilter(list) {
   
   let searchResults = []; // empty array to store search results
   const submit = document.querySelector("button");
   const search = document.querySelector("#search");

   // event handlers
   search.addEventListener("keyup", (e) => {
      const searchInput = e.target.value.toLowerCase();  // stores input value in lower case
      searchResults = []; // reset array
      console.log(searchInput);
      
      for (let i = 0; i < list.length; i++) {
         let student = list[i];
         const fullName = `${student.name.first.toLowerCase()} ${student.name.last.toLowerCase()}`
         
         if (fullName.includes(searchInput)) {  // if the fullName includes values from input then add results to array list
            searchResults.push(list[i]);
         } else if (searchInput.length == 0) { // if no input value that matches display 0 results message
            ul.innerHTML = `<h2 class="no-results">0 results found</h2>`;
         } else if (searchInput == null) { // if value is null then display all students
            ul.innerHTML = ul; // 
         }
      } 
      showPage(searchResults, 1);
      addPagination(searchResults);
});


   submit.addEventListener('click', (e) => {
      console.log("submit works");
      const searchInputValue = search.value;
      searchResults = []; // reset array
      for (let i = 0; i < list.length; i++) {
         let student = list[i];
         const fullName = `${student.name.first.toLowerCase()} ${student.name.last.toLowerCase()}`;
         if (fullName.includes(searchInput)) {
            // if the fullName includes values from input then add results to array list
            searchResults.push(list[i]);
         } else if (searchInput.length == 0) {
            // if no input value that matches display 0 results message
            ul.innerHTML = `<h2 class="no-results">0 results found</h2>`;
         } else if (searchInput == null) {
            // if value is null then display all students
            ul.innerHTML = ul; //
         }
      }
      showPage(searchResults, 1);
      addPagination(searchResults);
   });
}


  /**** Call functions ****/
  showPage(data, 1);
  addPagination(data);
  createFilter();
  SearchFilter(data)