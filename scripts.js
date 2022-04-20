function criarQuizz(){

    document.getElementById("criar-quizz").style.display = "none"; 
    
    document.querySelector(".container").innerHTML = `
    <section class="inputs-quizz comece-pelo-comeco" id="comece-pelo-comeco">
    <h2>Comece pelo começo</h2>
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
            <h2>Crir suas perguntas</h2>
            <div>
                <h2>Pergunta 1</h2>
                <input type="text" name="" id="" placeholder="   Texto da pergunta">
                <input type="text" name="" id="" placeholder="   Cor de fundo da pergunta">
            </div>
            <button onclick="criarPerguntas(this)">Prosseguir para criar perguntas</button>
        </section>
        
    `;
}