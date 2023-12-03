var form = document.getElementById('addForm')
var itemList = document.getElementById('items')
form.addEventListener('submit',addItem)
itemList.addEventListener('click',removeItem)

function addItem(e){
    e.preventDefault()
    var newItem = document.getElementById('item').value

    var li = document.createElement('li')
    li.className = 'list-group-item'
    li.appendChild(document.createTextNode(newItem))
    
    var deleteBtn = document.createElement('button')
    deleteBtn.className = "btn btn-danger btn-sm float-right delete"
    deleteBtn.appendChild(document.createTextNode('X'))
    li.appendChild(deleteBtn)
    itemList.append(li)
}

function removeItem(e){
   
    if(e.target.classList.contains('delete')){
        console.log('1')
        if(confirm("Are You sure?")){
            var li = e.target.parentElement;
            itemList.removeChild(li)
        }
    }
}
