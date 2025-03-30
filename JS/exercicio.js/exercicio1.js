let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

//inicio
ctx.beginPath();
ctx.lineWidth = 2;
ctx.fillStyle = 'blue';
ctx.strokeStyle = 'blue';
ctx.moveTo(0,0);
ctx.lineTo(150,150);
ctx.fillRect(0,0,30,30);
ctx.stroke();
ctx.closePath();

ctx.beginPath();
ctx.lineWidth = 2;
ctx.fillStyle = 'red';
ctx.strokeStyle = 'red';
ctx.moveTo(300,0);
ctx.lineTo(150,150);
ctx.fillRect(270,0,30,30);
ctx.stroke();
ctx.closePath();

ctx.beginPath();
ctx.lineWidth = 2;
ctx.fillStyle = 'black';
ctx.fillRect(240,270,60,30);
ctx.closePath();

ctx.beginPath();
ctx.lineWidth = 2;
ctx.fillStyle = 'black';
ctx.fillRect(270,240,30,60);
ctx.closePath();

ctx.beginPath();
ctx.lineWidth = 2;
ctx.fillStyle = 'yellow';
ctx.fillRect(0,270,60,30);
ctx.closePath();

ctx.beginPath();
ctx.lineWidth = 2;
ctx.fillStyle = 'yellow';
ctx.fillRect(0,240,30,30);
ctx.closePath();

ctx.beginPath();
ctx.lineWidth = 2;
ctx.fillStyle = 'yellow';
ctx.fillRect(10,435,30,30);
ctx.closePath();

ctx.beginPath();
ctx.lineWidth = 1;
ctx.strokeStyle = 'green';
ctx.strokeRect(0,150,500,1);
ctx.closePath();

ctx.beginPath();
ctx.lineWidth = 3;
ctx.strokeStyle = 'gray';
ctx.moveTo(150,300);
ctx.lineTo(150,150);
ctx.stroke();
ctx.closePath();

ctx.beginPath();
ctx.lineWidth = 2;
ctx.fillStyle = 'red';
ctx.fillRect(120,151,30,30);
ctx.closePath();

ctx.beginPath();
ctx.lineWidth = 2;
ctx.fillStyle = 'aqua';
ctx.fillRect(0,119,30,30);
ctx.closePath();

ctx.beginPath();
ctx.lineWidth = 2;
ctx.fillStyle = 'aqua';
ctx.fillRect(0,152,30,30);
ctx.closePath();

ctx.beginPath();
ctx.lineWidth = 2;
ctx.fillStyle = 'aqua';
ctx.fillRect(270,152,30,30);
ctx.closePath();

// arcos 1
ctx.beginPath();
ctx.lineWidth = 2;
ctx.fillStyle = 'yellow';
ctx.strokeStyle = 'green';
ctx.arc(75,225,18,1*Math.PI,3*Math.PI,);
ctx.fill();
ctx.stroke();
ctx.closePath();

// arcos 2
ctx.beginPath();
ctx.lineWidth = 2;
ctx.fillStyle = 'yellow';
ctx.strokeStyle = 'green';
ctx.arc(225,225,18,1*Math.PI,3*Math.PI,);
ctx.fill();
ctx.stroke();
ctx.closePath();

// arcos 3
ctx.beginPath();
ctx.lineWidth = 2;
ctx.fillStyle = 'aqua';
ctx.strokeStyle = 'green';
ctx.arc(150,300,35,1*Math.PI,3*Math.PI,);
ctx.fill();
ctx.stroke();
ctx.closePath();

// arcos 4
ctx.beginPath();
ctx.lineWidth = 2;
ctx.fillStyle = 'aqua';
ctx.strokeStyle = 'green';
ctx.arc(150,110,18,1*Math.PI,3*Math.PI,);
ctx.fill();
ctx.stroke();
ctx.closePath();

// arcos 5
ctx.beginPath();
ctx.lineWidth = 2;
ctx.strokeStyle = 'green';
ctx.arc(150,300,75,1*Math.PI,1.5*Math.PI,);
ctx.stroke();
ctx.closePath();

