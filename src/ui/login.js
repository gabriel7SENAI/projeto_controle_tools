import { login, cadastrar, logout } from "../firebase/auth.js";

const botaoLogin = document.getElementById("login-botao");
const botaoLogout = document.getElementById("logout-botao");
const inputEmail = document.getElementById("email");
const inputSenha = document.getElementById("senha");

botaoLogin.addEventListener("click", fazerLogin);
botaoLogout.addEventListener("click", async () => {
  await logout();
});

async function fazerLogin() {
  const email = inputEmail.value;
  const senha = inputSenha.value;

  if (!email || !senha) {
    alert("Insira todos dados primeiro.");
    return;
  }

  try {
    await login(email, senha);
    location.reload();
  } catch (err) {
    console.log(err.code);

    if (
      err.code === "auth/user-not-found" ||
      err.code === "auth/invalid-credential"
    ) {
      const resposta = confirm("Usuário não encontrado. Deseja cadastrar?");
      if (!resposta) return;

      try {
        await cadastrar(email, senha);
        alert("Usuário cadastrado com sucesso.");
      } catch (e) {
        alert(`Erro ao criar conta: ${e.message}`);
      }
    } else {
      alert("Erro ao fazer login: " + err.message);
    }
  } finally {
    inputEmail.value = "";
    inputSenha.value = "";
  }
}
