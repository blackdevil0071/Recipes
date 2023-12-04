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

        // Check if editing or adding a new user
        const editingUser = myForm.getAttribute('data-edit-id');
        if (editingUser) {
            // Editing an existing user
            const editedUser = users.find(user => user.id === parseInt(editingUser));
            if (editedUser) {
                editedUser.name = name.value;
                editedUser.email = email.value;

                // Update local storage with the modified user data
                localStorage.setItem('users', JSON.stringify(users));

                // Update the UI with the modified user details
                updateUserInUI(editedUser);

                // Clear the editing flag
                myForm.removeAttribute('data-edit-id');

                // Clear input fields
                name.value = '';
                email.value = '';
            }
        } else {
            // Create a new user object
            const newUser = {
                id: new Date().getTime(), // Unique identifier (using timestamp)
                name: name.value,
                email: email.value
            };

            // Add the new user to the array of users
            users.push(newUser);

            // Update local storage with the new array of users
            localStorage.setItem('users', JSON.stringify(users));

            // Update the UI with the new user details and delete/edit buttons
            addUserToUI(newUser);

            // Clear input fields
            name.value = '';
            email.value = '';
        }
    }
}

function addUserToUI(user) {
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(`${user.name}: ${user.email}`));

    // Add delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.appendChild(document.createTextNode('Delete'));
    deleteBtn.addEventListener('click', () => deleteUser(user));
    li.appendChild(deleteBtn);

    // Add edit button
    const editBtn = document.createElement('button');
    editBtn.appendChild(document.createTextNode('Edit'));
    editBtn.addEventListener('click', () => editUser(user));
    li.appendChild(editBtn);

    userList.appendChild(li);
}

function updateUserInUI(user) {
    // Update the user in the UI
    const userListItems = document.querySelectorAll('#users li');
    userListItems.forEach(li => {
        const textContent = li.textContent || li.innerText;
        if (textContent.includes(`${user.name}: ${user.email}`)) {
            li.textContent = `${user.name}: ${user.email}`;
        }
    });
}

function editUser(userToEdit) {
    // Populate the form fields with user data
    name.value = userToEdit.name;
    email.value = userToEdit.email;

    // Set the editing flag on the form
    myForm.setAttribute('data-edit-id', userToEdit.id);
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
        user.id !== userToDelete.id
    ));
    localStorage.setItem('users', JSON.stringify(updatedUsers));
}
