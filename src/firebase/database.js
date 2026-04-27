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

export async function adicionarItem(nome) {
  push(referencia, {
    nome: nome,
    data: Date.now(),
  });
}

export async function lerItens(callback) {
  onValue(referencia, (snapshot) => {
    callback(snapshot);
  });
}

export async function removerItem(id) {
  remove(ref(database, "itens/" + id));
}
