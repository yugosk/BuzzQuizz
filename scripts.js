function solicitarQuizzes(){

    const promisse = axios.get("https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes");
    promisse.then(renderizarQuizzes);

    promisse.catch(function erro(erro){
        alert(`Erro ${erro.data}. Por favor, atualize a página!`);
    });
}
solicitarQuizzes();

function renderizarQuizzes(objetoQuizzes){

    for(let i = 0; i < objetoQuizzes.data.length; i++){
    document.querySelector("main section").innerHTML += `
    
    <div>
        <div class="gradiente"></div>
        <img src="${objetoQuizzes.data[i].image}" id="${objetoQuizzes.data[i].id}" onclick="buscarQuizzSelecionado(this)">
        <p>${objetoQuizzes.data[i].title}</p>
    </div> 
        
        `;}
        buscarQuizzSelecionado(objetoQuizzes);
}


const infosQuizz = {
    quizzes: "",
    idQuizz: ""
};

function buscarQuizzSelecionado(objetoQuizzes){
    
    if(objetoQuizzes.status == '200'){
        infosQuizz.quizzes = objetoQuizzes.data;
        
    } else if(typeof(objetoQuizzes) == 'object'){
        infosQuizz.idQuizz = parseInt(objetoQuizzes.id);
    }

    if((infosQuizz.quizzes != "") && (infosQuizz.idQuizz != "")){
        acessarQuizzSelecionado();
    }
}
function acessarQuizzSelecionado(elemento){
}

function criarQuizz(elemento){
    
    if(elemento.id == "criar-botao-grande"){

        document.getElementById("criar-quizz").style.display = "none";
    } else if(elemento.id == "botao-criar-pequeno"){

        document.getElementById("seus-quizzes").style.display = "none";
    }
    
    document.querySelector(".container").innerHTML = `
    
    <section class="inputs-quizz comece-pelo-comeco" id="comece-pelo-comeco">
        <h2 class="nome-sessoes">Comece pelo começo</h2>
        <div>
            <input type="text" name="" id="titulo-quizz"         placeholder="   Título do seu quizz">
            <input type="text" name="" id="url-imagem-quizz"     placeholder="   URL da imagem do seu quizz">
            <input type="text" name="" id="quantidade-perguntas" placeholder="   Quantidade de perguntas do quizz">
            <input type="text" name="" id="quantidade-niveis"    placeholder="   Quantidade de níveis do quizz">
        </div>
        <button onclick="verificarCriarQuizz(this)" id="button-criar-perguntas">Prosseguir para criar perguntas</button>
    </section>
    `;

}

function verificarCriarQuizz(){
    
    let quantidadePerguntas = parseInt(document.getElementById("quantidade-perguntas").value);
    const validarBotao = [false, false, false, false]; 
    const inputsCriarQuizz = document.querySelectorAll("input");
    
    for(let i = 0; i < inputsCriarQuizz.length; i++){
        
        if(inputsCriarQuizz[i].value == ""){
            alert("Por favor, preencha todos os dados corretamente.");
        }
    }
    
    const meuQuizz = [{
        titulo: "",
        urlQuizz: "",
        quantidadePerguntas: "",
        quantidadeNiveis: ""
    }];

    if((inputsCriarQuizz[0].value.length >= 20) && (inputsCriarQuizz[0].value.length <= 65)){
        validarBotao[0] = true;
        localStorage.setItem("titulo-quizz", inputsCriarQuizz[0].value);
        meuQuizz.titulo = localStorage.getItem("titulo-quizz");
    }
    if(inputsCriarQuizz[1].value.match(/\.(jpeg|jpg|gif|png)$/) != null){
        validarBotao[1] = true;
        localStorage.setItem("url-imagem-quizz", inputsCriarQuizz[1].value);
        meuQuizz.urlQuizz = localStorage.getItem("url-imagem-quizz");
    }
    if(parseInt(inputsCriarQuizz[2].value) >= 3){
        validarBotao[2] = true;
        localStorage.setItem("quantidade-perguntas", inputsCriarQuizz[2].value);
        meuQuizz.quantidadePerguntas = localStorage.getItem("quantidade-perguntas");
    }
    if(parseInt(inputsCriarQuizz[3].value) >= 2){
        validarBotao[3] = true;
        localStorage.setItem("quantidade-niveis", inputsCriarQuizz[3].value);
        meuQuizz.quantidadeNiveis = localStorage.getItem("quantidade-niveis");
    }
    if(!validarBotao.includes(false)){
        
        console.log(meuQuizz);
        criarPerguntas(quantidadePerguntas);
    }
      quantNiveis = inputsCriarQuizz[3].value;
      return quantNiveis;
}

