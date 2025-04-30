// Carrinho de compras
let carrinho = [];

// Função para adicionar produto ao carrinho
function adicionarAoCarrinho(produto) {
    carrinho.push(produto);
    atualizarCarrinho();
    mostrarNotificacao('Produto adicionado ao carrinho!');
}

// Função para atualizar o carrinho
function atualizarCarrinho() {
    const carrinhoIcone = document.querySelector('.fa-shopping-cart');
    if (carrinho.length > 0) {
        carrinhoIcone.setAttribute('data-count', carrinho.length);
    }
}

// Função para mostrar notificação
function mostrarNotificacao(mensagem) {
    const notificacao = document.createElement('div');
    notificacao.className = 'notificacao';
    notificacao.textContent = mensagem;
    document.body.appendChild(notificacao);

    setTimeout(() => {
        notificacao.remove();
    }, 3000);
}

// Adicionar eventos aos botões de "Adicionar ao Carrinho"
document.addEventListener('DOMContentLoaded', () => {
    const botoesAdicionar = document.querySelectorAll('.btn');
    botoesAdicionar.forEach(botao => {
        botao.addEventListener('click', (e) => {
            const produtoCard = e.target.closest('.product-card');
            const produto = {
                nome: produtoCard.querySelector('.product-title').textContent,
                preco: produtoCard.querySelector('.product-price').textContent,
                imagem: produtoCard.querySelector('.product-image').src
            };
            adicionarAoCarrinho(produto);
        });
    });
}); 