const myForm = document.querySelector('#my-form');
const name = document.querySelector('#name');
const email = document.querySelector('#email');
const msg = document.querySelector('.msg');
const userList = document.querySelector('#users');

myForm.addEventListener('submit', onSubmit);

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

        // Update the UI with the new user details
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(`${newUser.name}: ${newUser.email}`));
        userList.appendChild(li);

        // Clear input fields
        name.value = '';
        email.value = '';
    }
}
