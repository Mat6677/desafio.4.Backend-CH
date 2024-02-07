const express = require("express");
const handlebars = require("express-handlebars");
const { Server } = require("socket.io");
const viewsRouter = require("./routes/views.router.js");

const PORT = 8080;

const app = express();

app.use(express.static(`${__dirname}/public`));

app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

app.use("/", viewsRouter);

const server = app.listen(PORT, () => console.log("Listening on port " + PORT));

let products = [
  {
    id: 1,
    title: "Banana",
    price: 0.99,
  },
  {
    id: 2,
    title: "Apple",
    price: 1.49,
  },
  {
    id: 3,
    title: "Orange",
    price: 0.79,
  },
];

const io = new Server(server);
io.on("connection", (socket) => {
  console.log("connected");

  socket.emit("productList", products);

  socket.on("newProduct", (newProduct) => {
    products.push(newProduct);
    io.emit("productList", products);
  });

  socket.on("deleteProduct", (product) => {
    console.log(product);
    products = products.filter((p) => p.id != product.id);
    io.emit("productList", products);
  });
});
