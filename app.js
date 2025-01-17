let numsSorteados = [];
let numeroLimite = 100;
let numeroSecreto = gerarNumeroAleatorio();
let countChutes = 1;

function exibirTextNaTela(tag, texto) {
      let campo = document.querySelector(tag);
      campo.innerHTML = texto;
      if ('speechSynthesis' in window) {
            let utterance = new SpeechSynthesisUtterance(texto);
            utterance.lang = 'pt-BR';
            utterance.rate = 1.5;
            window.speechSynthesis.speak(utterance);
      } else {
            console.log("Web Speech API não suportada neste navegador.");
      }
}

function verificarChute() {
      let chute = document.querySelector('input').value;
      if (chute == numeroSecreto) {
            exibirTextNaTela('h1', 'Acertou!');
            let tentativas = countChutes > 1 ? 'tentativas!' : 'tentativa!';
            let textoTentativas = `Você descobriu o número secreto com ${countChutes} ${tentativas}`
            exibirTextNaTela('p', textoTentativas)
            document.getElementById('reiniciar').removeAttribute('disabled');

      } else {
            exibirTextNaTela('p', 'Número secreto é maior')
            limparCampo()
            countChutes++;
      }
}

function exibirMensagens() {
      exibirTextNaTela('h1', 'Jogo do número secreto');
      exibirTextNaTela('p', 'Escolha um número entre 1 e 10:');
}

exibirMensagens();

function gerarNumeroAleatorio() {
      let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
      let qtdElementosLista = numsSorteados.length;

      if (qtdElementosLista == numeroLimite) {
            numsSorteados = [];
      }

      if (numsSorteados.includes(numeroEscolhido)) {
            return gerarNumeroAleatorio();
      } else {
            numsSorteados.push(numeroEscolhido);
            console.log(numsSorteados);
            return numeroEscolhido;
      }
}

function limparCampo() {
      let chute = document.querySelector('input');
      chute.value = ' ';
}

function reiniciarJogo() {
      numeroSecreto = gerarNumeroAleatorio()
      exibirMensagens();
      limparCampo()
      countChutes = 1;
      document.getElementById('reiniciar').setAttribute('disabled', true)
}