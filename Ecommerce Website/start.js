var myForm = document.querySelector("#my-form");
const price = document.querySelector("#price");
const name = document.querySelector("#name");
const userList = document.querySelector("#users");
const totalPriceDisplay = document.querySelector("#total-price")
const msg = document.querySelector(".msg");
let totalPrice = 0

document.addEventListener("DOMContentLoaded", fetchProducts);
myForm.addEventListener("submit", onSubmit);

function fetchProducts() {
  axios
    .get("https://crudcrud.com/api/2fe99194e5eb4fb1814967fb749ca3a3/products")
    .then((res) => {
      console.log(res.data);
      let products = res.data;

      products.forEach((product) => {
        addProductsToUI(product);
        updateTotalPrice(product.price)
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

function onSubmit(e) {
  e.preventDefault();
  if (name.value === "" || price.value === "") {
    msg.innerHTML = "Please fill all fields";
  } else {
    const newProduct = {
      price: parseFloat(price.value),
      name: name.value,
    };
    axios
      .post(
        "https://crudcrud.com/api/2fe99194e5eb4fb1814967fb749ca3a3/products",
        newProduct
      )
      .then((res) => {
        console.log(res.data);
        addProductsToUI(res.data);
        updateTotalPrice(res.data.price)
        price.value = "";
        name.value = "";
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

function addProductsToUI(product) {
  const li = document.createElement("li");
  li.setAttribute('data-id', product._id);
  li.appendChild(
    document.createTextNode(`${product.price}  -  ${product.name}`)
  );

  const deleteBtn = document.createElement("button");
deleteBtn.appendChild(document.createTextNode("Delete"));
deleteBtn.addEventListener("click", () => deleteProduct(product._id, product.price));
li.appendChild(deleteBtn);



  userList.appendChild(li);
}

function deleteProduct(_id, productPrice) {
    axios
      .delete(
        `https://crudcrud.com/api/2fe99194e5eb4fb1814967fb749ca3a3/products/${_id}`
      )
      .then((res) => {
        console.log(res.data);
        const deletedProduct = document.querySelector(`#users li[data-id="${_id}"]`)
        deletedProduct.remove()
        updateTotalPrice(-productPrice);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  
function updateTotalPrice(amount){
    totalPrice = Number(totalPrice)+Number(amount)
    totalPriceDisplay.textContent = `Total Value Worth of Products : $${totalPrice}`
}