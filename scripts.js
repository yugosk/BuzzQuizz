let titulo;
let imagem;
let questions;
let levels;
let idCriado = 0;
let dadosQuizz;
let numPerguntas;
let resultadoNiveis = [];

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
    
    <div onclick="buscarQuizzSelecionado(this)" id="${objetoQuizzes.data[i].id}">
        <div class="gradiente"></div>
        <img src="${objetoQuizzes.data[i].image}">
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
        acessarQuizzSelecionado(objetoQuizzes);
    }
}
function acessarQuizzSelecionado(parametro){
    const promessa = axios.get(`https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/${parametro.id}`)
    promessa.then(sucessoAcessarQuizz)
}
function sucessoAcessarQuizz(elemento) {
    const dados = elemento.data
    console.log(dados)
    numPerguntas = dados.questions.length
    document.querySelector(".container").innerHTML = `
    <div class="img-topo" style="background-image: url(${dados.image});">
        <h1>${dados.title}</h1>
        </div>
        `
        document.querySelector(".container").parentNode.innerHTML +=`
        <div class="ColumnQuestions"></div>
        `
    for (let j=0; j< dados.questions.length; j++) {
        document.querySelector(".ColumnQuestions").innerHTML += `
        <div class="questions">
            <div class="Pergunta" style="background-color: ${dados.questions[j].color}">
                <h3>${dados.questions[j].title}</h3>
            </div>
            <div class="respostas"></div>
        </div>     
        `

        for (let i=0; i < dados.questions[j].answers.length; i++) {
                document.querySelector(".respostas").innerHTML += `
                <div class="resposta${i+1} respostas ${JSON.stringify(dados.questions[j].answers[i].isCorrectAnswer)}" onclick="selecionarResposta(this)">
                <img src="${dados.questions[j].answers[i].image}" alt="">
                <p>${dados.questions[j].answers[i].text}</p>
                </div>
                `                        
        }
    }
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
        titulo = inputsCriarQuizz[0].value;
        imagem = inputsCriarQuizz[1].value;
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
                <h2>Respostas Incorretas</h2>
                <input type="text" name="" id="resposta-incorreta" placeholder="   Resposta incorreta 1">
                <input type="text" name="" id="url-imagem-incorreta" placeholder="   URL da imagem">

                <input type="text" name="" id="" placeholder="   Resposta incorreta 2">
                <input type="text" name="" id="" placeholder="   URL da imagem">

                <input type="text" name="" id="" placeholder="   Resposta incorreta 3">
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
        
            <button onclick="armazenarPerguntas(this)" id="button-criar-niveis">Prosseguir pra criar níveis</button>

        `;
        }
    }
}

const arrayPerguntas = [];

function armazenarPerguntas() {
    const dadosPergunta = [];
    const validacaoHex = /^#[0-9A-F]{6}$/i;
    const validacaoImagem = /\.(jpeg|jpg|gif|png)$/;
    const pergunta = document.querySelectorAll("input");
    const validarPergunta = [];
    const respostas = [];
    for (let i=0; i<10; i++) {
        validarPergunta.push(false);
        dadosPergunta[i] = pergunta[i].value;
    };
    if (pergunta[0].value.length >= 20) {
        validarPergunta[0] = true;
    };
    if (validacaoHex.test(pergunta[1].value) === true) {
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
    if (pergunta[6].value === "" || (pergunta[6].value !== "" && validacaoImagem.test(pergunta[7].value) === true)) {
        validarPergunta[6] = true;
        validarPergunta[7] = true;
    };
    if (pergunta[8].value === "" || (pergunta[8].value !== "" && validacaoImagem.test(pergunta[9].value) === true)) {
        validarPergunta[8] = true;
        validarPergunta[9] = true;
    };
    if (!validarPergunta.includes(false)) {
        respostas.push({
            text: pergunta[2].value,
            image: pergunta[3].value,
            isCorrectAnswer: true
        })
        respostas.push({
            text: pergunta[4].value,
            image: pergunta[5].value,
            isCorrectAnswer: false
        })
        for (let i=6; i<10; i+=2) {
            if (pergunta[i].value !== ""){
                respostas.push({
                    text: pergunta[i].value,
                    imagem: pergunta[i+1].value,
                    isCorrectAnswer: false
                })
            }
        }
        arrayPerguntas.push({
            title: pergunta[0].value,
            color: pergunta[1].value,
            answers: respostas,
        })
            
        
        proximaPergunta();
    } else {alert("Preencha os campos corretamente, por favor.");}
}

function proximaPergunta() {
    const elementoAnterior = document.querySelector(".perguntas");
    const perguntaAnterior = elementoAnterior.querySelector("h2").innerHTML;
    elementoAnterior.innerHTML = `<h2>${perguntaAnterior}</h2>`;
    elementoAnterior.classList.add("pergunta-armazenada");
    elementoAnterior.classList.remove("perguntas");

    if (document.querySelector(".adicionar-pergunta") !== null){
        const elementoAtual = document.querySelector(".adicionar-pergunta");
        const perguntaAtual = elementoAtual.querySelector("h2").innerHTML;
        elementoAtual.classList.add("perguntas");
        elementoAtual.classList.remove("adicionar-pergunta");
        elementoAtual.innerHTML = `
        <div>
            <h2>${perguntaAtual}</h2>
            <input type="text" name="" id="texto-pergunta" placeholder="   Texto da pergunta">
            <input type="text" name="" id="cor-quizz" placeholder="   Cor de fundo da pergunta">
        </div>
    
        <div class="respostas">
            <h2>Resposta Correta</h2>
            <input type="text" name="" id="reposta-correta" placeholder="   Resposta correta">
            <input type="text" name="" id="url-imagem-correta" placeholder="   URL da imagem">
        </div>
    
        <div class="respostas">
            <h2>Respostas Incorretas</h2>
            <input type="text" name="" id="resposta-incorreta" placeholder="   Resposta incorreta 1">
            <input type="text" name="" id="url-imagem-incorreta" placeholder="   URL da imagem">
    
            <input type="text" name="" id="" placeholder="   Resposta incorreta 2">
            <input type="text" name="" id="" placeholder="   URL da imagem">
    
            <input type="text" name="" id="" placeholder="   Resposta incorreta 3">
            <input type="text" name="" id="" placeholder="   URL da imagem">
        </div>
        `;
    } else {
        questions = arrayPerguntas;
        criarNiveis();
    }
}

function AbrindoQuizz(){







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
                <input type="text" name="" id="titulonivel"      placeholder="   Título do nível">
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
    if (document.getElementById("titulonivel") !== null) {
        const titulo = document.getElementById("titulonivel").value;
            if (titulo.length < 20){
              titulonivel = false;                                      
            }
            arrayproximoNivel.push(titulonivel);
            tituloNivel = titulo;
            return tituloNivel;
    }
}
function porcentagemmin(){
    let porcentagemmin = true; 
    const porcentagem = document.getElementById("porcentagem").value;
        if ( 0 > porcentagem ||  porcentagem > 100){
           porcentagemmin = false;
        };
        arrayproximoNivel.push(porcentagemmin);
        Porcent = porcentagem;
        arrayPorcent.push(Number(Porcent));
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
function proximoNivel(){
    mincaracteres();
    porcentagemmin();
    checkURL();
    mincaracteresDescricao();
    
    let arr;
    arr = arrayproximoNivel;
    if (arr[0] === true && arr[1] === true && arr[2] === true && arr[3] === true) {
        ArrayCriarNiveis.push({ 
            title: tituloNivel,
            image: urlNivel,
            text: DescricaoNivel,
            minValue: Porcent
        });
        
        if (document.querySelector(".adicionar-nivel") !== null && document.querySelectorAll(".nivel-armazenado").length < (quantNiveis - 1)){
            const elementoAnterior = document.querySelector(".adicionar-nivel");
            const nivelAnterior = elementoAnterior.querySelector("h2").innerHTML;
            elementoAnterior.innerHTML = `<h2>${nivelAnterior}</h2>`;
            elementoAnterior.classList.add("nivel-armazenado");
            elementoAnterior.classList.remove("adicionar-nivel");
            const elementoAtual = document.querySelector(".adicionar-nivel");
            const nivelAtual = elementoAtual.querySelector("h2").innerHTML;
            elementoAtual.innerHTML = `
                <h2>${nivelAtual}</h2>
                <input type="text" name="" id="titulonivel"      placeholder="   Título do nível">
                <input type="text" name="" id="porcentagem" placeholder="   % de acerto mínima">
                <input type="text" name="" id="linkurl"     placeholder="   URL da imagem do nível">
                <input type="text" name="" id="descricao"   placeholder="   Descrição do nível">
            `;
        } else {
            if (arrayPorcent.includes(0)) {
                levels = ArrayCriarNiveis;
                QuizzPronto();
            } else {
                alert("Uma das porcentagens deve ser igual a 0.")
                ArrayCriarNiveis.pop();
            }
        }
    } else {alert("Preencha os campos corretamente, por favor.")}
    arrayproximoNivel =[];      
}
function tratarSucesso(resposta) {
    idCriado = Number(resposta.data.id)
    document.getElementById("crie-seus-niveis").style.display = "none";
    let request = axios.get(`https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/${idCriado}`)
    request.then(processarResposta);
}

function tratarErro(erro) {
    console.log("Status code:" + erro.response.status);
    console.log("Mensagem de erro:" + erro.response.data);
}

function processarResposta(resposta) {
    dadosQuizz = resposta.data;
    document.querySelector(".container").innerHTML = `
    <div class="inputs-quizz quizz-pronto" id = "quizz-pronto">

        <h2>Seu quizz está pronto!</h2>

        <div class ="img-quizz-pronto">
            <img src="${dadosQuizz.image}" alt="">
            <h2 class="quizz-pronto">${dadosQuizz.title}</h2>
        </div>
          
      
        <button onclick="">Acessar Quizz</button>
          
        <p onclick = "">Voltar pra home</p>
      
    </div>
`
}

function QuizzPronto(){
    const objetoQuizzPronto = {
        title: titulo,
        image: imagem,
        questions: questions,
        levels: levels
    };     
    let promise = axios.post("https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes", objetoQuizzPronto);
    promise.then(tratarSucesso);
    promise.catch(tratarErro);
}



function selecionarResposta(parametro) {
    let k;
    const respostaSelecionada = parametro.parentNode;
    const bloquearNovaResposta = respostaSelecionada.querySelectorAll(".respostas");
    if (bloquearNovaResposta.length<2) {
        for (let i=0; i<bloquearNovaResposta.length; i++) {
            bloquearNovaResposta[i].classList.remove("respostas")
            bloquearNovaResposta[i].classList.add("respondido")
            parametro.classList.add("escolhida")
        }
    }
    const verificarCompleto = document.querySelectorAll(".escolhida");
    const acertos = document.querySelectorAll(".escolhida.true");
    if (verificarCompleto.length === numPerguntas) {
        levels.sort((a,b) => {
            return b.minValue - a.minValue;
        })
        for (let i=0; i<levels.length; i++) {
            if (acertos > levels[i].minValue) {
                k = i;
            }
        }
        document.querySelector(".ColumnQuestions").innerHTML += `
        <div class="ResultadoFinal">
        <spam class="ResultadoTitulo">
        <h3>${Math.round(acertos/numPerguntas)}% de acerto: ${levels[k].title}<h3>
        </spam>
        <span>
        <div><img src="${levels[k].image}" alt=""></div>
        <div><h5>${levels[k].text}<h5><div>
        </span>
        <div>
        `
    }
}

