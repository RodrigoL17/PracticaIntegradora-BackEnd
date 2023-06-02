document.addEventListener("DOMContentLoaded", () => {
  const formCreateProd = document.querySelector("#create-prod");
  const inputTitle = document.querySelector(".create-prod-title");
  const inputDescription = document.querySelector(".create-prod-description");
  const inputPrice = document.querySelector(".create-prod-price");
  const inputStock = document.querySelector(".create-prod-stock");
  const inputCategory = document.querySelector(".create-prod-category");
  const inputOwner = document.querySelector(".create-prod-owner");

  formCreateProd.addEventListener("submit", function (event) {
    event.preventDefault();
    const url = `http://localhost:3000/api/products`;

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: inputTitle.value,
        description: inputDescription.value,
        price: inputPrice.value,
        stock: inputStock.value,
        category: inputCategory.value,
        owner: inputOwner.value,
      }),
    })
      .then((res) => {
        const message = res.headers.get("X-Message");
        console.log("Response Headers:", res.headers);
        console.log("X-Message:", message);

        if (message === "Producto creado correctamente") {
          console.log("fire");
          Swal.fire({
            position: "bottom-end",
            icon: "success",
            iconColor: "#6cc43a",
            text: "Product created successfully!",
            toast: true,
            background: "#e6f5dd",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            color: "#6cc43a",
            padding: "0.5rem",
          })
          .then(() => {
            window.location.href = "/products";
          });
        }
      })
      .catch((error) => {
        console.error("Error al enviar la petición:", error);
      });
  });
});
