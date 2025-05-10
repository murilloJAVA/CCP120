const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Imagens base64
const carroImg = new Image();
carroImg.src = "img/carro.png";

const coneImg = new Image();
coneImg.src = "img/cone.png";

const estradaX = 55;
const estradaWidth = canvas.width - 110;

let carro = {
  x: 170,
  y: 500,
  width: 60,
  height: 100,
  speed: 5
};

let cones = [];
let coneSpeed = 2;
let tempo = 0;
let gameOver = false;
let faixaY = 0;
let pausado = false; // Nova variável de controle

// Controle de teclado
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft' && !pausado && carro.x > estradaX) {
    carro.x -= carro.speed;
    if (carro.x < estradaX) carro.x = estradaX;
  }
  if (e.key === 'ArrowRight' && !pausado && carro.x < estradaX + estradaWidth - carro.width) {
    carro.x += carro.speed;
    if (carro.x > estradaX + estradaWidth - carro.width) carro.x = estradaX + estradaWidth - carro.width;
  }

  // ESC pausa o jogo
  if (e.key === 'Escape') {
    pausado = true;
  }

  // ENTER continua o jogo
  if (e.key === 'Enter') {
    if (pausado && !gameOver) {
      pausado = false;
      atualizar(); // reinicia o loop
    }
  }
});

// Criação de cones apenas na faixa do asfalto
function criarCone() {
  const coneWidth = 65;
  const coneX = Math.random() * (estradaWidth - coneWidth) + estradaX;
  cones.push({ x: coneX, y: -60, width: coneWidth, height: 65 });
}

// Colisão com margem ajustada
function colidiu(a, b) {
  const margem = 15; 
  return a.x + margem < b.x + b.width - margem &&
         a.x + a.width - margem > b.x + margem &&
         a.y + margem < b.y + b.height - margem &&
         a.y + a.height - margem > b.y + margem;
}

// Função para desenhar a mensagem de "PAUSADO"
function desenharPausado() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.5)"; // Fundo semitransparente
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillStyle = "white";
  ctx.font = "40px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("PAUSADO", canvas.width / 2, canvas.height / 2);
}

// Desenhar cenário
function desenharCenario() {
  // Grama
  ctx.fillStyle = "#228B22";
  ctx.fillRect(0, 0, 50, canvas.height);
  ctx.fillRect(canvas.width - 50, 0, 50, canvas.height);

  // Asfalto
  ctx.fillStyle = "#111";
  ctx.fillRect(estradaX, 0, estradaWidth, canvas.height);

  // Guias brancas
  ctx.fillStyle = "#fff";
  ctx.fillRect(estradaX, 0, 5, canvas.height);
  ctx.fillRect(estradaX + estradaWidth - 5, 0, 5, canvas.height);

  // Faixa amarela tracejada
  ctx.strokeStyle = "#FFD700";
  ctx.lineWidth = 4;
  ctx.setLineDash([20, 20]);
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, faixaY);
  ctx.lineTo(canvas.width / 2, canvas.height + 40);
  ctx.stroke();
  ctx.setLineDash([]);
}

// Loop do jogo
function atualizar() {
  if (gameOver || pausado) {
    if (pausado) {
      desenharPausado(); // Desenha a tela de pausa
    }
    return;
  }

  faixaY += coneSpeed;
  if (faixaY >= 40) faixaY = 0;

  desenharCenario();

  // Carro
  ctx.drawImage(carroImg, carro.x, carro.y, carro.width, carro.height);

  // Cones
  for (let i = 0; i < cones.length; i++) {
    const c = cones[i];
    c.y += coneSpeed;
    ctx.drawImage(coneImg, c.x, c.y, c.width, c.height);

    if (colidiu(carro, c)) {
      gameOver = true;
      alert("Game Over!");
      window.location.reload();
    }
  }

  // Remover cones fora da tela
  cones = cones.filter(c => c.y < canvas.height);

  // Dificuldade progressiva
  tempo++;
  if (tempo % 600 === 0) coneSpeed += 0.5;

  requestAnimationFrame(atualizar);
}

setInterval(criarCone, 2000);
atualizar();