function criarPerguntas(quantidadePerguntas){
    document.getElementById("comece-pelo-comeco").style.display = "none"; 

    document.querySelector(".container").innerHTML = `
    
        <section class="inputs-quizz crie-suas-perguntas" id = "crie-suas-perguntas">

            <h2 class="nome-sessoes">Criar suas perguntas</h2>
            <div class="perguntas">
            <div>
                <h2>Pergunta 1</h2>
                <input type="text" name="" id="texto-pergunta" placeholder="   Texto da pergunta">
                <input type="text" name="" id="cor-quizz" placeholder="   Cor de fundo da pergunta">
            </div>

            <div class="respostas">
                <h2>Resposta Correta</h2>
                <input type="text" name="" id="reposta-correta" placeholder="   Resposta correta">
                <input type="text" name="" id="url-imagem-correta" placeholder="   URL da imagem">
            </div>

            <div class="respostas">
                <h2>Resposta Incorretas</h2>
                <input type="text" name="" id="resposta-incorreta" placeholder="   Resposta incorreta 1">
                <input type="text" name="" id="url-imagem-incorreta" placeholder="   URL da imagem">

                <input type="text" name="" id="" placeholder="   Resposta incorreta 2">
                <input type="text" name="" id="" placeholder="   URL da imagem">

                <input type="text" name="" id="" placeholder="   Resposta incorreta 3">
                <input type="text" name="" id="" placeholder="   URL da imagem">

                <input type="text" name="" id="" placeholder="   Resposta incorreta 4">
                <input type="text" name="" id="" placeholder="   URL da imagem">
            </div>
            </div>
    `;

    for(let i = 1; i < quantidadePerguntas; i++){

        document.querySelector(".inputs-quizz.crie-suas-perguntas").innerHTML += `
        
        <div class="adicionar-pergunta">
            <h2>Pergunta ${i+1}</h2>
            <ion-icon name="create-outline" onclick="armazenarPerguntas(this)"></ion-icon>
        </div>
        
        `;

        if(i+1 == quantidadePerguntas){

            document.querySelector(".crie-suas-perguntas").innerHTML += `
        
            <button onclick="criarNiveis(this)" id="button-criar-niveis">Prosseguir pra criar níveis</button>

        `;
        }
    }
}

const arrayPerguntas = [];

function armazenarPerguntas() {
    const dadosPergunta = [];
    const validacaoHex = /^#+[0-9A-F]{6}$/i;
    const validacaoImagem = /\.(jpeg|jpg|gif|png)$/;
    const pergunta = document.querySelectorAll("input");
    const validarPergunta = [];
    for (let i=0; i<12; i++) {
        validarPergunta.push(false);
        dadosPergunta[i] = pergunta[i].value;
    };
    if (pergunta[0].value.length >= 20) {
        validarPergunta[0] = true;
    };
    if (validacaoHex.test(pergunta[1]) === true) {
        validarPergunta[1] = true;
    };
    if (pergunta[2].value !== "") {
        validarPergunta[2] = true;
    };
    if (validacaoImagem.test(pergunta[3].value) === true) {
        validarPergunta[3] = true;
    };
    if (pergunta[4].value !== "") {
        validarPergunta[4] = true;
    };
    if (validacaoImagem.test(pergunta[5].value) === true) {
        validarPergunta[5] = true;
    };
    if (pergunta[6].value === "" || (pergunta[6].value !== "" && validacaoImagem.test(pergunta[7]) === true)) {
        validarPergunta[6] = true;
        validarPergunta[7] = true;
    };
    if (pergunta[8].value === "" || (pergunta[8].value !== "" && validacaoImagem.test(pergunta[9]) === true)) {
        validarPergunta[8] = true;
        validarPergunta[9] = true;
    };
    if (pergunta[10].value === "" || (pergunta[10].value !== "" && validacaoImagem.test(pergunta[11]) === true)) {
        validarPergunta[10] = true;
        validarPergunta[11] = true;
    };
    if (!validarPergunta.includes(false)) {
        arrayPerguntas.push(dadosPergunta);
        proximaPergunta();
    } else (alert("Preencha os campos corretamente, por favor."))
}

function proximaPergunta(secao) {
    
}

let quantNiveis;
let contNiveis;
let contador = 0;
let ArrayCriarNiveis = [];
let arrayproximoNivel = [];
let arrayPorcent = [];
let tituloNivel = "";
let Porcent = "";
let urlNivel = "";
let DescricaoNivel = "";

