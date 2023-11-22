// Seleciona os elementos
var nomeProdutoInput = document.getElementById('nomeProduto');
var quantidadeProdutoInput = document.getElementById('quantidadeProduto');
var adicionarProdutoButton = document.getElementById('adicionarProduto');
var estoqueArea = document.querySelector('.estoque-area');

// Carrega os produtos do Local Storage
var produtos = JSON.parse(localStorage.getItem('produtos')) || [];
produtos.forEach(function(produto) {
    adicionarProduto(produto.nome, produto.quantidade);
});

// Adiciona o evento de clique ao botão
adicionarProdutoButton.addEventListener('click', function() {
    adicionarProduto(nomeProdutoInput.value, quantidadeProdutoInput.value);

    // Limpa os inputs
    nomeProdutoInput.value = '';
    quantidadeProdutoInput.value = '';
});

function adicionarProduto(nome, quantidade) {
    // Cria o card do produto
    var produtoDiv = document.createElement('div');
    produtoDiv.classList.add('produto');
    produtoDiv.innerHTML = `
        <p contenteditable="true" style="max-width: 198px; outline: none">${nome}</p>
        <p contenteditable="true" style="text-align: center; border-left: 1px solid gray; outline: none">${quantidade}</p>
        <button class="diminuir" id="menosBtn">-</button>
        <button class="excluir" id="excluirBtn"><i class="fas fa-trash"></i></button>
    `;

    // Adiciona o evento de clique ao botão de diminuir
    produtoDiv.querySelector('.diminuir').addEventListener('click', function() {
        var quantidade = parseInt(produtoDiv.querySelector('p:nth-child(2)').innerText);
        if (quantidade > 0) {
            quantidade--;
            produtoDiv.querySelector('p:nth-child(2)').innerText = quantidade;
        }
        atualizarLocalStorage();
    });

    // Adiciona o evento de clique ao botão de excluir
    produtoDiv.querySelector('.excluir').addEventListener('click', function() {
        var resposta = confirm('Você tem certeza que quer apagar?')
        if (resposta) {
        estoqueArea.removeChild(produtoDiv);
        atualizarLocalStorage();
        }
    });

    // Adiciona o produto ao estoque
    estoqueArea.appendChild(produtoDiv);

    // Atualiza o Local Storage
    atualizarLocalStorage();
}

function atualizarLocalStorage() {
    var produtos = Array.from(document.querySelectorAll('.produto')).map(function(produto) {
        return {
            nome: produto.querySelector('p:nth-child(1)').innerText,
            quantidade: produto.querySelector('p:nth-child(2)').innerText
        };
    });
    localStorage.setItem('produtos', JSON.stringify(produtos));
}
