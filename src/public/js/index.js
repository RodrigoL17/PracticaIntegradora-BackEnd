const socketClient = io();

//RealtimeProducts
const prodList = document.getElementById("products-list");

socketClient.on("products", (products) => {
  const prods = products.map((prod) => {
    return `<li>
        <p>id:${prod._id} , titulo: ${prod.title}, descripcion: ${prod.description}, codigo: ${prod.code}, precio: ${prod.price}, stock: ${prod.stock}, categoria: ${prod.category}</p>
    </li>`;
  });
  prodList.innerHTML = prods;
});




