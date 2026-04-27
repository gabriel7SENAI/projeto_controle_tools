import { adicionarItem, lerItens, removerItem } from "../firebase/database.js";

const listaItens = document.getElementById("lista-itens");
const botaoAdicionar = document.getElementById("botao-adicionar");
let itemNome = document.getElementById("item-nome");
let pesquisarItem = document.getElementById("pesquisa");

let dados = [];
let textoPesquisa = "";

pesquisarItem.addEventListener("input", () => {
  textoPesquisa = pesquisarItem.value.toLowerCase();
  renderizar();
});

botaoAdicionar.addEventListener("click", () => {
  if (window.isAdmin) {
    let nome = itemNome.value.trim();
    let data = Date.now();

    if (!nome || !data) {
      alert("insira todos dados");
      return;
    }
    adicionarItem(nome);
    alert(`item ${nome} adicionado.`);

    itemNome.value = "";
  } else {
    alert("apenas admins podem adicionar itens à lista");
  }
});

lerItens((snapshot) => {
  dados = [];

  if (!snapshot.exists()) {
    dados = [];
    renderizar();
    return;
  }

  snapshot.forEach((child) => {
    dados.push({
      item: child.val(),
      id: child.key,
    });
  });
  renderizar();
});

export function renderizar() {
  listaItens.innerHTML = "";

  dados.forEach(({ item, id }) => {
    if (!item.nome || !item.nome.toLowerCase().includes(textoPesquisa)) return;

    const li = document.createElement("li");

    const spanNome = document.createElement("span");
    spanNome.className = "nome";
    spanNome.textContent = item.nome;

    const spanData = document.createElement("span");
    spanData.className = "data";
    spanData.textContent = new Date(item.data).toLocaleString();

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
