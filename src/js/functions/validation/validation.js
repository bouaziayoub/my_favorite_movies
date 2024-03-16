import * as constants from "../../constants/constants";
import * as storage from "../storage/storage";

export function validate(inputEmail, inputTitle, inputSinopsis) {
  constants.mensajeError.textContent =
    "The email address " + inputEmail + " is incorrect.";
  
  constants.mensajeError.classList = "error";
  if (inputEmail === "" || inputTitle === "" || inputSinopsis === "") {
    constants.mensajeError.textContent = "The fields are required.";
    constants.divContent.appendChild(constants.mensajeError);
  } else if (constants.validEmail.test(inputEmail)) {
    // Add the email to the sessionStorage.
    storage.addEmailToSessionStorage();

    // Add the movie to the localStorage.
    storage.addMovieTolistLocalStorage();

    // Clean if the email is correct.
    constants.mensajeError.textContent = "";
    // remove the class error.
    constants.mensajeError.classList = "";
  } else {
    constants.divContent.appendChild(constants.mensajeError);
  }
}
