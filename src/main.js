import { observarAuth } from "./firebase/auth.js";
import { adicionarItem } from "./firebase/database.js";

import "./ui/login.js";
import "./ui/lista.js";

const telaLogin = document.getElementById("login-tela");
const telaControle = document.getElementById("controle-tela");

// observarAuth(async (user) => {
//   if (user) {
//     console.log("Logado:", user.uid);

//     const token = await user.getIdTokenResult(true);

//     if (token.claims.role === "admin") {
//       console.log("É admin");
//     }
//     telaLogin.classList.remove("mostrar");
//     telaLogin.classList.add("esconder");
//     telaControle.classList.remove("esconder");
//     telaControle.classList.add("mostrar");
//   } else {
//     telaLogin.classList.remove("esconder");
//     telaLogin.classList.add("mostrar");
//     telaControle.classList.remove("mostrar");
//     telaControle.classList.add("esconder");

//     console.log("Nenhum usuário logado");
//   }
// });
