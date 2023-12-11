const myForm = document.querySelector('#my-form');
const name = document.querySelector('#name');
const email = document.querySelector('#email');
const msg = document.querySelector('.msg');
const userList = document.querySelector('#users');

// Load user data from API and update UI
document.addEventListener('DOMContentLoaded', () => {
    fetchUsersFromAPI();
});

myForm.addEventListener('submit', onSubmit);

function fetchUsersFromAPI() {
    axios.get("https://crudcrud.com/api/75bc84b65bac4282adc1ab2a4ff575dc/appointmentData")
        .then((res) => {
            console.log(res.data)
            const users = res.data;
            users.forEach(user => {
                addUserToUI(user);
            });
        })
        .catch((err) => {
            console.log(err);
        });
}

function onSubmit(e) {
    e.preventDefault();

    if (name.value === '' || email.value === '') {
        msg.classList.add('error');
        msg.innerHTML = 'Please Enter All fields';
        setTimeout(() => msg.remove(), 3000);
    } else {
            const newUser = {
                name: name.value,
                email: email.value
            };

            axios.post("https://crudcrud.com/api/75bc84b65bac4282adc1ab2a4ff575dc/appointmentData", newUser)
                .then((res) => {
                    console.log(res.data);
                    addUserToUI(res.data);
                    name.value = '';
                    email.value = '';
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }


function addUserToUI(user) {
    const li = document.createElement('li');
    li.setAttribute('data-id', user._id);
    li.appendChild(document.createTextNode(`${user.name}: ${user.email}`));

    const deleteBtn = document.createElement('button');
    deleteBtn.appendChild(document.createTextNode('Delete'));
    deleteBtn.addEventListener('click', () => deleteUser(user._id));
    li.appendChild(deleteBtn);

    userList.appendChild(li);
}

function updateUserInUI(user) {
    const userListItems = document.querySelectorAll('#users li');
    userListItems.forEach(li => {
        const textContent = li.textContent || li.innerText;
        if (textContent.includes(`${user.name}: ${user.email}`)) {
            li.textContent = `${user.name}: ${user.email}`;
        }
    });
}


function deleteUser(_id) {
    axios.delete(`https://crudcrud.com/api/75bc84b65bac4282adc1ab2a4ff575dc/appointmentData/${_id}`)
        .then((res) => {
            console.log(res.data);
            const deletedUser = document.querySelector(`#users li[data-id="${_id}"]`);
            deletedUser.remove();
        })
        .catch((err) => {
            console.log(err);
        });
}



