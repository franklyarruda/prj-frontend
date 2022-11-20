
xhttp = new XMLHttpRequest();

var listaProduto;
var api = "https://projeto-frankly.herokuapp.com/api/produto/";

function listarProdutos(){

    xhttp.open("GET", api);
    xhttp.send();

    xhttp.onload = function(){
        listaProduto = this.responseText;
      //  console.log(listaProduto);
        listaProduto = JSON.parse(listaProduto);
       // console.log(listaProduto);

       

        texto = "";
        
        i = 0;
        for (const u of listaProduto){
            texto += `<tr onclick='editar(${i})'>
                        <td>${u.nome}</td>
                        <td>${u.descricao}</td>
                        <td>${u.valor}</td>
                        </tr>`;
            i++;
        }
        document.getElementById('listaproduto').innerHTML = texto;

    }
}

function editar(i){

    u = listaProduto[i];
    document.getElementById("id").value = u.id;
    document.getElementById("nome").value = u.produto;
    document.getElementById("descricao").value = u.descricao;
    document.getElementById("valor").value = u.valor;

}

function gravar(){
    alert("dentro de gravar");
    var produtos = {};
    produtos.id = document.getElementById("id").value;
    produtos.nome = document.getElementById("nome").value;
    produtos.descricao = document.getElementById("descricao").value;
    produtos.valor = document.getElementById("valor").value;
    
    

if (produtos.id > 0){
    acao = "PUT"; //alteração
} else {
    acao = "POST"; //incluir

}

xhttp.open(acao, api);
xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
xhttp.send(JSON.stringify(produtos));

xhttp.onload = function (){
    //console.log(this.responseText);
    listarProdutos();
    limpar();
}
}

function limpar(){
    document.getElementById("nome").value = "";
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
listarProdutos();

