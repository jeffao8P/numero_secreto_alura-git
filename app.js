function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
     if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.6;
        window.speechSynthesis.speak(utterance);
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function verificarChute() {
    let chute = document.querySelector('input').value;
    console.log(`chute ${tentativas}: ${chute}`);

    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentiva';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor.');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior.');
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * nMax + 1); // Gera o número pseudo aleatório
    let elementosNaLista = numerosSorteados.length; // Adiciona o valor da quantidade de elementos na lista na variável 
    if (elementosNaLista == nMax) { // Se a quatindade de números na lista de exclusão for igual a quantidade de números possíveis
        numerosSorteados = []; // Limpa a lista caso todos os números já tenham sido sorteados uma vez
    }
    if (numerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio(nMax); // Se o número sorteado já foi sorteado uma vez, chama a função de sorteio de novo
    } else {
        numerosSorteados.push(numeroEscolhido); // Adiciona o número sorteado na lista de exclusão
        console.log(numerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    console.log(numeroSecreto);
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', `Escolha um número entre 1 e ${nMax}`);
}

let nMax = 1000;
let numerosSorteados = [];
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;
console.log(numeroSecreto);
exibirMensagemInicial();

/*     let titulo = document.querySelector('h1');
    titulo.innerHTML = 'Jogo do número secreto';

    let paragrafo = document.querySelector('p');
    paragrafo.innerHTML = 'Escolha um número entre 1 e 100'; */