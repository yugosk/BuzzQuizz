function criarQuizz(){

    document.getElementById("criar-quizz").style.display = "none"; 
    
    document.querySelector(".container").innerHTML = `
    
    <section class="inputs-quizz comece-pelo-comeco" id="comece-pelo-comeco">
        <h2 class="nome-sessoes">Comece pelo começo</h2>
        <div>
            <input type="text" name="" id="" placeholder="   Título do seu quizz">
            <input type="text" name="" id="" placeholder="   URL da imagem do seu quizz">
            <input type="text" name="" id="" placeholder="   Quantidade de perguntas do quizz">
            <input type="text" name="" id="" placeholder="   Quantidade de níveis do quizz">
        </div>
        <button onclick="criarPerguntas(this)">Prosseguir para criar perguntas</button>
    </section>
 
    `;

    // document.getElementById("button-criar-perguntas").disabled = "true";
}

function verificarCriarQuizz(){
    
    let quantidadePerguntas = parseInt(document.getElementById("quantidade-perguntas").value);
    const validarBotao = [false, false, false, false]; 
    const inputsCriarQuizz = document.querySelectorAll("input");
    
    for(let i = 0; i < inputsCriarQuizz.length; i++){
        
        if(inputsCriarQuizz[i].value == ""){
            alert("Por favor, preencha todos os dados corretamente.");
            return;
        }
    }
    
    if((inputsCriarQuizz[0].value.length >= 20) && (inputsCriarQuizz[0].value.length <= 65)){
        validarBotao[0] = true;
    }
    if(inputsCriarQuizz[1].value.match(/\.(jpeg|jpg|gif|png)$/) != null){
        validarBotao[1] = true;
    }
    if(parseInt(inputsCriarQuizz[2].value) >= 3){
        validarBotao[2] = true;
    }
    if(parseInt(inputsCriarQuizz[3].value) >= 2){
        validarBotao[3] = true;
    }
    if(!validarBotao.includes(false)){

        criarPerguntas(quantidadePerguntas);
    }

}

function criarPerguntas(quantidadePerguntas){
    document.getElementById("comece-pelo-comeco").style.display = "none"; 

    document.querySelector(".container").innerHTML = `
    
        <section class="inputs-quizz crie-suas-perguntas" id = "crie-suas-perguntas">

            <h2 class="nome-sessoes">Criar suas perguntas</h2>
            <div>
                <h2>Pergunta 1</h2>
                <input type="text" name="" id="" placeholder="   Texto da pergunta">
                <input type="text" name="" id="" placeholder="   Cor de fundo da pergunta">
            </div>

            <div class="respostas">
                <h2>Resposta Correta</h2>
                <input type="text" name="" id="" placeholder="   Resposta correta">
                <input type="text" name="" id="" placeholder="   URL da imagem">
            </div>

            <div class="respostas">
                <h2>Resposta Incorretas</h2>
                <input type="text" name="" id="" placeholder="   Resposta incorreta 1">
                <input type="text" name="" id="" placeholder="   URL da imagem">

                <input type="text" name="" id="" placeholder="   Resposta incorreta 2">
                <input type="text" name="" id="" placeholder="   URL da imagem">

                <input type="text" name="" id="" placeholder="   Resposta incorreta 3">
                <input type="text" name="" id="" placeholder="   URL da imagem">

                <input type="text" name="" id="" placeholder="   Resposta incorreta 4">
                <input type="text" name="" id="" placeholder="   URL da imagem">
            </div>

        
    `;

    for(let i = 1; i < quantidadePerguntas; i++){

        document.querySelector(".inputs-quizz.crie-suas-perguntas").innerHTML += `
        
        <div class="adicionar-pergunta">
            <h2>Pergunta ${i+1}</h2>
            <ion-icon name="create-outline" onclick="adicionarPergunta(this)"></ion-icon>
        </div>
        
        `;

        if(i+1 == quantidadePerguntas){

            document.querySelector(".crie-suas-perguntas").innerHTML += `
        
            <button onclick="criarNiveis(this)" id="button-criar-niveis">Prosseguir pra criar níveis</button>

        `;
        }
    }
}

