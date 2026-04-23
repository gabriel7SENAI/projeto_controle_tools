import { adicionarItem } from "../firebase/database.js";

const listaItens = document.getElementById("lista-itens");
const botaoAdicionar = document.getElementById("botao-adicionar");
let itemNome = document.getElementById("item-nome");
let itemData = document.getElementById("item-data");
let pesquisarItem = document.getElementById("pesquisa");

botaoAdicionar.addEventListener("click", () => {
  let nome = itemNome.value;
  let data = new Date(itemData);

  adicionarItem(nome, data);

  console.log("item adicionado");
});