// arcos 6
ctx.beginPath();
ctx.lineWidth = 2;
ctx.strokeStyle = 'green';
ctx.arc(150,300,55,1.5*Math.PI,1*Math.PI,);
ctx.stroke();
ctx.closePath();

// arcos 7
ctx.beginPath();
ctx.lineWidth = 2;
ctx.strokeStyle = 'green';
ctx.arc(150,150,75,1*Math.PI,2*Math.PI,);
ctx.stroke();
ctx.closePath();

// arcos 8
ctx.beginPath();
ctx.lineWidth = 2;
ctx.strokeStyle = 'green';
ctx.arc(183, 150, 80, 1.65*Math.PI, 2 * Math.PI); 
ctx.stroke();
ctx.closePath();

// arcos 1/4 de um círculo
ctx.beginPath();
ctx.lineWidth = 2;
ctx.strokeStyle = 'green';
ctx.arc(120, 150, 80, 1 * Math.PI, 1.34 * Math.PI);
ctx.stroke();
ctx.closePath();

ctx.beginPath();
ctx.fillStyle = 'black';
ctx.font = "20px Arial"
ctx.textAlign = "center";
ctx.fillText("Canvas",150,40);
ctx.closePath();




// Pegando o primeiro canvas
let canvas1 = document.getElementById('canvas1');
let ctx1 = canvas1.getContext('2d');

// Fundo (céu)
ctx1.fillStyle = 'aqua'; // Verde claro
ctx1.fillRect(0, 0, canvas1.width, canvas1.height);

// Sol
ctx1.beginPath();
ctx1.fillStyle = 'yellow';
ctx1.arc(230, 70, 40, 0, Math.PI * 2);
ctx1.fill();
ctx1.closePath();

// Estrada
ctx1.fillStyle = 'gray';
ctx1.fillRect(0, 200, canvas1.width, 100);

ctx1.fillStyle = "#4285F4"; 
        
ctx1.fillStyle = "#4285F4";
        
// Desenha o L no canto inferior esquerdo
ctx1.beginPath();
ctx1.moveTo(50, 150);
ctx1.lineTo(50, 250);
ctx1.lineTo(150, 250);
ctx1.lineTo(150, 200);
ctx1.lineTo(100, 200);
ctx1.lineTo(100, 150);
ctx1.closePath();
ctx1.fill();

// Cantos arredondados
ctx1.beginPath();
ctx1.arc(50, 250, 50, Math.PI, Math.PI / 2, true);
ctx1.arc(150, 250, 50, Math.PI / 2, 0, true);
ctx1.fill();

// Casa (base)
ctx1.fillStyle = '#8B4513'; // Marrom
ctx1.fillRect(100, 130, 80, 70);

// Telhado
ctx1.beginPath();
ctx1.fillStyle = '#FF6347'; // Vermelho
ctx1.moveTo(100, 130);
ctx1.lineTo(140, 90);
ctx1.lineTo(180, 130);
ctx1.fill();
ctx1.closePath();

// Porta
ctx1.fillStyle = '#5C4033'; // Marrom escuro
ctx1.fillRect(130, 165, 20, 35);

// Janelas
ctx1.fillStyle = 'skyblue';
ctx1.fillRect(110, 145, 20, 20);
ctx1.fillRect(150, 145, 20, 20);

// Árvores (troncos)
ctx1.fillStyle = '#8B4513';
ctx1.fillRect(50, 170, 10, 30);
ctx1.fillRect(260, 220, 10, 30);

// Árvores (folhagem)
ctx1.beginPath();
ctx1.fillStyle = 'green';
ctx1.arc(55, 160, 20, 0, Math.PI * 2);
ctx1.fill();
ctx1.closePath();

ctx1.beginPath();
ctx1.fillStyle = 'green';
ctx1.arc(265, 200, 20, 0, Math.PI * 2);
ctx1.fill();
ctx1.closePath();





