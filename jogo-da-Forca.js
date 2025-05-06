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
const jogarNovamente = require("./jogar-novamente");
const reiniciarJogo = require("./reiniciar-jogo");

function perguntarUsuario(pergunta) {
  return new Promise((resolve) => {
    rl.question(pergunta, (resposta) => {
      resolve(resposta);
    });
  });
}

async function main() {
  console.log("Bem vindo ao Jogo da Forca\n");
  const acao = await perguntarUsuario("\n1. Jogar\n2. Encerrar\n");

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

  let letraErrada = [];
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
    }

    if (letraErrada.find((elemento) => elemento == letraEscolhida)) {
      console.log("Você já ultilizou está letra!!!\nTente novamente\n");
      console.log(`Letras erradas: ${letraErrada}`);

      continue;
    }
    if (!letraContidaNaPalavra) {
      letraErrada.push(letraEscolhida);
      tentativas -= 1;

      console.log(letraErrada);
      console.log("Errou!!! Tente novamente");
      console.log(`Suas tentativas: ${tentativas}`);
    }
    while (resultado == palavraJogo) {
      console.log("Parabéns!!! Você adivinhou a palavra");
      const acao2 = await perguntarUsuario("1. Menu\n2. Encerrar\n");

      await reiniciarJogo(jogarNovamente, acao2, main(), rl);
    }
  }

  console.log("GAME OVER");
  const acao2 = await perguntarUsuario("1. Menu\n2. Encerrar\n");
  await reiniciarJogo(jogarNovamente, acao2, main(), rl);
}

main();
