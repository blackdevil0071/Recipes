const myForm = document.querySelector('#my-form')
const name = document.querySelector('#name')
const email = document.querySelector('#email')
const msg = document.querySelector('.msg')
const userList = document.querySelector('#users')

myForm.addEventListener('submit',onSubmit);
 

function onSubmit(e){
    e.preventDefault()

    if(name.value===''||email.value===''){
        msg.classList.add('error')
        msg.innerHTML = "Please Enter All fields"
        setTimeout(()=>msg.remove(),3000)
    }else{
        const li = document.createElement('li')
        li.appendChild(document.createTextNode(`${name.value}:${email.value}`))
        userList.appendChild(li)
        name.value=''
        email.value=''
    }
 }