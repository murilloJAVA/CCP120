const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('startButton');

// Imagens
const carroImg = new Image();
carroImg.src = "img/carro.png";

const coneImg = new Image();
coneImg.src = "img/cone.png";

const linhaChegadaImg = new Image();
linhaChegadaImg.src = "img/chegada.jpg";

// Estrada
const estradaX = 55;
const estradaWidth = canvas.width - 110;

// Estado do jogo
let carro = { x: 170, y: 500, width: 60, height: 100, speed: 5 };
let cones = [];
let coneSpeed = 2;
let tempo = 0;
let gameOver = false;
let faixaY = 0;
let pausado = false;
let jogoIniciado = false;
let linhaChegada = null;
let venceu = false;
let mostrarBotaoReiniciar = false;
const botaoReiniciar = {
  x: canvas.width / 2 - 75,
  y: canvas.height / 2 + 30,
  width: 150,
  height: 40
};

// Inicia o jogo quando clica no botão
startButton.addEventListener('click', () => {
  jogoIniciado = true;
  startButton.style.display = 'none';
  atualizar();
  setInterval(criarCone, 2000);
});

// Teclas
document.addEventListener('keydown', e => {
  if (!jogoIniciado) return;

  if (e.key === 'ArrowLeft' && !pausado && carro.x > estradaX) {
    carro.x -= carro.speed;
    if (carro.x < estradaX) carro.x = estradaX;
  }
  if (e.key === 'ArrowRight' && !pausado && carro.x < estradaX + estradaWidth - carro.width) {
    carro.x += carro.speed;
    if (carro.x > estradaX + estradaWidth - carro.width) carro.x = estradaX + estradaWidth - carro.width;
  }

  if (e.key === 'Escape') {
    pausado = true;
  }

  if (e.key === 'Enter') {
    if (pausado && !gameOver) {
      pausado = false;
      atualizar();
    }
  }
});

function criarCone() {
  if (!jogoIniciado || pausado || gameOver || venceu) return;

  const coneWidth = 65;
  const quantidade = tempo > 3600 ? 2 : 1;

  for (let i = 0; i < quantidade; i++) {
    const coneX = Math.random() * (estradaWidth - coneWidth) + estradaX;
    cones.push({ x: coneX, y: -60, width: coneWidth, height: 65 });
  }
}

function colidiu(a, b) {
  const margem = 15;
  return a.x + margem < b.x + b.width - margem &&
         a.x + a.width - margem > b.x + margem &&
         a.y + margem < b.y + b.height - margem &&
         a.y + a.height - margem > b.y + margem;
}

function desenharPausado() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "white";
  ctx.font = "40px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("PAUSADO", canvas.width / 2, canvas.height / 2);
}

function desenharCenario() {
  ctx.fillStyle = "#228B22";
  ctx.fillRect(0, 0, 50, canvas.height);
  ctx.fillRect(canvas.width - 50, 0, 50, canvas.height);

  ctx.fillStyle = "#111";
  ctx.fillRect(estradaX, 0, estradaWidth, canvas.height);

  ctx.fillStyle = "#fff";
  ctx.fillRect(estradaX, 0, 5, canvas.height);
  ctx.fillRect(estradaX + estradaWidth - 5, 0, 5, canvas.height);

  ctx.strokeStyle = "#FFD700";
  ctx.lineWidth = 4;
  ctx.setLineDash([20, 20]);
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, faixaY);
  ctx.lineTo(canvas.width / 2, canvas.height + 40);
  ctx.stroke();
  ctx.setLineDash([]);
}

function atualizar() {
  if (!jogoIniciado || gameOver) return;

  if (pausado) {
    desenharPausado();
    return;
  }

  faixaY += coneSpeed;
  if (faixaY >= 40) faixaY = 0;

  desenharCenario();

  ctx.drawImage(carroImg, carro.x, carro.y, carro.width, carro.height);

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

  cones = cones.filter(c => c.y < canvas.height);

  tempo++;
  if (tempo % 600 === 0) coneSpeed += 0.5;

  if (tempo === 100 && !linhaChegada) {
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
    }
  }

  if (venceu) {
    ctx.fillStyle = "rgba(0,0,0,0.7)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#00FF00";
    ctx.font = "15px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Parabéns, você conseguiu atravessar todo percurso!", canvas.width / 2, canvas.height / 2);

    ctx.fillStyle = "#333";
    ctx.fillRect(botaoReiniciar.x, botaoReiniciar.y, botaoReiniciar.width, botaoReiniciar.height);

    ctx.fillStyle = "#fff";
    ctx.font = "20px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Reiniciar", botaoReiniciar.x + botaoReiniciar.width / 2, botaoReiniciar.y + botaoReiniciar.height / 2);

    mostrarBotaoReiniciar = true;
    return;
  }

  requestAnimationFrame(atualizar);
}

canvas.addEventListener('click', function (e) {
  if (!mostrarBotaoReiniciar) return;

  const rect = canvas.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const clickY = e.clientY - rect.top;

  if (
    clickX >= botaoReiniciar.x &&
    clickX <= botaoReiniciar.x + botaoReiniciar.width &&
    clickY >= botaoReiniciar.y &&
    clickY <= botaoReiniciar.y + botaoReiniciar.height
  ) {
    window.location.reload();
  }
});
