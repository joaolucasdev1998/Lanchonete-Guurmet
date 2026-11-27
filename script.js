

const carrinho = [];

// Número do WhatsApp da lanchonete.
// Troque pelo número real, incluindo DDI e DDD.
const numeroWhatsApp = "5511999999999";

// Selecionando os elementos do HTML
const conteudo = document.querySelector(".conteudo");
const itensCarrinho = document.querySelector("#itens-carrinho");
const totalElemento = document.querySelector("#total");
const botaoFinalizar = document.querySelector("#finalizar");

// Formatando valores em reais
function formatarPreco(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// Adicionando produtos ao carrinho
conteudo.addEventListener("click", (event) => {

    const botao = event.target.closest(".adicionar");

    if (!botao) return;

    const card = botao.closest(".produto");

    const id = card.dataset.id;
    const nome = card.dataset.name;
    const preco = Number(card.dataset.price);

    const produtoExistente = carrinho.find((item) => item.id === id);

    if (produtoExistente) {

        produtoExistente.quantidade++;

    } else {

        const produto = {
            id: id,
            nome: nome,
            preco: preco,
            quantidade: 1
        };

        carrinho.push(produto);

    }

    atualizarCarrinho();

});

// Atualizando o carrinho na tela
function atualizarCarrinho() {

    if (carrinho.length === 0) {

        itensCarrinho.innerHTML = `
            <p class="vazio">Seu carrinho está vazio.</p>
        `;

        totalElemento.textContent = formatarPreco(0);

        return;
    }

    let total = 0;

    itensCarrinho.innerHTML = carrinho.map((item) => {

        const subtotal = item.preco * item.quantidade;

        total += subtotal;

        return `
            <div class="item-carrinho">

                <div class="item-info">
                    <span>${item.nome}</span>
                    <span>${formatarPreco(subtotal)}</span>
                </div>

                <div class="item-controles">

                    <button
                        data-action="diminuir"
                        data-id="${item.id}"
                        aria-label="Diminuir quantidade"
                    >-</button>

                    <span>${item.quantidade}</span>

                    <button
                        data-action="aumentar"
                        data-id="${item.id}"
                        aria-label="Aumentar quantidade"
                    >+</button>

                    <button
                        class="remover"
                        data-action="remover"
                        data-id="${item.id}"
                    >Remover</button>

                </div>

            </div>
        `;

    }).join("");

    totalElemento.textContent = formatarPreco(total);

}

// Controlando os botões do carrinho
itensCarrinho.addEventListener("click", (event) => {

    const botao = event.target.closest("button");

    if (!botao) return;

    const id = botao.dataset.id;
    const acao = botao.dataset.action;

    const indice = carrinho.findIndex((item) => item.id === id);

    if (indice === -1) return;

    const produto = carrinho[indice];

    if (acao === "aumentar") {

        produto.quantidade++;

    }

    if (acao === "diminuir") {

        produto.quantidade--;

        if (produto.quantidade === 0) {
            carrinho.splice(indice, 1);
        }

    }

    if (acao === "remover") {

        carrinho.splice(indice, 1);

    }

    atualizarCarrinho();

});

// Calculando o total do pedido
function calcularTotal() {

    let total = 0;

    carrinho.forEach((item) => {

        total += item.preco * item.quantidade;

    });

    return total;

}

// Finalizando o pedido pelo WhatsApp
botaoFinalizar.addEventListener("click", () => {

    if (carrinho.length === 0) {

        alert("Seu carrinho está vazio!");

        return;
    }

    if (!/^\d{12,13}$/.test(numeroWhatsApp)) {

        alert("Configure o número do WhatsApp da lanchonete no script.js.");

        return;
    }

    let mensagem = "Olá! Gostaria de fazer este pedido:\n\n";

    carrinho.forEach((item) => {

        mensagem += `${item.quantidade}x ${item.nome}`;
        mensagem += ` - ${formatarPreco(item.preco * item.quantidade)}\n`;

    });

    mensagem += `\nTotal: ${formatarPreco(calcularTotal())}`;

    const link = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;

    window.open(link, "_blank");

});

// Inicializando o carrinho
atualizarCarrinho();
