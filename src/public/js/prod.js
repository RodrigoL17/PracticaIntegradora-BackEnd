document.addEventListener("DOMContentLoaded", () => {
  const plusBtn = document.querySelector(".plus-quantity");
  const minusBtn = document.querySelector(".minus-quantity");
  const inputQuantity = document.querySelector(".quantity");
  const btnAddToCart = document.querySelector("#add-prod");

  plusBtn.addEventListener("click", () => {
    let contador = parseInt(inputQuantity.value);
    if (contador < 99) contador++;
    inputQuantity.value = contador;
  });

  minusBtn.addEventListener("click", () => {
    let contador = parseInt(inputQuantity.value);
    if (contador > 1) contador--;
    inputQuantity.value = contador;
  });

  btnAddToCart.addEventListener("click", function (e) {
    e.preventDefault();
    const cartId = this.dataset.cartId;
    const productId = this.dataset.productId;
    const quantity = parseInt(inputQuantity.value);
    const url = `http://localhost:3000/api/carts/${cartId}/product/${productId}`;
    console.log(cartId, productId, quantity);

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({quantity:quantity})
    })
      .then((res) => {
        const message = res.headers.get("X-Message");
        console.log("Response Headers:", res.headers);
        console.log("X-Message:", message);

        if (message === "Producto agregado correctamente") {
          console.log("fire");
          Swal.fire({
            position: "bottom-end",
            icon: "success",
            iconColor: "#6cc43a",
            text: "Product added successfully!",
            toast: true,
            background: "#e6f5dd",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            color: "#6cc43a",
            padding: "0.5rem",
          });
        }
      })
      .catch((error) => {
        console.error("Error al enviar la petición:", error);
      });
  });
});
