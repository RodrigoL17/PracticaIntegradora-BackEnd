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
            console.log("Response Headers:", res.headers);
            console.log("X-Message:", message);
  
            if (message === "Producto eliminado correctamente") {
              console.log("fire");
              window.location.reload();
            //   Swal.fire({
            //     position: "bottom-end",
            //     icon: "success",
            //     iconColor: "#6cc43a",
            //     text: "Product added successfully!",
            //     toast: true,
            //     background: "#e6f5dd",
            //     showConfirmButton: false,
            //     timer: 3000,
            //     timerProgressBar: true,
            //     color: "#6cc43a",
            //     padding: "0.5rem"
            //   });
            }
          })
          .catch((error) => {
            console.error("Error al enviar la petición:", error);
          });
      });
    });
  });
  