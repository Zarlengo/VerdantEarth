/* eslint-disable no-unused-vars */
$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(data => {
    $("#firstName").text(data.firstName);
    $("#email").text(data.email);
    $("#password").text(data.password);
    $("#emailOptIn").text(data.emailOptIn);
    $("#powerUsage").text(data.powerUsage);
    $("#utilityRate").text(data.utilityRate);
  });
});

// const email = $("input#email");
// const password = $("input#password");
// const firstName = $("input#firstName");
// const emailOptIn = $("input#emailOptIn");
// const loginForm = $("form.login");

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
