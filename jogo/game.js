const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('startButton');
const restartButton = document.getElementById('restartButton');

const carroImg = new Image();
carroImg.src = "img/carro.png";

const coneImg = new Image();
coneImg.src = "img/cone.png";

const linhaChegadaImg = new Image();
linhaChegadaImg.src = "img/chegada.jpg";

const estradaX = 55;
const estradaWidth = canvas.width - 110;

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

startButton.addEventListener('click', () => {
  jogoIniciado = true;
  startButton.style.display = 'none';
  atualizar();
  setInterval(criarCone, 2000);
});

document.addEventListener('keydown', e => {
  if (!jogoIniciado || gameOver || venceu) return;

  if (e.key === 'ArrowLeft' && !pausado && carro.x > estradaX) {
    carro.x -= carro.speed;
  }
  if (e.key === 'ArrowRight' && !pausado && carro.x < estradaX + estradaWidth - carro.width) {
    carro.x += carro.speed;
  }
  if (e.key === 'Escape') pausado = true;
  if (e.key === 'Enter' && pausado) {
    pausado = false;
    atualizar();
  }
});

restartButton.addEventListener('click', () => {
  window.location.reload();
});

function criarCone() {
  if (!jogoIniciado || pausado || gameOver || venceu) return;

  const coneWidth = 65;

  // Mais cones com o tempo
  let quantidade = 1;
  if (tempo > 600) quantidade = 2;
  if (tempo > 1200) quantidade = 3;
  if (tempo > 1800) quantidade = 4;

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
  if (!jogoIniciado || gameOver || venceu) return;

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
      mostrarGameOver();
      return;
    }
  }

  cones = cones.filter(c => c.y < canvas.height);
  tempo++;
  if (tempo % 600 === 0) coneSpeed += 0.5;

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

  requestAnimationFrame(atualizar);
}

function mostrarGameOver() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "red";
  ctx.font = "bold 40px Arial";
  ctx.textAlign = "center";
  ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2 - 20);
  restartButton.style.display = 'block';
}

function mostrarVitoria() {
  ctx.fillStyle = "rgba(0,0,0,0.7)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#00FF00";
  ctx.font = "20px Arial";
  ctx.textAlign = "center";
  ctx.fillText("Parabéns, você conseguiu atravessar todo percurso!", canvas.width / 2, canvas.height / 2);
  restartButton.style.display = 'block';
}
