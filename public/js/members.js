$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user").then(data => {
    $("#first_name").text(data.firstName);
    $("#email").text(data.email);
    $("#password").text(data.password);
    $("#emailOptIn").text(data.emailOptIn);
    $("#powerUsage").text(data.powerUsage);
    $("#utilityRate").text(data.utilityRate);
  });
});
