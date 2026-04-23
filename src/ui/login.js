import { login, cadastrar, logout } from "../firebase/auth.js";

const botaoLogin = document.getElementById("login-botao");
const botaoLogout = document.getElementById("logout-botao");

const inputEmail = document.getElementById("email");
const inputSenha = document.getElementById("senha");

botaoLogin.addEventListener("click", fazerLogin);
botaoLogout.addEventListener("click", async () => {
  await logout();

  console.log("Usuário deslogado");
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
    console.log("Login OK");
    return;
  } catch (err) {
    console.log(err.code);

    const resposta = confirm("Usuário não encontrado. Deseja cadastrar?");
    if (!resposta) return;

    try {
      await cadastrar(email, senha);
      alert("Usuário cadastrado com sucesso.");
    } catch (e) {
      alert(`Erro ao criar conta: ${e.message}`);
    }
  } finally {
    inputEmail.value = "";
    inputSenha.value = "";
  }
}
