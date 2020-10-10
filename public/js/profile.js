const firstName = document.querySelector("#firstName-input");
const email = document.querySelector("#email-input");
const password = document.querySelector("#password-input");
const emailOptIn = document.querySelector("#emailOptIn");
const id = document.querySelector("#profile-table");

// Makes an API call when the page initially loads to obtain the user information
fetch("/api/user_data")
  .then(response => response.json())
  .then(data => {
    document.querySelector("#firstName").textContent = data.firstName;
    document.querySelector("#email").textContent = data.email;
    document.querySelector("#emailOptIn").checked = data.emailOptIn;
    document
      .querySelector("#emailOptIn")
      .setAttribute("data-id", data.emailOptIn);
    document.querySelector("#profile-table").setAttribute("data-id", data.id);
  });

document.querySelector("#submit").addEventListener(
  "click",
  () => {
    const data = {};
    let upload = false;
    if (firstName.value.length !== 0) {
      data.firstName = firstName.value;
      upload = true;
    }
    if (email.value.length !== 0) {
      data.email = email.value;
      upload = true;
    }
    if (password.value.length !== 0) {
      data.password = password.value;
      upload = true;
    }
    switch (emailOptIn.getAttribute("data-id")) {
      case "true":
        if (emailOptIn.checked === false) {
          data.emailOptIn = emailOptIn.checked;
          upload = true;
        }
        break;
      case "false":
        if (emailOptIn.checked === true) {
          data.emailOptIn = emailOptIn.checked;
          upload = true;
        }
        break;
      default:
        console.log(emailOptIn.checked);
    }

    if (upload) {
      fetch(`/api/user/${id.getAttribute("data-id")}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }).then(response => console.log(response));
      console.log(data);
    }
  },
  false
);

document.querySelector("#logout").addEventListener("click", () => {
  fetch("/api/logout").then(response => {
    if (!response.ok) {
      modal.style.display = "block";
    } else {
      window.location.replace("/");
    }
  });
});

document.querySelector("#delete").addEventListener(
  "click",
  () => {
    document.querySelector("#myModal").style.display = "block";
  },
  false
);

document.querySelector("#delete-confirm").addEventListener(
  "click",
  () => {
    if (true) {
      fetch(`/api/user/${id.getAttribute("data-id")}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      }).then(response => console.log(response));
    }
  },
  false
);

const modal = document.querySelector("#myModal");
const span = document.querySelector("#modal-close");
span.addEventListener(
  "click",
  () => {
    modal.style.display = "none";
  },
  false
);

window.addEventListener(
  "click",
  event => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  },
  false
);
