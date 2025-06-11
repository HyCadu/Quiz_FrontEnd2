// Variáveis globais
let indicePerguntaAtual = 0;
let pontuacao = 0;
let dadosQuiz = [];

// Elementos do DOM
const containerPergunta = document.getElementById('container-pergunta');
const containerOpcoes = document.getElementById('container-opcoes');
const elementoFeedback = document.getElementById('feedback');
const botaoProximo = document.getElementById('botao-proximo');
const botaoVoltar = document.getElementById('botao-voltar');
const indicadorProgresso = document.getElementById('indicador-progresso');
const containerQuiz = document.getElementById('quiz-container');
const containerPontuacao = document.getElementById('container-pontuacao');
const elementoPontuacaoFinal = document.getElementById('pontuacao-final');
const botaoReiniciar = document.getElementById('botao-reiniciar');

// Função para embaralhar um array (Fisher-Yates Shuffle)
function embaralharArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Função para buscar as perguntas do arquivo JSON
async function carregarPerguntas() {
  try {
    const resposta = await fetch('questions.json');
    if (!resposta.ok) {
      throw new Error(`Erro HTTP! status: ${resposta.status}`);
    }
    dadosQuiz = await resposta.json();

    // Embaralha as perguntas
    embaralharArray(dadosQuiz);

    iniciarQuiz();
  } catch (erro) {
    console.error("Erro ao carregar os dados do quiz:", erro);
    containerPergunta.innerHTML = "<p class='text-red-500 text-center'>Erro ao carregar as perguntas. Verifique o console.</p>";
  }
}

// Função para carregar uma pergunta
function carregarPergunta() {
  // Atualiza a interface
  containerPontuacao.classList.add('hidden');
  containerPergunta.classList.remove('hidden');
  containerOpcoes.classList.remove('hidden');
  indicadorProgresso.classList.remove('hidden');

  // Obtém os dados da pergunta atual
  const dadosPergunta = dadosQuiz[indicePerguntaAtual];
  indicadorProgresso.textContent = `Pergunta ${indicePerguntaAtual + 1} de ${dadosQuiz.length}`;

  // Exibe a pergunta
  const perguntaSanitizada = dadosPergunta.question.replace(/</g, "&lt;");
  containerPergunta.innerHTML = `<p class='text-lg font-medium'>${indicePerguntaAtual + 1}. ${perguntaSanitizada}</p>`;

  // Exibe as opções
  containerOpcoes.innerHTML = '';
  for (const chave in dadosPergunta.options) {
    const botaoOpcao = document.createElement('button');
    botaoOpcao.classList.add('botao-opcao', 'w-full', 'bg-gray-700', 'hover:bg-gray-600', 'text-white', 'py-3', 'px-4', 'rounded', 'text-left');
    const opcaoSanitizada = dadosPergunta.options[chave].replace(/</g, "&lt;");
    botaoOpcao.innerHTML = `${chave.toUpperCase()}) ${opcaoSanitizada}`;
    botaoOpcao.dataset.value = chave;
    botaoOpcao.addEventListener('click', () => verificarResposta(chave, botaoOpcao));
    containerOpcoes.appendChild(botaoOpcao);
  }

  // Oculta o feedback e o botão "Próximo"
  elementoFeedback.classList.remove('feedback-visivel');
  elementoFeedback.classList.add('feedback-oculto');
  elementoFeedback.textContent = '';
  botaoProximo.classList.add('hidden');

  // Exibe ou oculta o botão "Voltar"
  if (indicePerguntaAtual > 0) {
    botaoVoltar.classList.remove('hidden');
  } else {
    botaoVoltar.classList.add('hidden');
  }
}

// Função para verificar a resposta selecionada
function verificarResposta(selecionada, botao) {
  const dadosPergunta = dadosQuiz[indicePerguntaAtual];
  const estaCorreta = selecionada === dadosPergunta.answer;

  // Desabilita todos os botões de opção
  const botoes = containerOpcoes.querySelectorAll('button');
  botoes.forEach(btn => {
    btn.disabled = true;
    btn.classList.remove('hover:bg-gray-600');
    btn.classList.add('opacity-70', 'cursor-not-allowed');
  });

  // Exibe o feedback
  const explicacaoSanitizada = dadosPergunta.explanation.replace(/</g, "&lt;");
  if (estaCorreta) {
    pontuacao++;
    botao.classList.add('correto');
    elementoFeedback.innerHTML = `<span class="text-green-400">✔️ Correto!</span> ${explicacaoSanitizada}`;
  } else {
    botao.classList.add('incorreto');
    const botaoCorreto = containerOpcoes.querySelector(`button[data-value="${dadosPergunta.answer}"]`);
    if (botaoCorreto) {
      botaoCorreto.classList.add('destaque-correto');
    }
    elementoFeedback.innerHTML = `<span class="text-red-400">❌ Incorreto!</span> Resposta correta: <strong>${dadosPergunta.answer.toUpperCase()}) ${dadosPergunta.answer_text}</strong>. <br> ${explicacaoSanitizada}`;
  }

  elementoFeedback.classList.remove('feedback-oculto');
  elementoFeedback.classList.add('feedback-visivel');
  botaoProximo.classList.remove('hidden');
}

// Função para exibir a pontuação final
function exibirPontuacaoFinal() {
  containerPergunta.classList.add('hidden');
  containerOpcoes.classList.add('hidden');
  elementoFeedback.classList.add('hidden');
  botaoProximo.classList.add('hidden');
  botaoVoltar.classList.add('hidden');
  indicadorProgresso.classList.add('hidden');

  const porcentagem = ((pontuacao / dadosQuiz.length) * 100).toFixed(1);
  elementoPontuacaoFinal.innerHTML = `Você completou o quiz!<br>Pontuação final: ${pontuacao} de ${dadosQuiz.length} (${porcentagem}%)`;
  containerPontuacao.classList.remove('hidden');
}

// Função para iniciar o quiz
function iniciarQuiz() {
  pontuacao = 0;
  indicePerguntaAtual = 0;
  carregarPergunta();
}

// Eventos dos botões
botaoProximo.addEventListener('click', () => {
  indicePerguntaAtual++;
  if (indicePerguntaAtual < dadosQuiz.length) {
    carregarPergunta();
  } else {
    exibirPontuacaoFinal();
  }
});

botaoVoltar.addEventListener('click', () => {
  if (indicePerguntaAtual > 0) {
    indicePerguntaAtual--;
    carregarPergunta();
  }
});

botaoReiniciar.addEventListener('click', () => {
  iniciarQuiz();
});

// Carrega as perguntas ao iniciar
carregarPerguntas();
