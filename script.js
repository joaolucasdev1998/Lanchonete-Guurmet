// Array para armazenar os itens do carrinho
const carrinho = [];

// Seleciona todos os botões de adicionar
const botoesAdicionar = document.querySelectorAll('.adicionar');

// Adiciona um evento de clique para cada botão do cardápio
botoesAdicionar.forEach((botao) => {
  botao.addEventListener('click', (event) => {
    // Encontra o bloco do produto correspondente ao botão clicado
    const cardProduto = event.target.closest('.produto');

    // Extrai o nome (h1) e o preço (p) de dentro do card
    const nome = cardProduto.querySelector('h1').innerText;
    const precoTexto = cardProduto.querySelector('p').innerText; // Ex: "R$27,00"

    // Limpa o texto do preço para transformar em número (ex: "R$27,00" vira 27.00)
    const precoLimpo = parseFloat(
      precoTexto.replace('R$', '').replace(',', '.')
    );

    // Cria o objeto do produto
    const produto = {
      nome: nome,
      preco: precoLimpo
    };

    // Adiciona o produto na lista do carrinho
    carrinho.push(produto);

    // Atualiza a interface do carrinho no <aside>
    atualizarCarrinho();
  });
});

// Função para atualizar a visualização do carrinho no HTML (<aside>)
function atualizarCarrinho() {
  const aside = document.querySelector('aside');
  
  // Se o carrinho estiver vazio, mostra o estado inicial
  if (carrinho.length === 0) {
    aside.innerHTML = `
      <h2>Seu pedido</h2>
      <p>Seu carrinho está vazio.</p>
      <p>Total: R$ 00,00</p>
      <button id="add">Finalizar pedido</button>
    `;
    return;
  }

  // Gera a lista de itens comprados e calcula o total
  let itensHtml = '<ul style="list-style: none; padding: 0; margin: 10px 0;">';
  let total = 0;

  carrinho.forEach((item) => {
    itensHtml += `<li style="margin-bottom: 5px;">${item.nome} - R$ ${item.preco.toFixed(2).replace('.', ',')}</li>`;
    total += item.preco;
  });

  itensHtml += '</ul>';

  // Atualiza o conteúdo do aside com a lista de itens e o total atualizado
  aside.innerHTML = `
    <h2>Seu pedido</h2>
    ${itensHtml}
    <p><strong>Total: R$ ${total.toFixed(2).replace('.', ',')}</strong></p>
    <button id="add">Finalizar pedido</button>
  `;

  // Opcional: Se quiser adicionar uma ação ao botão de finalizar pedido depois:
  document.querySelector('aside').addEventListener('click', (event) => {
  if (event.target.id === 'add') {
    if (carrinho.length === 0) {
      alert("Seu carrinho está vazio!");
    } else {
      alert("Pedido finalizado com sucesso! Obrigado pela preferência.");
    }
  }
});