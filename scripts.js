let quantNiveis;
function criarQuizz(){

    document.getElementById("criar-quizz").style.display = "none";
    
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

    // document.getElementById("button-criar-perguntas").disabled = "true";
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
      quantNiveis = inputsCriarQuizz[3].value;
      return quantNiveis;
}

function criarPerguntas(quantidadePerguntas){
    document.getElementById("comece-pelo-comeco").style.display = "none"; 

    document.querySelector(".container").innerHTML = `
    
        <section class="inputs-quizz crie-suas-perguntas" id = "crie-suas-perguntas">

            <h2 class="nome-sessoes">Criar suas perguntas</h2>
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
    const validacaoURL = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]))?(?:\?([^#]))?(?:#(.*))?$/
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

let ArrayCriarNiveis = [];
let arrayproximoNivel = [];
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


    document.querySelector("section").innerHTML += `<button  id="button-quizz-pronto">Finalizar Quizz</button>
    `;

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
        console.log(pai);

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
                const contNiveis = ArrayCriarNiveis.length
            console.log(ArrayCriarNiveis);
            
            document.getElementById("nivel" + contNiveis).innerHTML = `<h2>Nível ${contNiveis}</h2>`;


            pai.innerHTML = `
               <h2>Nível ${contNiveis + 1}</h2>
                    <input type="text" name="" id="titulo"      placeholder="   Título do nível">
                    <input type="text" name="" id="porcentagem" placeholder="   % de acerto mínima">
                    <input type="text" name="" id="linkurl"     placeholder="   URL da imagem do nível">
                    <input type="text" name="" id="descricao"   placeholder="   Descrição do nível">
            `
           if(contNiveis === quantNiveis){
               console.log("Estou funcionando abestado");
               document.getElementById("button-quizz-pronto").innerHTML = `<button id="button-quizz-pronto" onclick="QuizzPronto(this)">Finalizar Quizz</button>`   
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