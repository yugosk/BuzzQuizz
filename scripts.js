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
    
        <section class="inputs-quizz crie-suas-perguntas">

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

            <button onclick="criarPerguntas(this)">Prosseguir para criar perguntas</button>
        </section>
        
    `;
}