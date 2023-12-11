const myForm = document.querySelector("#my-form");
const name = document.querySelector("#name");
const email = document.querySelector("#email");
const msg = document.querySelector(".msg");
const userList = document.querySelector("#users");

// Load user data from API and update UI
document.addEventListener("DOMContentLoaded", () => {
  fetchUsersFromAPI();
});

myForm.addEventListener("submit", onSubmit);

//GET METHOD
function fetchUsersFromAPI() {
  axios
    .get(
      "https://crudcrud.com/api/d9e68a7401654e82869aefbee2d66afa/appointmentData"
    )
    .then((res) => {
      const users = res.data;
      users.forEach((user) => {
        addUserToUI(user);
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

function onSubmit(e) {
  e.preventDefault();

  if (name.value === "" || email.value === "") {
    msg.classList.add("error");
    msg.innerHTML = "Please Enter All fields";
    setTimeout(() => msg.remove(), 3000);
  } else {
    const newUser = {
      name: name.value,
      email: email.value,
    };

    axios
      .post(
        "https://crudcrud.com/api/d9e68a7401654e82869aefbee2d66afa/appointmentData",
        newUser
      )
      .then((res) => {
        console.log(res.data);
        addUserToUI(res.data);
        name.value = "";
        email.value = "";
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

function addUserToUI(user) {
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(`${user.name}: ${user.email}`));

  const deleteBtn = document.createElement("button");
  deleteBtn.appendChild(document.createTextNode("Delete"));
  deleteBtn.addEventListener("click", () => deleteUser(user.id));
  li.appendChild(deleteBtn);

  const editBtn = document.createElement("button");
  editBtn.appendChild(document.createTextNode("Edit"));
  editBtn.addEventListener("click", () => editUser(user));
  li.appendChild(editBtn);

  userList.appendChild(li);
}

function updateUserInUI(user) {
  const userListItems = document.querySelectorAll("#users li");
  userListItems.forEach((li) => {
    const textContent = li.textContent || li.innerText;
    if (textContent.includes(`${user.name}: ${user.email}`)) {
      li.textContent = `${user.name}: ${user.email}`;
    }
  });
}
