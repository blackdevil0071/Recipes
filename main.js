// console.dir(document)
// console.log(document.all)
// console.log(document.title)
// console.log(document.all[6])
// // document.all[8].textContent = "Hello"
// console.log(document.forms)

// const headerTitle = document.getElementById('header-title')
// console.log(headerTitle)
// console.log(headerTitle.textContent = "Hello World ")
// console.log(headerTitle.innerHTML = "Hello World")
// console.log(headerTitle)


// var listItem = document.getElementsByClassName('list-group-item')
// console.log(listItem)
// listItem[2].style.backgroundColor='green'
// listItem[1].textContent="Hello"

// for(let i=0;i<listItem.length;i++){
//     listItem[i].style.fontWeight='bold'
// }



// //QUERY SELECTOR

// var querySelector = document.querySelectorAll('.list-group-item')
// querySelector[1].style.backgroundColor = 'green'


// var odd = document.querySelectorAll('li:nth-child(odd)')
// for(let i=0;i<odd.length;i++){
//     odd[i].style.backgroundColor='red'
// }


// Parent Child Node

var ListItems = document.querySelector('#items')
// ListItems.parentNode.style.backgroundColor='yellow'
// ListItems.parentNode.parentNode.style.backgroundColor='red' 
console.log(ListItems.childNodes) //returns everythin inclusing label, span
console.log(ListItems.children) //just elements 
console.log(ListItems.firstChild)
console.log(ListItems.firstElementChild)
ListItems.firstElementChild.innerHTML = "Hello"

var itemList = document.querySelector('#items')
console.log(itemList.lastChild)
console.log(itemList.lastElementChild)
itemList.lastElementChild.innerHTML = "Last Child Element"

var sibling =document.getElementById('items')
console.log(sibling.nextElementSibling)
console.log(sibling.nextSibling)


// create Elements
var newDiv = document.createElement('div')

newDiv.className = "div-class"
newDiv.id = "div-id"
newDiv.setAttribute('title',"Hello Div")

var newDivText = document.createTextNode("Hello World")
newDiv.appendChild(newDivText)
console.log(newDiv)



var container = document.querySelector('header .container')
var h1 = document.querySelector('header h1')
container.insertBefore(newDiv,h1)

newDiv.style.fontSize = '30px'