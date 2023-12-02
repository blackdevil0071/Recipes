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


var listItem = document.getElementsByClassName('list-group-item')
console.log(listItem)
listItem[2].style.backgroundColor='green'
listItem[1].textContent="Hello"

for(let i=0;i<listItem.length;i++){
    listItem[i].style.fontWeight='bold'
}



//QUERY SELECTOR

var querySelector = document.querySelectorAll('.list-group-item')
querySelector[1].style.backgroundColor = 'green'


var odd = document.querySelectorAll('li:nth-child(odd)')
for(let i=0;i<odd.length;i++){
    odd[i].style.backgroundColor='red'
}