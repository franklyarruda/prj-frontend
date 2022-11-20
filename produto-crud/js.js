
xhttp = new XMLHttpRequest();

var listaProduto;
var api = "https://projeto-frankly.herokuapp.com/api/produto/";

function listarProdutos(){

    xhttp.open("GET", api);
    xhttp.send();

    xhttp.onload = function(){
        listaProduto = this.responseText;
        listaProduto = JSON.parse(listaProduto);
       

        texto = "";
        
        i = 0;
        for (const u of listaProduto){
            texto += `<tr onclick='editar(${i})'>
                        <td>${u.produto}</td>
                        <td>${u.descricao}</td>
                        <td>${u.valor}</td>
                        </tr>`;
            i++;
        }
        document.getElementById('listaProduto').innerHTML = texto;

    }
}

function editar(i){

    u = listaProduto[i];
    document.getElementById("produto").value = u.produto;
    document.getElementById("descricao").value = u.descricao;
    document.getElementById("valor").value = u.valor;
    document.getElementById("id").value = u.id;

}

function gravar(){

    var produtos = {};
    produtos.produto = document.getElementById("produto").value;
    produtos.descricao = document.getElementById("descricao").value;
    produtos.valor = document.getElementById("valor").value;
    produtos.id = document.getElementById("id").value;

if (produtos.id > 0){
    acao = "PUT"; //alteração
} else {
    acao = "POST"; //incluir

}

xhttp.open(acao, "api");
xhttp.setResquestHeader("Content-type", "application/json;charset=UTF-8");
xhttp.send(JSON.stringify(produtos));
xhttp.onload = function (){
    listarProdutos();
    limpar();
}
}

function limpar(){
    document.getElementById("produto").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("valor").value = "";
    document.getElementById("id").value = "";
}

function apagar(){
    id = document.getElementById("id").value;
    xhttp.open("DELETE", api + id);
    xhttp.send();
    xhttp.onload = function(){

        alert(this.responseText);
        listarProdutos();
        limpar();
    }
}
listaProduto();

