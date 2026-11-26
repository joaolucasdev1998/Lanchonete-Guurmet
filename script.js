
const carrinho = [];

// Seleciona os botões de adicionar
const botoesAdicionar = document.querySelectorAll('.adicionar');

// Adiciona produtos ao carrinho
botoesAdicionar.forEach((botao) => {
  botao.addEventListener('click', (event) => {
    const cardProduto = event.target.closest('.produto');

    const nome = cardProduto.querySelector('h1').innerText;
    const precoTexto = cardProduto.querySelector('p').innerText;

    const preco = parseFloat(
      precoTexto.replace('R$', '').replace(',', '.')
    );

    const produto = {
      id: Date.now() + Math.random(),
      nome: nome,
      preco: preco
    };

    carrinho.push(produto);

    atualizarCarrinho();
  });
});

// Evento do carrinho: finalizar e remover produtos
document.querySelector('aside').addEventListener('click', (event) => {

  // Verifica se clicou em remover
  if (event.target.classList.contains('remover')) {
    const id = Number(event.target.dataset.id);

    const indice = carrinho.findIndex((item) => item.id === id);

    if (indice !== -1) {
      carrinho.splice(indice, 1);
      atualizarCarrinho();
    }
  }

  // Verifica se clicou em finalizar
  if (event.target.id === 'add') {
    if (carrinho.length === 0) {
      alert('Seu carrinho está vazio!');
    } else {
      alert('Pedido finalizado com sucesso! Obrigado pela preferência.');
    }
  }

});

// Atualiza o carrinho na tela
function atualizarCarrinho() {

  const aside = document.querySelector('aside');

  if (carrinho.length === 0) {
    aside.innerHTML = `
      <h2>Seu pedido</h2>
      <p>Seu carrinho está vazio.</p>
      <p>Total: R$ 00,00</p>
      <button id="add">Finalizar pedido</button>
    `;
    return;
  }

  let itensHtml = '<ul style="list-style: none; padding: 0; margin: 10px 0;">';
  let total = 0;

  carrinho.forEach((item) => {

    itensHtml += `
      <li style="margin-bottom: 10px;">
        ${item.nome} - R$ ${item.preco.toFixed(2).replace('.', ',')}
        <button class="remover" data-id="${item.id}">Remover</button>
      </li>
    `;

    total += item.preco;

  });

  itensHtml += '</ul>';

  aside.innerHTML = `
    <h2>Seu pedido</h2>
    ${itensHtml}
    <p><strong>Total: R$ ${total.toFixed(2).replace('.', ',')}</strong></p>
    <button id="add">Finalizar pedido</button>
  `;

}
