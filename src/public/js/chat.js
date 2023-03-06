const socketClient = io();

const User = document.getElementById("user-mail");
const Form = document.getElementById("form");
const Message = document.getElementById("message");
const ChatMessages = document.getElementById("chat");

let user = null;

if (!user) {
  Swal.fire({
    title: "Bienvenido",
    text: "Ingresa tu mail",
    input: "email",
    inputValidator: (value) => {
      if (!value) {
        return "Necesitas ingresar un mail";
      }
    },
  }).then((userMail) => {
    usuario = userMail.value;
    User.innerText = usuario;
    socketClient.emit("newUser", usuario);
  });
}

Form.onsubmit = (e) => {
  e.preventDefault();

  const info = {
    user: usuario,
    message: Message.value,
  };

  socketClient.emit("message", info);
  Message.value = "";
};

socketClient.on("chat", (chatM) => {
  console.log(chatM);
  const messages = chatM[0].messages.map((message) => {
    return `<p><strong>"${message.user}"</strong>  : ${message.message}`;
  });
  ChatMessages.innerHTML = messages;
});
