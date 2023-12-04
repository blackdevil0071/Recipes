const myForm = document.querySelector('#my-form');
const name = document.querySelector('#name');
const email = document.querySelector('#email');
const msg = document.querySelector('.msg');
const userList = document.querySelector('#users');

myForm.addEventListener('submit', onSubmit);

// Load user data from local storage and update UI
document.addEventListener('DOMContentLoaded', () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.forEach(user => {
        addUserToUI(user);
    });
});

function onSubmit(e) {
    e.preventDefault();

    if (name.value === '' || email.value === '') {
        msg.classList.add('error');
        msg.innerHTML = 'Please Enter All fields';
        setTimeout(() => msg.remove(), 3000);
    } else {
        // Retrieve existing users from local storage
        const users = JSON.parse(localStorage.getItem('users')) || [];

        // Create a new user object
        const newUser = {
            name: name.value,
            email: email.value
        };

        // Add the new user to the array of users
        users.push(newUser);

        // Update local storage with the new array of users
        localStorage.setItem('users', JSON.stringify(users));

        // Update the UI with the new user details and delete button
        addUserToUI(newUser);

        // Clear input fields
        name.value = '';
        email.value = '';
    }
}

function addUserToUI(user) {
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(`${user.name}: ${user.email}`));

    // Add delete button
    const btn = document.createElement('button');
    btn.appendChild(document.createTextNode('Delete'));
    btn.addEventListener('click', () => deleteUser(user));
    li.appendChild(btn);

    userList.appendChild(li);
}

function deleteUser(userToDelete) {
    // Remove the user from the UI
    const userListItems = document.querySelectorAll('#users li');
    userListItems.forEach(li => {
        const textContent = li.textContent || li.innerText;
        if (textContent.includes(`${userToDelete.name}: ${userToDelete.email}`)) {
            li.remove();
        }
    });

    // Remove the user from local storage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.filter(user => (
        user.name !== userToDelete.name || user.email !== userToDelete.email
    ));
    localStorage.setItem('users', JSON.stringify(updatedUsers));
}

