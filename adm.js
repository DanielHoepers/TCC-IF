const URL = "http://localhost:3000/produto/"
var listaProdutos = []

function iniciarTabela() {
    return `<div class="linhaProduto">
                <p class="itemTabela">Título</p>
                <p class="itemTabela">Descrição</p>
                <p class="itemTabela">Preço</p>
                <p class="itemTabela">Imagens</p>
                <p class="itemTabela">Tags</p>
                <p id="alterar" class="itemTabela">Alterar</p>
                <p id="excluir" class="itemTabela">Excluir</p>
            </div>`;
}

function criarLinhaProduto(produto) {
    return `<div class="linhaProduto">
    <p class="itemTabela">`+produto.titulo+`</p>
    <p class="itemTabela">`+produto.descricao+`</p>
    <p class="itemTabela">`+produto.preco+`</p>
    <p class="itemTabela">`+produto.img+`</p>
    <p class="itemTabela">`+produto.tag+`</p>
    <button id="alterar" class="itemTabela alterar" value=`+produto.id+`>Alterar</button>
    <button id="excluir" class="itemTabela excluir" value=`+produto.id+`><Excluir></button>`
}

function adicionarProduto() {
    var tabelaProduto = document.getElementById("tabelaProduto")
    tabelaProduto.innerHTML += iniciarTabela()
    for (let i = 0; i < listaProdutos.length; i++) {
        const produto = listaProdutos[i];
        tabelaProduto.innerHTML += criarLinhaProduto(produto)
    }
    cadastrarEventosExcluir()
    cadastrarEventosAlterar()
}

fetch(URL).then(function (response) {
    return response.json();
}).then(function (data) {
    listaProdutos = data
    adicionarProduto()
}).catch(function () {
    console.log("Houve algum problema!");
});

var botaoAdicionar = document.getElementById("botaoAdicionar")
console.log(botaoAdicionar);
botaoAdicionar.addEventListener("click", function () {
    window.location.href = 'adicionar.html'
})

function atualizarTela(id) {
    listaProdutos = listaProdutos.filter(p => p.id != id)
    var tabelaProduto = document.getElementById("tabelaProduto")
    tabelaProduto.innerHTML = ""
    adicionarProduto()
}

function realizarExclusao(id) {
    var header = {
        method: "DELETE"
    }
    fetch(URL + id, header)
        .then(function (response) {
            return response.text()
        }).then(function (data) {
            atualizarTela(id)
        }).catch(function (error) {
            alert("Erro ao deletar produto")
        })
}

function cadastrarEventosExcluir() {
    var excluir = document.getElementsByClassName("excluir")
    for (let i = 0; i < excluir.length; i++) {
        const l = excluir[i];
        l.addEventListener("click", function (event) {
            var id = event.target.value
            // alert(id)
            realizarExclusao(id)
        })
    }
}

function editarURL(url, id, titulo, descricao, preco, img, tag){
    return url+'?id='+id+'&titulo='+titulo+'&descricao='+descricao+'&preco='+preco+'&img='+img+'&tag='+tag
}

function cadastrarEventosAlterar() {
    var alterar = document.getElementsByClassName("alterar")
    for (let i = 0; i < alterar.length; i++) {
        const l = alterar[i];
        l.addEventListener("click", function (event) {       
            var id = event.target.value
            var produto = listaProdutos.find((produtoAtual)=>{
                produtoAtual.id == id
            })
            var titulo = produto.titulo
            var descricao =  produto.descricao
            var preco = produto.preco
            var img = produto.img
            var tag = produto.tag
            window.location.href = editarURL("adicionar.html", id, titulo, descricao, preco, img, tag);
        })
    }
}