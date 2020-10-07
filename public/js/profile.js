/* eslint-disable no-unused-vars */

// This file just does a GET request to figure out which user is logged in
// and updates the HTML on the page
fetch("/api/user_data").then(data => {
  document.querySelector("#firstName").text(data.firstName);
  document.querySelector("#email").text(data.email);
  document.querySelector("#password").text(data.password);
  document.querySelector("#emailOptIn").text(data.emailOptIn);
  document.querySelector("#powerUsage").text(data.powerUsage);
  document.querySelector("#utilityRate").text(data.utilityRate);
});

// const email = document.querySelector("input#email");
// const password = document.querySelector("input#password");
// const firstName = document.querySelector("input#firstName");
// const emailOptIn = document.querySelector("input#emailOptIn");
// const loginForm = document.querySelector("form.login");

// loginForm.on("submit", event => {
//   event.preventDefault();
//   const userData = {
//     email: email.val().trim(),
//     password: password.val().trim(),
//     firstName: firstName.val().trim(),
//     emailOptIn: emailOptIn //BOOLEAN?
//   };

//   loginUser(
//     userData.email,
//     userData.password,
//     userData.firstName,
//     userData.emailOptIn
//   );
// });

// function loginUser(email, password, firstName, emailOptIn) {
//   fetch(`/api/user/${email}`, {
//     password: password,
//     firstName: firstName,
//     emailOptIn: emailOptIn
//   })
//     .then(() => {
//       window.location.replace("/profile");
//       // If there's an error, log the error
//     })
//     .catch(err => {
//       console.log(err);
//     });
// }

// updateProfile();
