/***********************************************
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
***********************************************/

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

  const header = document.querySelector("header");
  const ul = document.querySelector(".student-list");

  function showPage() {
    for (i = 0; i < data.length; i++) {
      const li = document.createElement("li");
      li.className = "student-item cf";
      const divStudentDetails = document.createElement("div");
      divStudentDetails.className = "student-details";
      divStudentDetails.innerHTML = `
         <img class="avatar" src="${data[i].picture.large}" alt="Profile Picture">
         <h3>${data[i].name.first} ${data[i].name.last}</h3>
            <span class="email">${data[i].email}</span>
          </div>
          <div class="joined-details">
            <span class="date">Joined ${data[i].registered.date}</span>
          </div>
      `;
      li.appendChild(divStudentDetails);
      ul.appendChild(li);
    }
  }

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


  /*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

function addPagination() {


}





  // Call functions
   showPage();
   searchFilter();






  /*
Create the `event listener` for search field:
*/

  //   header.addEventListener("click", (e) => {
  //    e.preventDefault();
  //    const button = document.querySelector("button");
  //    const input = button.parentNode.firstChild;
  //    const text = input.value;
  //    input.value = "";

  //    if (e.target.tagName === 'BUTTON') {
  //       for (let i = 0; i < data.length; i++) {
  //           const firstName = data[i].name.first;
  //           const lastName = data[i].name.last;

  //           if (
  //             text.toUpperCase() === firstName.toUpperCase() ||
  //             text.toUpperCase() === lastName.toUpperCase()
  //           ) {
  //              console.log(text);

  //           } else {
  //              console.log('no match');

  //           }
  //       }
  //    }
  //   });