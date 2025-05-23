// Referência ao canvas e botões
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('startButton');
const restartButton = document.getElementById('restartButton');

// Carrega imagens
const carroImg = new Image();
carroImg.src = "img/carro.png";

const coneImg = new Image();
coneImg.src = "img/cone.png";

const linhaChegadaImg = new Image();
linhaChegadaImg.src = "img/chegada.jpg";

const fogoGif = new Image();
fogoGif.src = "img/fogo_nitrow.gif";

// Define a área da estrada
const estradaX = 55;
const estradaWidth = canvas.width - 110;

// Estado inicial do jogo
let carro = { x: 170, y: 500, width: 60, height: 100, speed: 5 };
let cones = [];
let coneSpeed = 6;
let tempo = 0;
let gameOver = false;
let faixaY = 0;
let pausado = false;
let jogoIniciado = false;
let linhaChegada = null;
let venceu = false;
let usandoNitro = false;
let velocidadeOriginal = carro.speed;

// Inicia o jogo
startButton.addEventListener('click', () => {
  jogoIniciado = true;
  startButton.style.display = 'none';
  atualizar();
  setInterval(criarCone, 2000); // Cria cones a cada 2 segundos
});

// Controles do teclado
document.addEventListener('keydown', e => {
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
    e.preventDefault(); // Impede scroll
  }

  // Pausa com ESC
  if (e.key === 'Escape' && jogoIniciado && !gameOver && !venceu) {
    pausado = true;
    return;
  }

  // Retoma com ENTER
  if (e.key === 'Enter' && pausado && !gameOver && !venceu) {
    pausado = false;
    atualizar();
    return;
  }

  if (!jogoIniciado || pausado || gameOver || venceu) return;

  // Movimento do carro
  if (e.key === 'ArrowLeft' && carro.x > estradaX) {
    carro.x -= carro.speed;
    if (carro.x < estradaX) carro.x = estradaX;
  }

  if (e.key === 'ArrowRight' && carro.x < estradaX + estradaWidth - carro.width) {
    carro.x += carro.speed;
    if (carro.x > estradaX + estradaWidth - carro.width) carro.x = estradaX + estradaWidth - carro.width;
  }

  if (e.key === 'ArrowUp' && carro.y > 0) {
    carro.y -= carro.speed;
    if (carro.y < 0) carro.y = 0;
  }

  if (e.key === 'ArrowDown' && carro.y < canvas.height - carro.height) {
    carro.y += carro.speed;
    if (carro.y > canvas.height - carro.height) carro.y = canvas.height - carro.height;
  }

  // Ativa o nitro (tecla espaço)
  if (e.code === 'Space') {
    e.preventDefault();
    usandoNitro = true;
    coneSpeed += 5;
    setTimeout(() => {
      coneSpeed -= 5;
      usandoNitro = false;
    }, 2000);
  }
});

// Reinicia o jogo
restartButton.addEventListener('click', () => {
  window.location.reload();
});

// Gera cones com dificuldade progressiva
function criarCone() {
  if (!jogoIniciado || pausado || gameOver || venceu) return;

  const coneWidth = 65;
  let quantidade = 1;
  if (tempo > 600) quantidade = 2;
  if (tempo > 1200) quantidade = 3;
  if (tempo > 1800) quantidade = 4;

  for (let i = 0; i < quantidade; i++) {
    const coneX = Math.random() * (estradaWidth - coneWidth) + estradaX;
    cones.push({ x: coneX, y: -60, width: coneWidth, height: 65 });
  }
}

// Detecta colisões entre objetos
function colidiu(a, b) {
  const margem = 15;
  return a.x + margem < b.x + b.width - margem &&
         a.x + a.width - margem > b.x + margem &&
         a.y + margem < b.y + b.height - margem &&
         a.y + a.height - margem > b.y + margem;
}

// Desenha tela de pausa
function desenharPausado() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  ctx.font = "40px Arial";
  ctx.textAlign = "center";
  ctx.fillText("PAUSADO", canvas.width / 2, canvas.height / 2);
}

// Desenha a estrada e faixa central
function desenharCenario() {
  ctx.fillStyle = "#228B22"; // grama
  ctx.fillRect(0, 0, 50, canvas.height);
  ctx.fillRect(canvas.width - 50, 0, 50, canvas.height);
  ctx.fillStyle = "#111"; // asfalto
  ctx.fillRect(estradaX, 0, estradaWidth, canvas.height);
  ctx.fillStyle = "#fff"; // bordas da pista
  ctx.fillRect(estradaX, 0, 5, canvas.height);
  ctx.fillRect(estradaX + estradaWidth - 5, 0, 5, canvas.height);
  ctx.strokeStyle = "#FFD700"; // faixa do meio
  ctx.lineWidth = 4;
  ctx.setLineDash([20, 20]);
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, faixaY);
  ctx.lineTo(canvas.width / 2, canvas.height + 40);
  ctx.stroke();
  ctx.setLineDash([]);
}

// Lógica principal do jogo
function atualizar() {
  if (!jogoIniciado || gameOver || venceu) return;

  if (pausado) {
    desenharPausado();
    return;
  }

  // Anima a faixa central
  faixaY += coneSpeed;
  if (faixaY >= 40) faixaY = 0;

  desenharCenario();

  // Desenha fogo se estiver usando nitro
  if (usandoNitro) {
    const fogoWidth = 60;
    const fogoHeight = 60;
    const fogoX = carro.x + carro.width / 2 - fogoWidth / 2;
    const fogoY = carro.y + carro.height - fogoHeight + 10;
    ctx.drawImage(fogoGif, fogoX, fogoY, fogoWidth, fogoHeight);
  }

  ctx.drawImage(carroImg, carro.x, carro.y, carro.width, carro.height);

  // Move e desenha cones
  for (let i = 0; i < cones.length; i++) {
    const c = cones[i];
    c.y += coneSpeed;
    ctx.drawImage(coneImg, c.x, c.y, c.width, c.height);

    // Verifica colisão
    if (colidiu(carro, c)) {
      gameOver = true;
      mostrarGameOver();
      return;
    }
  }

  // Remove cones fora da tela
  cones = cones.filter(c => c.y < canvas.height);

  tempo++;
  if (tempo % 600 === 0) coneSpeed += 0.5; // Aumenta dificuldade

  // Mostra linha de chegada
  if (tempo === 7000 && !linhaChegada) {
    linhaChegada = { y: -20, height: 10 };
  }

  if (linhaChegada) {
    linhaChegada.y += coneSpeed;
    ctx.drawImage(linhaChegadaImg, estradaX, linhaChegada.y, estradaWidth, 40);
    linhaChegada.height = 30;

    if (
      carro.y < linhaChegada.y + linhaChegada.height &&
      carro.y + carro.height > linhaChegada.y
    ) {
      venceu = true;
      mostrarVitoria();
      return;
    }
  }

  // Próximo frame
  requestAnimationFrame(atualizar);
}

// Tela de Game Over
function mostrarGameOver() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "red";
  ctx.font = "bold 40px Arial";
  ctx.textAlign = "center";
  ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2 - 20);
  restartButton.style.display = 'block';
}

// Tela de vitória
function mostrarVitoria() {
  ctx.fillStyle = "rgba(0,0,0,0.7)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#00FF00";
  ctx.font = "20px Arial";
  ctx.textAlign = "center";
  ctx.fillText("Parabéns, você conseguiu atravessar todo percurso!", canvas.width / 2, canvas.height / 2);
  restartButton.style.display = 'block';
}
