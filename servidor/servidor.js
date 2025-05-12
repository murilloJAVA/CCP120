const express = require('express');
const path = require('path');
const app = express();
const http = require('http');
const bodyParser = require('body-parser');

const server = http.createServer(app);
const PORT = 80;

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

server.listen(PORT);
console.log("servidor rodando na porta " + PORT)

// Define o diretório onde estão os arquivos 
app.use(express.static(path.join(__dirname, '/public/')));
app.use(express.static(path.join(__dirname, '/views/')));

app.get('/', (req, res) => {
    res.redirect('projects.html')
    // res.sendFile(path.join(__dirname, '../atv02-esqDoSite(projects)', 'projects.html'));
  });

let usuarioCadastrado = {}

  app.post('/cadastra', (req, res) => {
    usuarioCadastrado.nome = req.body.nome;
    usuarioCadastrado.sobrenome = req.body.sobrenome;
    usuarioCadastrado.nascimento = req.body.nascimento;
    usuarioCadastrado.estado_civil = req.body.estado_civil;

    res.redirect('login.html')
  })

  app.get('/login', (req, res) => {
    let nomeLogin = req.query.nomeLogin;
    let sobrenomeLogin = req.query.sobrenomeLogin;
    let nascimentoLogin = req.query.nascimentoLogin;
    let estado_civilLogin = req.query.estado_civilLogin;

    if(
      usuarioCadastrado.nome === nomeLogin &&
      usuarioCadastrado.sobrenome === sobrenomeLogin &&
      usuarioCadastrado.nascimento === nascimentoLogin &&
      usuarioCadastrado.estado_civil === estado_civilLogin
    ){
      res.render('resposta_login', {nomeLogin, sobrenomeLogin, nascimentoLogin, estado_civilLogin})
    } else {
      res.send("dados inválidos");
  }
  })


