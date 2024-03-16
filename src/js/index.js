require("materialize-css");
import "../styles/materialize.min.css";
import "../styles/main.css";

import * as constants from "./constants/constants";
import * as storage from "./functions/storage/storage";
import * as Function from "./functions/validation/validation";

// get the list from localStorage.
storage.getListFromLocalStorage();

constants.btnAdd.addEventListener("click", (e) => {
  e.preventDefault();
  Function.validate(constants.inputEmail.value);

  // Clean the list every click.
  storage.titlesList.innerHTML = "";

  // get the list from localStorage.
  storage.getListFromLocalStorage();
});

// constants.inputEmail.addEventListener("keypress", (event) => {
//   if (event.key === "Enter") {
//     console.log("Enter key pressed");

//     // Clean the list every click.
//     storage.titlesList.innerHTML = "";
//     event.preventDefault();
//     Function.validarEmail();
//   }
// });
