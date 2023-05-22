document.addEventListener("DOMContentLoaded", () => {
  const forms = document.querySelectorAll(".add-to-cart");
  forms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const url = form.action;

      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
              padding: "0.5rem"
            });
          }
        })
        .catch((error) => {
          console.error("Error al enviar la petición:", error);
        });
    });
  });
});
