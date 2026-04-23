import { database } from "./config.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  update,
  remove,
} from "https://www.gstatic.com/firebasejs/12.11.0/firebase-database.js";

const referencia = ref(database, "itens");

export async function adicionarItem(nome, data) {
  push(referencia, {
    nome: nome,
    data: data,
  });
}

onValue(referencia, (snapshot) => {
  const lista = document.getElementById("lista-itens");
  lista.innerHTML = "";

  if (!snapshot.exists()) return;

  snapshot.forEach((child) => {
    const item = child.val();
    const id = child.key;

    const li = document.createElement("li");

    const dataFormatada = new Date(item.data).toLocaleDateString("pt-BR");

    li.textContent = `${item.nome} - ${dataFormatada}`;

    lista.appendChild(li);
  });
});
