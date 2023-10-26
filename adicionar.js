const URL = "http://localhost:3000/produto/"

var idProduto = null
lerParametros()

function lerParametros(){
    const urlParams = new URLSearchParams(window.location.search);
    idProduto = urlParams.get("id")
    var titulo = urlParams.get("titulo")
    var descricao = urlParams.get("descricao")
    var preco = urlParams.get("preco")
    var img = urlParams.get("img")
    var tag = urlParams.get("tag")

    document.getElementById("campoTitulo").value = titulo
    document.getElementById("campoDescricao").value = descricao
    document.getElementById("campoPreco").value = preco
    document.getElementById("campoImg").value = img
    document.getElementById("campoTag").value = tag

}

var botaoAdicionar = document.getElementById("botaoAdicionar")
botaoAdicionar.addEventListener("click", function(){
    console.log("aqui");
    var tituloProduto = document.getElementById("campoTitulo").value
    var descricaoProduto =  document.getElementById("campoDescricao").value
    var precoProduto = document.getElementById("campoPreco").value
    var imgProduto = document.getElementById("campoImg").value
    var tagProduto = document.getElementById("campoTag").value

    if( idProduto != null ){
        enviaPUT(idProduto, tituloProduto, descricaoProduto, precoProduto, imgProduto, tagProduto)
    }else{
        enviaPOST( tituloProduto, descricaoProduto, precoProduto, imgProduto, tagProduto)
    }
})

function enviaPUT( id, tituloProduto, descricaoProduto, precoProduto, imgProduto, tagProduto){
    var header = {
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
            titulo:tituloProduto,
            descricao: descricaoProduto,
            preco: precoProduto,
            img: imgProduto,
            tag: tagProduto
        })
    }
    fetch(URL+id,header)
    .then(function(response){
        return response.json()
    }).then(function(data){
        window.location.href = 'adm.html';
    }).catch(function(){
        var mensagemErro = document.getElementById("erro")
        mensagemErro.style.display = "visible"
    })
}

function enviaPOST( tituloProduto, descricaoProduto, precoProduto, imgProduto, tagProduto){
    var header = {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
            titulo: tituloProduto,
            descricao: descricaoProduto,
            preco: precoProduto,
            img: imgProduto,
            tag: tagProduto
        })
    }
    fetch(URL,header)
    .then(function(response){
        return response.json()
    }).then(function(data){
        window.location.href = 'adm.html';
    }).catch(function(err){
        var mensagemErro = document.getElementById("erro")
        mensagemErro.style.display = "visible"
        console.log(err);
    })
}