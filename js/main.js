let canvas = document.getElementById("snake"); //Chama o canvas
let context = canvas.getContext("2d"); //Renderiza o desenho do canvas, tratando como um plano 2D 
let box = 32; //Define o tamanho do quadrado

let snake = []; //Define o array que será a cobrinha
snake[0] = {
    x: 8 * box,
    y: 8 * box
};

let direction = "right"; //Define direção inicial da cobrinha

let food = { //Gera a comida em um local aleatório dentro do canvas
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
};

function criarBG() { //Desenha e define o canvas
    context.fillStyle = "lightgreen"; //define a cor
    context.fillRect(0, 0, 16 * box, 16 * box); //desenha o retângulo (x, y, w e h)
};

function criarCobrinha() { //Percorrerá todo o array e adicionará a cor do corpo da cobrinha
    for (i = 0; i < snake.length; i++) {
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box)
    }
};

function drawFood() { //Desenha a comida
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
};

document.addEventListener("keydown", update); //Chama a função update após o evento de clicar

function update(event) { //Cadeia de IFs para direcionar a cobrinha
    if (event.keyCode == 37 && direction != "right") direction = "left";
    if (event.keyCode == 38 && direction != "down") direction = "up";
    if (event.keyCode == 39 && direction != "left") direction = "right";
    if (event.keyCode == 40 && direction != "up") direction = "down";
};


function iniciarJogo() { //Inicia o jogo

    if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if (snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if (snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;


    for (i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(jogo);
            alert("game over :<");
            window.location.reload();
        }
    };



    criarBG();
    criarCobrinha();
    drawFood();

    let snakeX = snake[0].x; //Array na horizontal
    let snakeY = snake[0].y; //Array na vertical

    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;

    if (snakeX != food.x || snakeY != food.y) {
        snake.pop();
    } else {
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }



    let newHead = { //Cabeça da cobrinha
        x: snakeX,
        y: snakeY
    };

    snake.unshift(newHead); //adiciona quadrado do início  da cobrinha



};

let jogo = setInterval(iniciarJogo, 100); //Atualiza o jogo, renovando e realizando o movimento da cobrinha