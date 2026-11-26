
// Array para armazenar os itens do carrinho
const carrinho = [];

// Seleciona todos os botões de adicionar
const botoesAdicionar = document.querySelectorAll('.adicionar');

// Adiciona um evento de clique para cada botão do cardápio
botoesAdicionar.forEach((botao) => {
  botao.addEventListener('click', (event) => {

    // Encontra o bloco do produto correspondente
    const cardProduto = event.target.closest('.produto');

    // Extrai o nome e o preço do produto
    const nome = cardProduto.querySelector('h1').innerText;
    const precoTexto = cardProduto.querySelector('p').innerText;

    // Transforma o preço em número
    const precoLimpo = parseFloat(
      precoTexto.replace('R$', '').replace(',', '.')
    );

    // Cria o objeto do produto
    const produto = {
      nome: nome,
      preco: precoLimpo
    };

    // Adiciona o produto ao carrinho
    carrinho.push(produto);

    // Atualiza o carrinho na tela
    atualizarCarrinho();
  });
});

// Evento de clique no botão finalizar
document.querySelector('aside').addEventListener('click', (event) => {

  if (event.target.id === 'add') {

    if (carrinho.length === 0) {
      alert("Seu carrinho está vazio!");
    } else {
      alert("Pedido finalizado com sucesso! Obrigado pela preferência.");
    }

  }

});

// Função para atualizar o carrinho
function atualizarCarrinho() {

  const aside = document.querySelector('aside');

  // Verifica se o carrinho está vazio
  if (carrinho.length === 0) {

    aside.innerHTML = `
      <h2>Seu pedido</h2>
      <p>Seu carrinho está vazio.</p>
      <p>Total: R$ 00,00</p>
      <button id="add">Finalizar pedido</button>
    `;

    return;
  }

  // Cria a lista de produtos e calcula o total
  let itensHtml = '<ul style="list-style: none; padding: 0; margin: 10px 0;">';

  let total = 0;

  carrinho.forEach((item) => {

    itensHtml += `<li style="margin-bottom: 5px;">${item.nome} - R$ ${item.preco.toFixed(2).replace('.', ',')}</li>`;

    total += item.preco;

  });

  itensHtml += '</ul>';

  // Atualiza o conteúdo do carrinho
  aside.innerHTML = `
    <h2>Seu pedido</h2>
    ${itensHtml}
    <p><strong>Total: R$ ${total.toFixed(2).replace('.', ',')}</strong></p>
    <button id="add">Finalizar pedido</button>
  `;

}
