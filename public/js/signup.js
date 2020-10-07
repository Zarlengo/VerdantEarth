// Getting references to our form and input
const signUpForm = document.querySelector("form.signup");
const emailInput = document.querySelector("input#email-input");
const passwordInput = document.querySelector("input#password-input");
const firstNameInput = document.querySelector("input#firstName-input");
const optinInput = document.querySelector("input#optin-input");

// When the signup button is clicked, we validate the email and password are not blank
signUpForm.addEventListener(
  "submit",
  event => {
    event.preventDefault();
    const userData = {
      email: emailInput.value.trim(),
      password: passwordInput.value.trim(),
      emailOptIn: optinInput.checked,
      firstName: firstNameInput.value.trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(
      userData.email,
      userData.password,
      userData.emailOptIn,
      userData.firstName
    );
    emailInput.value = "";
    passwordInput.value = "";
    optinInput.checked = false;
    firstName.value = "";
  },
  false
);

// Does a post to the signup route. If successful, we are redirected to the members page
// Otherwise we log any errors
function signUpUser(email, password, emailOptIn, firstName) {
  fetch("/api/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: email,
      password: password,
      emailOptIn: emailOptIn,
      firstName: firstName
    })
  })
    .then(() => {
      window.location.replace("/profile");
      // If there's an error, handle it by throwing up a bootstrap alert
    })
    .catch(handleLoginErr);
}

function handleLoginErr(err) {
  document.querySelector("#alert .msg").textContent = err.responseJSON;
  document.querySelector("#alert").fadeIn(500);
}
