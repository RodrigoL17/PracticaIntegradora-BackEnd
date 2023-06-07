document.addEventListener("DOMContentLoaded", () => {
  const plusBtn = document.querySelector(".plus-quantity");
  const minusBtn = document.querySelector(".minus-quantity");
  const inputQuantity = document.querySelector(".quantity");
  const btnAddToCart = document.querySelector("#add-prod");
  const btnDelete = document.querySelector(".delete-btn");
  const btnEdit = document.querySelector(".edit-btn");

  if (plusBtn) {
    plusBtn.addEventListener("click", () => {
      let contador = parseInt(inputQuantity.value);
      if (contador < 99) contador++;
      inputQuantity.value = contador;
    });
  }

  if (minusBtn) {
    minusBtn.addEventListener("click", () => {
      let contador = parseInt(inputQuantity.value);
      if (contador > 1) contador--;
      inputQuantity.value = contador;
    });
  }

  if (btnAddToCart) {
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
        body: JSON.stringify({ quantity: quantity }),
      })
        .then((res) => {
          const message = res.headers.get("X-Message");
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
  }

  if (btnDelete) {
    btnDelete.addEventListener("click", function (e) {
      e.preventDefault();
      const productId = this.dataset.productId;
      const url = `http://localhost:3000/api/products/${productId}`;
      fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          const message = res.headers.get("X-Message");
          if (message === "Producto eliminado correctamente") {
            Swal.fire({
              position: "bottom-end",
              icon: "success",
              iconColor: "#FF0000",
              text: "Product deleted succesfully!",
              toast: true,
              background: "#FEEBEB",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              color: "#FF0000",
              padding: "0.5rem",
            })
              .then(() => {
                window.location.href = "/products";
              })
              .catch((error) => {
                console.log(error);
              });
          }
        })
        .catch((error) => {
          console.error("Error al enviar la petición:", error);
        });
    });
    btnEdit.addEventListener("click", function () {});
  }
});
