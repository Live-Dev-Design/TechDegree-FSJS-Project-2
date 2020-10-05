/***********************************************
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
***********************************************/

/****** Variables ******/
const page = document.querySelector(".page");
const header = document.querySelector(".header");
const ul = document.querySelector(".student-list");
const pagination = document.querySelector(".pagination");
const perPage = 9;

/****** showPage function ******/
function showPage(list, page) {
   // two variables represent the index for the first and last student on the page
   const startIndex = page * perPage - perPage;
   const endIndex = page * perPage;
   ul.innerHTML = ''; // set ul html to an empty string

   // for loop to interate over the data list 
   for (let i = 0; i < list.length; i++) {
      // conditional statement runs if the list item at index i is greater or equal to the startIndex AND smaller than the endIndex
      if (i >= startIndex && i < endIndex) {
        // use template literal for student elements to be filled in through the loop interating over the data list and assign to the variable
        let studentInfo = `
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
        ul.insertAdjacentHTML("beforeend", studentInfo); // insert studentInfo into DOM inside the ul but after its last child
      }
   }
}

/****** addPagination function ******/
function addPagination(list) {
   const numOfPages = Math.ceil(list.length / perPage);   // variable to calculate the number of pages needed based on list length (42) divided by the number of students needed perPage (9)
   const paginationUl = document.querySelector(".link-list");  // getting the ul element using it's class of 'link-list'
   paginationUl.innerHTML = '';  // set innerHTML of ul to empty string
   // for loop to interate over the numOfPages
   for (let i = 1; i <= numOfPages; i++) {
      const button = `<li><button type="button">${i}</button></li>`; // using a template literal to dynamically change the buttons text number based on number of pages dynamically required
      paginationUl.insertAdjacentHTML("beforeend", button); // insert the button inside the ul element but after it's last child element
      paginationUl.firstChild.firstChild.className = "active";  // adding the class 'active' to the first (1) button
            
      // event handler on ul for a click event
      paginationUl.addEventListener("click", (e) => {
         // conditional statement if event target is a button then..
         if (e.target.tagName === "BUTTON") {
            const activeLi = document.querySelector('button.active'); // selecting the first button with a class of 'active'
            activeLi.className = '';   // set that button class to an empty string
            e.target.className = "active";   // set the target button's class to 'active'
            showPage(list, e.target.textContent);  // call the show page function to display student content for the page number clicked
         }
      });
   }
}

/********** createFilter function **********/
function createFilter() {
   // assigning the template literal used to create the element tages to a variable
   const searchBar = `
      <label for="search" class="student-search">
         <input id="search" placeholder="Search by name..." autocomplete="off">
         <button type="button"><img src="img/icn-search.svg" class= "submit" alt="Search icon"></button>
      </label>`;
      header.insertAdjacentHTML('beforeend', searchBar); // insert the search bar inside the header element but after it's last child element
}

/********** SearchFilter function **********/
function SearchFilter(list) {
   let searchResults = []; // empty array to store search results
   const search = document.querySelector("#search"); // assigning the input element with id of 'search' to variable 'search'
   const submit = document.querySelector("button");  // assigning the button element to the variable 'submit' 
   
   // event handler for input based on the 'keyup' event
   search.addEventListener("keyup", (e) => {
      e.preventDefault(); // default action for the event will not occur
      const searchInput = e.target.value.toLowerCase(); // stores input value in lower case
      searchResults = []; // reset searchResults array
      // for loop to iterate through the data list
      for (let i = 0; i < list.length; i++) {
        let student = list[i];
        const fullName = `${student.name.first.toLowerCase()} ${student.name.last.toLowerCase()}`; // assign template literal with students first and last name to the variable fullName
        // if the fullName includes values from input then add results to array list
        if (fullName.includes(searchInput)) {
          searchResults.push(list[i]);
        }
      }
      // if no results found AND no div has been created stating 'No results found' then create one
      if (searchResults.length == 0 && pagination.nextElementSibling == null) {
         const noResultMsg = `<h3 class="no-results">No results found</h3>`;
         const div = document.createElement("div");
         div.setAttribute("id", "no-result-div"); // setting id of div to "no-results-div" to add CSS styling
         div.innerHTML = noResultMsg;
         page.appendChild(div);
      // if there are results found AND there is a 'No results found' message then remove it.
      } else if (searchResults.length > 0 && pagination.nextElementSibling !== null) {
         pagination.nextElementSibling.remove();
      } 
      showPage(searchResults, 1); // call showPage function with the 'searchResults' and '1' page arguments
      addPagination(searchResults); // add argument 'searchResults' to addPagination function to create correct number of page buttons
   });

   // event handler for submit button based on a 'click' event
   submit.addEventListener('click', (e) => {
      e.preventDefault(); // default action for the event will not occur
      const searchInput = search.value.toLowerCase(); // stores input value in lower case
      searchResults = []; // reset searchResults array

      // for loop to iterate through the data list
      for (let i = 0; i < list.length; i++) {
         let student = list[i];
         const fullName = `${student.name.first.toLowerCase()} ${student.name.last.toLowerCase()}`; // assign template literal with students first and last name to the variable fullName
         // if the fullName includes values from input then add results to array list
         if (fullName.includes(searchInput)) {
         searchResults.push(list[i]);
         }
      }
      // if no results found AND no div has been created stating 'No results found' then create one
      if (searchResults.length == 0 && pagination.nextElementSibling == null) {
         const noResultMsg = `<h3 class="no-results">No results found</h3>`;
         const div = document.createElement("div");
         div.setAttribute("id", "no-result-div"); // setting id of div to "no-results-div" to add CSS styling
         div.innerHTML = noResultMsg;
         page.appendChild(div);
      // if there are results found based on searchResults array length AND there is a 'No results found' based on the pagination divs nextElementSibling not being 'null' then remove it.
      } else if (searchResults.length > 0 && pagination.nextElementSibling !== null) {
         pagination.nextElementSibling.remove();
      }
      showPage(searchResults, 1); // call showPage function with the 'searchResults' and '1' page arguments
      addPagination(searchResults); // add argument 'searchResults' to addPagination function to create correct number of page buttons
   });
}

  /**** Call functions ****/
  showPage(data, 1);
  addPagination(data);
  createFilter();
  SearchFilter(data)