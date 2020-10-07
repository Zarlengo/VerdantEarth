// Makes an API call when the page initially loads to obtain the user information
fetch("/api/user_data").then(data => {
  document.querySelector("#firstName").text(data.firstName);
  document.querySelector("#email").text(data.email);
  document.querySelector("#password").text(data.password);
  document.querySelector("#emailOptIn").text(data.emailOptIn);
  document.querySelector("#powerUsage").text(data.powerUsage);
  document.querySelector("#utilityRate").text(data.utilityRate);
});
