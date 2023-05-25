document.addEventListener("DOMContentLoaded", () => {
    const delButtons = document.querySelectorAll(".remove-prod-btn");
    delButtons.forEach((btn) => {
      btn.addEventListener("click",function (event) {
        event.preventDefault();
  
        const cartId = this.dataset.cartId
        const productId = this.dataset.productId
        const url = `http://localhost:3000/api/carts/${cartId}/product/${productId}`;
  
        fetch(url, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
            const message = res.headers.get("X-Message");
            if (message === "Producto eliminado correctamente") {
              window.location.reload();
            }
          })
          .catch((error) => {
            console.error("Error al enviar la petición:", error);
          });
      });
    });
  });
  