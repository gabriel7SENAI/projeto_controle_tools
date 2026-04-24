import { adicionarItem, lerItens, removerItem } from "../firebase/database.js";

const listaItens = document.getElementById("lista-itens");
const botaoAdicionar = document.getElementById("botao-adicionar");
let itemNome = document.getElementById("item-nome");
let itemData = document.getElementById("item-data");
let pesquisarItem = document.getElementById("pesquisa");

let dados = [];
let textoPesquisa = "";

pesquisarItem.addEventListener("input", () => {
  textoPesquisa = pesquisarItem.value.toLowerCase();
  renderizar();
});
botaoAdicionar.addEventListener("click", () => {
  let nome = itemNome.value;
  let data = itemData.value;

  adicionarItem(nome, data);
  alert(`item ${nome} adicionado.`);

  console.log("item adicionado");

  itemNome.value = "";
  itemData.value = "";
});

lerItens((snapshot) => {
  dados = [];

  if (!snapshot.exists()) {
    listaItens.innerHTML = "";
    return;
  }

  snapshot.forEach((child) => {
    dados.push({
      item: child.val(),
      id: child.key,
    });
  });
});

export function renderizar() {
  listaItens.innerHTML = "";

  dados.forEach(({ item, id }) => {
    if (!item.nome || !item.nome.toLowerCase().includes(textoPesquisa)) return;

    const dataFormatada =
      typeof item.data === "string"
        ? item.data.split("-").reverse().join("/")
        : "Sem data";

    const li = document.createElement("li");

    const spanNome = document.createElement("span");
    spanNome.className = "nome";
    spanNome.textContent = item.nome;

    const spanData = document.createElement("span");
    spanData.className = "data";
    spanData.textContent = dataFormatada;

    let btnRemover = null;

    if (window.isAdmin) {
      btnRemover = document.createElement("button");
      btnRemover.className = "remover";
      btnRemover.textContent = "Remover";

      btnRemover.addEventListener("click", () => {
        const resposta = confirm(`Deseja remover o item ${item.nome}?`);
        if (!resposta) return;

        removerItem(id);
      });
    }

    li.appendChild(spanNome);
    li.appendChild(spanData);
    if (btnRemover) {
      li.appendChild(btnRemover);
    }

    listaItens.appendChild(li);
  });
}