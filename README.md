# Quiz FrontEnd @

Este é um projeto de um quiz interativo desenvolvido em HTML, CSS e JavaScript. O objetivo do quiz é testar os conhecimentos dos usuários sobre o segundo bimestre de FrontEnd.

## Funcionalidades

- Carregamento dinâmico de perguntas a partir de um arquivo JSON.
- Feedback visual para respostas corretas e incorretas.
- Exibição de explicações para cada resposta.
- Navegação entre perguntas com botões de "Próxima" e "Voltar".
- Exibição da pontuação final ao término do quiz.
- Opção de reiniciar o quiz.

## Estrutura do Projeto

- `index.html`: Contém o código principal do quiz.
- `questions.json`: Arquivo JSON com as perguntas, opções e respostas do quiz.

## Como Executar

1. Certifique-se de que você tem um navegador moderno instalado.
2. Abra o arquivo `index.html` no navegador.
3. O quiz será carregado automaticamente.

## Como Adicionar Novas Perguntas

1. Edite o arquivo `questions.json`.
2. Adicione novas perguntas no formato:

```json
{
  "question": "Sua pergunta aqui",
  "options": {
    "a": "Opção A",
    "b": "Opção B",
    "c": "Opção C",
    "d": "Opção D"
  },
  "answer": "a", // Letra da resposta correta
  "answer_text": "Texto da resposta correta",
  "explanation": "Explicação sobre a resposta"
}
```

## Tecnologias Utilizadas

- HTML5
- CSS3 (com Tailwind CSS)
- JavaScript

## Autor

Desenvolvido por: Cadu
