const socket = io();

const productLists = document.querySelectorAll(".productList");

socket.on("productList", (products) => {
  productLists.forEach((list) => {
    list.innerHTML = "";
    products.forEach((p) => {
      list.innerHTML += `name: ${p.title} <br/> price: ${p.price} <br/> id: ${p.id} <br/><br/>`;
    });
  });
});

const createForm = document.getElementById("productCreate");

createForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let form = e.target;
  let formData = {};

  new FormData(form).forEach((value, key) => (formData[key] = value));

  socket.emit("newProduct", formData);
});

const deleteForm = document.getElementById("productDelete");

deleteForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let form = e.target;
    let formData = {};
  
    new FormData(form).forEach((value, key) => (formData[key] = value));
  
    socket.emit("deleteProduct", formData);
  });