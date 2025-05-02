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

    // Estado da aplicação
    const conjuntosSalvos = [];
    const carrosseis = document.querySelectorAll('.carrossel');
    const formAdicionarRoupa = document.getElementById('form-adicionar-roupa');
    const btnSalvarConjunto = document.querySelector('.btn-salvar-conjunto');

    // Inicialização dos Carrosséis
    function inicializarCarrosseis() {
        carrosseis.forEach(carrossel => {
            const container = carrossel.closest('.carrossel-container');
            const prevBtn = container.querySelector('.prev');
            const nextBtn = container.querySelector('.next');
            const items = carrossel.querySelectorAll('.item-roupa');
            let currentIndex = 0;
            const itemWidth = items[0].offsetWidth + 16;

            function updateCarrossel() {
                carrossel.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
            }

            prevBtn.addEventListener('click', () => {
                if (currentIndex > 0) {
                    currentIndex--;
                    updateCarrossel();
                }
            });

            nextBtn.addEventListener('click', () => {
                if (currentIndex < items.length - 1) {
                    currentIndex++;
                    updateCarrossel();
                }
            });
        });
    }

    // Gerenciamento de Seleção de Roupas
    function inicializarSelecaoRoupas() {
        const botoesSelecionar = document.querySelectorAll('.btn-selecionar');
        
        botoesSelecionar.forEach(botao => {
            botao.addEventListener('click', (e) => {
                const itemRoupa = e.target.closest('.item-roupa');
                const imagem = itemRoupa.querySelector('img');
                const categoria = itemRoupa.closest('.carrossel').dataset.categoria;
                
                const conjuntoItem = document.querySelector(`#conjunto-${categoria}`);
                const novaImagem = document.createElement('img');
                novaImagem.src = imagem.src;
                novaImagem.alt = imagem.alt;
                
                while (conjuntoItem.firstChild) {
                    conjuntoItem.removeChild(conjuntoItem.firstChild);
                }
                
                conjuntoItem.appendChild(novaImagem);
            });
        });
    }

    // Adição de Novas Roupas
    function inicializarFormularioAdicao() {
        formAdicionarRoupa.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const categoria = document.getElementById('categoria').value;
            const inputImagem = document.getElementById('imagem');
            const file = inputImagem.files[0];
            
            if (file) {
                const reader = new FileReader();
                
                reader.onload = (e) => {
                    const carrossel = document.querySelector(`.carrossel[data-categoria="${categoria}"]`);
                    const novoItem = document.createElement('div');
                    novoItem.className = 'item-roupa';
                    novoItem.innerHTML = `
                        <img src="${e.target.result}" alt="Nova Roupa">
                        <button class="btn-selecionar">Selecionar</button>
                    `;
                    
                    carrossel.appendChild(novoItem);
                    formAdicionarRoupa.reset();
                    
                    // Adiciona evento de seleção ao novo botão
                    novoItem.querySelector('.btn-selecionar').addEventListener('click', (e) => {
                        const itemRoupa = e.target.closest('.item-roupa');
                        const imagem = itemRoupa.querySelector('img');
                        const conjuntoItem = document.querySelector(`#conjunto-${categoria}`);
                        
                        while (conjuntoItem.firstChild) {
                            conjuntoItem.removeChild(conjuntoItem.firstChild);
                        }
                        
                        const novaImagem = document.createElement('img');
                        novaImagem.src = imagem.src;
                        novaImagem.alt = imagem.alt;
                        conjuntoItem.appendChild(novaImagem);
                    });
                };
                
                reader.readAsDataURL(file);
            }
        });
    }

    // Gerenciamento de Conjuntos Salvos
    function inicializarGerenciamentoConjuntos() {
        btnSalvarConjunto.addEventListener('click', () => {
            const conjunto = {
                camisa: document.querySelector('#conjunto-camisa img')?.src,
                calca: document.querySelector('#conjunto-calca img')?.src,
                tenis: document.querySelector('#conjunto-tenis img')?.src
            };
            
            if (conjunto.camisa && conjunto.calca && conjunto.tenis) {
                conjuntosSalvos.push(conjunto);
                atualizarConjuntosSalvos();
            } else {
                alert('Selecione todas as peças para salvar o conjunto!');
            }
        });
    }

    function atualizarConjuntosSalvos() {
        const conjuntosGrid = document.querySelector('.conjuntos-grid');
        conjuntosGrid.innerHTML = '';
        
        conjuntosSalvos.forEach((conjunto, index) => {
            const conjuntoCard = document.createElement('div');
            conjuntoCard.className = 'conjunto-card';
            conjuntoCard.innerHTML = `
                <div class="conjunto-card-visualizacao">
                    <img src="${conjunto.camisa}" alt="Camisa">
                    <img src="${conjunto.calca}" alt="Calça">
                    <img src="${conjunto.tenis}" alt="Tênis">
                </div>
                <button class="btn-remover-conjunto" data-index="${index}">Remover</button>
            `;
            
            conjuntosGrid.appendChild(conjuntoCard);
            
            conjuntoCard.querySelector('.btn-remover-conjunto').addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                conjuntosSalvos.splice(index, 1);
                atualizarConjuntosSalvos();
            });
        });
    }

    // Inicialização
    inicializarCarrosseis();
    inicializarSelecaoRoupas();
    inicializarFormularioAdicao();
    inicializarGerenciamentoConjuntos();

    // Adiciona animação suave ao rolar a página
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Adiciona efeito de fade-in nos elementos ao rolar
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.outfit-item').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(element);
    });
}); 