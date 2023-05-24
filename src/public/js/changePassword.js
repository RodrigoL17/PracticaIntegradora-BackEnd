document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form-change-password");
  const inputPassword = document.querySelector(".password-change");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const token = this.dataset.token;
    const uid = this.dataset.userId;
    const password = inputPassword.value;
    const url = `http://localhost:3000/api/session/changePassword/${uid}`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
        token: token,
      }),
    }).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          const redirectUrl = data.redirectUrl;
          if (redirectUrl) {
            window.location.href = redirectUrl;
          }
          const successMessage = data.successMessage;
          if (successMessage) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              iconColor: "#6cc43a",
              text: "Password change succesfully!",
              toast: true,
              background: "#e6f5dd",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              color: "#6cc43a",
              padding: "0.5rem",
            }).then(() => {
              setTimeout(() => {
                window.location.href = "/";
              }, 1);
            });
          }
        });
      }
    });
  });
});
