import * as constants from "../../constants/constants";
import { Movie } from "../../clases/Movie";

// Function addEmailToSessionStorage serve for add an email to the session storage.
export function addEmailToSessionStorage() {
  sessionStorage.setItem("email", JSON.stringify(constants.inputEmail.value));
  constants.inputEmail.value = "";
}

const listMovie = [];

export const titlesList = document.getElementById("titlesList");

// Function addMovieTolistLocalStorage serve for add a movie to ths list in the localStorage.
export function addMovieTolistLocalStorage() {
  const movie = new Movie(
    constants.titleInput.value,
    constants.sinopsisInput.value
  );

  listMovie.push(movie);

  localStorage.setItem("movies", JSON.stringify(listMovie));
  console.log(listMovie);
  // Clean the inputs title & sinopsis.
  constants.sinopsisInput.value = "";
  constants.titleInput.value = "";
}

// Function show the list of movies in a div
export function getListFromLocalStorage(listMovie) {
  const storedList = localStorage.getItem("movies");
  listMovie = JSON.parse(storedList);

  if (listMovie != undefined) {
    listMovie.forEach(function (data) {
      const linew = document.createElement("li");
      const pTitle = document.createElement("p");
      const divLi = document.createElement("div");
      const divP = document.createElement("div");

      const showTitle = document.createTextNode(`${data.title}`);
      const showSinopsis = document.createTextNode(`Sinopsis: ${data.sinopsis}`);

      titlesList.appendChild(linew);

      linew.appendChild(divLi);
      linew.className = "collection-item";

      divLi.appendChild(pTitle);
      divLi.className = "valign-wrapper row no-margin-y";

      divLi.appendChild(divP);
      pTitle.appendChild(showTitle);
      pTitle.className = "col s10 no-margin-y item";
      divP.className = "col s2 no-margin-y";

      // Create Buttons for every li
      createBtn(divP);

      linew.addEventListener("click", (event) => {
        const button = event.target;
        console.log(button);
        const title = pTitle.textContent;

        if (button.id === "btnDetails") {
          const devDetails = document.getElementById("details-content");
          devDetails.classList = "details";
          // constants.detailsContent.appendChild(devDetails);
          console.log("CLICK SHOW INFO...");
          console.log(data.sinopsis);
          // Clean div before show details.
          devDetails.innerHTML = "";
          // show details in div
          devDetails.appendChild(showSinopsis);
        } else if (button.id === "btnRemove") {
          // call the function to remove element from the array (LocalStorage ).
          deletMovieFromLocalStorage(title);

          // remove the item from the list (in the document).
          const item = event.target.closest("li");
          item.parentElement.removeChild(item);

          // After remove item its better to clean details.
          devDetails.innerHTML = "";

          console.log("CLICK REMOVE");
          console.log(title);
        }
      });
    });
  } else {
    alert(" The list is empty!");
  }
}

// Function createBtn serve for create button remove & details for li
function createBtn(li) {
  const aRemove = document.createElement("a");
  const iRemove = document.createElement("i");
  aRemove.className =
    "btn-floating waves-effect waves-light btn-small red remove-btn";
  iRemove.className = "material-icons";
  iRemove.textContent = "delete_forever";

  iRemove.setAttribute("id", "btnRemove");

  aRemove.appendChild(iRemove);
  li.appendChild(aRemove);

  const aDtails = document.createElement("a");
  const iDetails = document.createElement("i");
  aDtails.className =
    "btn-floating waves-effect waves-light btn-small blue info-btn";
  iDetails.className = "material-icons";
  iDetails.textContent = "info";

  iDetails.setAttribute("id", "btnDetails");

  aDtails.appendChild(iDetails);
  li.appendChild(aDtails);

  return li;
}

// Function deletMovieFromLocalStorage serve for delete movie from storage using the title as index.
function deletMovieFromLocalStorage(title) {
  // search the index/position that i want to remove.
  let movieIndexInArray = listMovie.findIndex(
    (element) => element.title === title
  );

  // remove the element of this position
  listMovie.splice(movieIndexInArray, 1);

  // I convert the obj to Json
  let movieArrayJson = JSON.stringify(listMovie);

  // Save the array to Json in localStorage.
  localStorage.setItem("movies", movieArrayJson);
}
