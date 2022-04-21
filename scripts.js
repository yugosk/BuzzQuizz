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

}

function criarPerguntas(){

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

            <div class="adicionar-pergunta">
            <h2>Pergunta 2</h2>
            <ion-icon name="create-outline"></ion-icon>
            </div>

            <div class="adicionar-pergunta">
            <h2>Pergunta 3</h2>
            <ion-icon name="create-outline"></ion-icon>
            </div>

            <button onclick="criarNiveis(this)">Prosseguir pra criar níveis</button>
        </section>
        
    `;
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
            <input type="text" name="" id="" placeholder="   URL da imagem do nível">
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



function mincaracteres(){
    let titulo = document.querySelector(".crie-seus-niveis #titulo").value;
      if (titulo.length < 20){                                       
           console.log("não executar");
        
        };
}

function porcentagemmin(){
    let porcentagem = document.querySelector(".crie-seus-niveis #porcentagem").value;
    console.log(porcentagem);
      if ( 0 > porcentagem ||  porcentagem > 100){
          console.log("não executar");
        };
}

function mincaracteresDescricao(){
    let titulo = document.querySelector(".crie-seus-niveis #descricao").value;
      if (titulo.length < 30){                                       
           console.log("não executar");
        };
}
