/***********************************************
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
***********************************************/

/*********
variables
**********/
const header = document.querySelector("header");
const ul = document.querySelector(".student-list");
const perPage = 9;
const ulChildren = ul.children;

/*****************
showPage function
******************/
function showPage(list, page) {

  // two variables represent the index for the first and last student on the page
   const startIndex = (page * perPage) - perPage;
   const endIndex = page * perPage;
   ul.innerHTML = ''; // set ul html to an empty string

   // loop over the length of the `list` parameter 
   for (let i = 0; i < list.length; i++) {
      const li = document.createElement("li"); // create a list item
      li.className = "student-item"; // assign class name of 'student-item' to the new list item
      
      // conditional statement creating the div depending on the 'startIndex' and 'endIndex' value
      if (i >= startIndex && i < endIndex) {
         const divStudentDetails = document.createElement("div"); // create div
         divStudentDetails.className = "student-details"; // assign class name 'student details' to div
         // template literal assigning relevant data being looped through in data.js
         divStudentDetails.innerHTML = `
         <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture">
         <h3>${list[i].name.first} ${list[i].name.last}</h3>
            <span class="email">${list[i].email}</span>
         </div>
         <div class="joined-details">
            <span class="date">Joined ${list[i].registered.date}</span>
         </div>`;
         li.appendChild(divStudentDetails);  // append the div to the list item created previously
         ul.appendChild(li); // append the list item to the ul
         li.style.display = ""; // set list item style to be visible
      } else {
        li.style.display = "none"; // set list item style to none
      }
   }
}

/**********************
addPagination function
***********************/
function addPagination(list) {
   const numOfPages = Math.ceil(list.length / perPage);   // variable to calculate the number of pages needed
   const paginationUl = document.querySelector(".link-list");  // getting the ul element using it's class of 'link-list'
   paginationUl.innerHTML = '';  // set innerHTML of ul to empty string
   
  // loop over the number of pages needed
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

/**********************
searchFilter function
***********************/
// Next to work on

function searchFilter() {
  const label = document.createElement("label");
  label.setAttribute("for", "search");
  label.className = "student-search";

  const input = document.createElement("input");
  input.id = "search";
  input.setAttribute("placeholder", "Search by name...");
  input.type = "text";

  const button = document.createElement("button");
  button.type = "button";
  button.innerHTML = `<img src="img/icn-search.svg" alt="Search icon">`;

  header.appendChild(label);
  label.appendChild(input);
  label.appendChild(button);
}


/**************
Call functions
***************/
   showPage(data, 1);
   searchFilter();
   addPagination(data);

 