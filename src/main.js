import { observarAuth } from "./firebase/auth.js";
import { renderizar } from "./ui/lista.js";

import "./ui/login.js";
import "./ui/lista.js";

const telaLogin = document.getElementById("login-tela");
const telaControle = document.getElementById("controle-tela");

window.isAdmin = false;

observarAuth(async (user) => {
  if (user) {
    const token = await user.getIdTokenResult();
    const isAdmin = token.claims.role === "admin";

    window.isAdmin = isAdmin;
    renderizar();

    telaLogin.classList.remove("mostrar");
    telaLogin.classList.add("esconder");
    telaControle.classList.remove("esconder");
    telaControle.classList.add("mostrar");
  } else {
    telaLogin.classList.remove("esconder");
    telaLogin.classList.add("mostrar");
    telaControle.classList.remove("mostrar");
    telaControle.classList.add("esconder");
  }
});