function validarPerguntas() {
    const validacaoHex = /^#[0-9A-F]{6}$/i
    const validacaoURL = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/
    const pergunta = document.querySelectorAll("input")
    if (pergunta[0].value.length>=20 || validacaoHex.test(pergunta[1].value) === true || pergunta[2].value !== "" || pergunta[3].value
    ||pergunta[4].value !== "" || validacaoURL.test(pergunta[5].value === true)) {
        if (pergunta[6].value !== "" || validacaoURL.test(pergunta[7].value === true)) {
            if (pergunta[8].value !== "" || validacaoURL.test(pergunta[9].value === true)) {
                if (pergunta[10].value !== "" || validacaoURL.test(pergunta[11].value === true)) {
                    criarNiveis()
                } else {if (pergunta[10].value !== "") {alert("Preencha os campos corretamente, por favor.")}}
            } else {if (pergunta[8].value !== "") {alert("Preencha os campos corretamente, por favor.")}}
        } else {if (pergunta[6].value !== "") {alert("Preencha os campos corretamente, por favor.")}}
    } else {alert("Preencha os campos corretamente, por favor.")}
} 

function criarNiveis(){
     
    document.getElementById("crie-suas-perguntas").style.display = "none";

    document.querySelector(".container").innerHTML = `
    <section class="inputs-quizz crie-seus-niveis" id = "crie-seus-niveis">

        <h2 class="nome-sessoes">Agora, decida os níveis</h2>
        <div>
            <h2>Nível 1</h2>
            <input type="text" name="" id="titulo" placeholder="   Título do nível">
            <input type="text" name="" id="porcentagem" placeholder="   % de acerto mínima">
            <input type="text" name="" id="linkurl" placeholder="   URL da imagem do nível">
            <input type="text" name="" id="descricao" placeholder="   Descrição do nível">
        </div>


        <div class="adicionar-pergunta" >
        <h2>Nível 2</h2>
        <ion-icon name="create-outline" onclick=""></ion-icon>
        </div>

        <div class="adicionar-pergunta">
        <h2>Nível 3</h2>
        <ion-icon name="create-outline" onclick=""></ion-icon>
        </div>

        <button onclick="QuizzPronto(this)">Finalizar Quizz</button>
    </section>
`;
}

function QuizzPronto(){
    document.getElementById("crie-seus-niveis").style.display = "none";
          document.querySelector(".container").innerHTML = `
        <div class="inputs-quizz quizz-pronto" id = "quizz-pronto">

            <h2>Agora, decida os níveis</h2>

            <div class ="img-quizz-pronto">
                <img src="/imagens/Rectangle 34.svg" alt="">
                <label>O quão Potterhead é você?</label>
            </div>
              
          
            <button onclick="">Acessar Quizz</button>
              
            <p>Voltar pra home</p>
          
        </div>
 `;
}

const arrayproximonivel = [];
    function mincaracteres(){
        let titulonivel = true;
        const titulo = document.querySelector(".crie-seus-niveis #titulo").value;
        if (titulo.length < 20){
            titulonivel = false;                                      
            }
            arrayproximonivel.push(titulonivel);
            return titulonivel;
    }

    function porcentagemmin(){
        let porcentagemmin = true; 
        const porcentagem = document.querySelector(".crie-seus-niveis #porcentagem").value;
        if ( 0 > porcentagem ||  porcentagem > 100){
            porcentagemmin = false;
            };
            arrayproximonivel.push(porcentagemmin);
            return porcentagemmin;
    }

    //essa função verifica se sua url termina em qualquer uma dessas quatro extensões.
    //me retorna um valor true ou false
    function checkURL() {
        const linkurl = document.querySelector(".crie-seus-niveis #linkurl").value;
        const urlcorreto = (linkurl.match(/\.(jpeg|jpg|gif|png)$/) != null);
        arrayproximonivel.push(urlcorreto);
        return urlcorreto;
    }

    function mincaracteresDescricao(){
        let mindescricao = true;
        const titulo = document.querySelector(".crie-seus-niveis #descricao").value;
        if (titulo.length < 30){                                       
            mindescricao = false;
            }
            arrayproximonivel.push(mindescricao);
            return mindescricao;
    }

    function proximonivel(){
        mincaracteres();
        porcentagemmin();
        checkURL();
        mincaracteresDescricao();
        
        let arr;
        arr = arrayproximonivel;
        if (arr[0] === true && arr[1] === true && arr[2] === true && arr[3] === true ){
             return true;
        } else {
             return false;
        } 
    }
