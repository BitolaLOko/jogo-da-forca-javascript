const { join } = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const verificarLetraNaPalavra = require("./verificar-letra-na-palavra");
const substituirLetraNaPosicacao = require("./substituir-letra-na -posicao");
const exibirPosicoes = require("./exibir-posicoes");
const obterPalavraAleatoria = require("./palavra-aleatoria");

function perguntarUsuario(pergunta) {
  return new Promise((resolve) => {
    rl.question(pergunta, (resposta) => {
      resolve(resposta);
    });
  });
}

async function main() {
  console.log("Bem vindo ao Jogo da Forca\n");
  const acao = await perguntarUsuario("1. Jogar\n2. Encerrar\n");

  if (acao === "2") {
    console.log("Obrigado por Jogar!!!");
    rl.close();

    return;
  }
  const listaPalavras = [
    "cachorro",
    "gato",
    "passaro",
    "elefante",
    "zebra",
    "hipopotamo",
    "pinguim",
    "girafa",
  ];
  const palavraJogo = obterPalavraAleatoria(listaPalavras);
  let resultado = "";

  const palavraArray = palavraJogo.split("");
  palavraArray.forEach(() => {
    resultado = `${resultado}_`;
  });

  exibirPosicoes(palavraJogo);

  let tentativas = palavraJogo.length;
  while (tentativas > 0) {
    const letraEscolhida = await perguntarUsuario("Escolha um letra:");

    const letraContidaNaPalavra = verificarLetraNaPalavra(
      palavraJogo,
      letraEscolhida
    );

    if (letraContidaNaPalavra) {
      resultado = substituirLetraNaPosicacao(
        resultado,
        palavraJogo,
        letraEscolhida
      );
      console.log(resultado);
      if (resultado == palavraJogo) {
        console.log("Parabéns!!!. Você adivinhou a palavra");
        rl.close();
        return;
      }
    } else {
      tentativas -= 1;
      console.log("Errou!!! Tente novamente");
      console.log(`Suas tentativas: ${tentativas}`);
    }
  }

  console.log("GAME OVER");
  rl.close();
}

main();