function criarNiveis(){
     
    document.getElementById("crie-suas-perguntas").style.display = "none";

    document.querySelector(".container").innerHTML = `
    <section class="inputs-quizz crie-seus-niveis" id = "crie-seus-niveis">

      <h2 class="nome-sessoes">Agora, decida os níveis</h2>

        <div class="adicionar-nivel" id = "nivel1">
            <h2>Nível 1</h2>
                <input type="text" name="" id="titulo"      placeholder="   Título do nível">
                <input type="text" name="" id="porcentagem" placeholder="   % de acerto mínima">
                <input type="text" name="" id="linkurl"     placeholder="   URL da imagem do nível">
                <input type="text" name="" id="descricao"   placeholder="   Descrição do nível">
        </div>
    </section>`

        for (i = 0; i < quantNiveis - 1; i++){
            document.querySelector("section").innerHTML +=`
                <div class="adicionar-nivel" id = "nivel${i+2}">
                    <h2>Nível ${i+2}</h2>
        
                    <ion-icon class = "icone" name="create-outline" onclick="proximoNivel(this)"></ion-icon>
                </div>`;
        }


    document.querySelector("section").innerHTML += `<button onclick="proximoNivel(this)" id="button-quizz-pronto">Finalizar Quizz</button>`;
}

    function mincaracteres(){

        let titulonivel = true;
        const titulo = document.getElementById("titulo").value;
            if (titulo.length < 20){
              titulonivel = false;                                      
            }
            arrayproximoNivel.push(titulonivel);
            tituloNivel = titulo;
            return tituloNivel;
    }

    function porcentagemmin(){

        let porcentagemmin = true; 
        const porcentagem = document.getElementById("porcentagem").value;
            if ( 0 > porcentagem ||  porcentagem > 100){
               porcentagemmin = false;
            };
            arrayproximoNivel.push(porcentagemmin);
            Porcent = porcentagem;
            arrayPorcent.push(Porcent);
            return Porcent;
    }


    function checkURL() {

        const linkurl = document.getElementById("linkurl").value;
        const urlcorreto = (linkurl.match(/\.(jpeg|jpg|gif|png)$/) != null);
        arrayproximoNivel.push(urlcorreto);
           urlNivel = linkurl;
        return urlNivel;
    }

    function mincaracteresDescricao(){

        let mindescricao = true;
        const descricao = document.getElementById("descricao").value;
        if (descricao.length < 30){                                       
            mindescricao = false;
        }
            arrayproximoNivel.push(mindescricao);
        
        DescricaoNivel = descricao;  
        
        return DescricaoNivel;
    }

    function proximoNivel(elemento){
        const pai = elemento.parentNode;

      for (i = 0;i< quantNiveis;i++ ){
          if (arrayPorcent[i] == 0){
              contador++
              return contador
          }
      }

        mincaracteres();
        porcentagemmin();
        checkURL();
        mincaracteresDescricao();
        
        let arr;
        arr = arrayproximoNivel;
        if (arr[0] === true && arr[1] === true && arr[2] === true && arr[3] === true ){
               
            ArrayCriarNiveis.push({ 
                titulo: tituloNivel, 
                porcentagem: Porcent, 
                URL: urlNivel, 
                descricao: DescricaoNivel });
                contNiveis = ArrayCriarNiveis.length;
            
            document.getElementById("nivel" + contNiveis).innerHTML = `<h2>Nível ${contNiveis}</h2>`;
        
            if(contNiveis == quantNiveis){
                QuizzPronto();
            } else {
                pai.innerHTML = `
               <h2>Nível ${contNiveis + 1}</h2>
                    <input type="text" name="" id="titulo"      placeholder="   Título do nível">
                    <input type="text" name="" id="porcentagem" placeholder="   % de acerto mínima">
                    <input type="text" name="" id="linkurl"     placeholder="   URL da imagem do nível">
                    <input type="text" name="" id="descricao"   placeholder="   Descrição do nível">`
            }

        } else {
            alert("Algum dos locais foram preenchidos errados");       
        }
        arrayproximoNivel =[];
    }

    function QuizzPronto(){
    
        document.getElementById("crie-seus-niveis").style.display = "none";
              document.querySelector(".container").innerHTML = `
            <div class="inputs-quizz quizz-pronto" id = "quizz-pronto">
    
                <h2>Seu quizz está pronto!</h2>
    
                <div class ="img-quizz-pronto">
                    <img src="/imagens/Rectangle 34.svg" alt="">
                    <label>O quão Potterhead é você?</label>
                </div>
                  
              
                <button onclick="">Acessar Quizz</button>
                  
                <p onclick = "">Voltar pra home</p>
              
            </div>
     `;
    }