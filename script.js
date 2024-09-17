// Dados de exemplo - substitua com seus próprios dados ou carregue de um arquivo
const questions = [
    {
        question: "Qual a capital do Brasil?",
        answers: ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador", "Belo Horizonte"],
        correctAnswer: 2
    },
    {
        question: "Qual o maior planeta do sistema solar?",
        answers: ["Terra", "Marte", "Júpiter", "Saturno", "Urano"],
        correctAnswer: 2
    }
    // Adicione mais perguntas conforme necessário
];

let currentQuestionIndex = 0;
let userAnswers = [];
const totalQuestions = questions.length;

function showQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById('question-text').innerText = question.question;
    const answersContainer = document.getElementById('answers-container');
    answersContainer.innerHTML = '';
    question.answers.forEach((answer, index) => {
        answersContainer.innerHTML += `
            <label>
                <input type="radio" name="answer" value="${index}">
                ${String.fromCharCode(65 + index)}. ${answer}
            </label>
        `;
    });
}

function nextQuestion() {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (selectedAnswer) {
        userAnswers[currentQuestionIndex] = parseInt(selectedAnswer.value, 10);
        currentQuestionIndex++;
        if (currentQuestionIndex < totalQuestions) {
            showQuestion();
        } else {
            showResult();
        }
    } else {
        alert("Por favor, selecione uma resposta.");
    }
}

function showResult() {
    const resultContainer = document.getElementById('result-container');
    const resultTitle = document.getElementById('result-title');
    const resultDetails = document.getElementById('result-details');
    let correctAnswers = 0;

    questions.forEach((question, index) => {
        const userAnswer = userAnswers[index];
        if (userAnswer === question.correctAnswer) {
            correctAnswers++;
        }
    });

    const percentage = (correctAnswers / totalQuestions) * 100;
    resultTitle.className = percentage >= 70 ? 'approved' : 'rejected';
    resultTitle.innerHTML = percentage >= 70 ? "Aprovado! 😊" : "Reprovado! 😞";

    resultDetails.innerHTML = `
        <h3>Resultado Final:</h3>
        <p><strong>Total de Perguntas:</strong> ${totalQuestions}</p>
        <p><strong>Respostas Corretas:</strong> ${correctAnswers}</p>
        <p><strong>Percentual:</strong> ${percentage.toFixed(2)}%</p>
        <h3>Detalhes das Respostas:</h3>
        ${questions.map((question, index) => `
            <div>
                <p><strong>Pergunta:</strong> ${question.question}</p>
                <p><strong>Resposta Correta:</strong> ${String.fromCharCode(65 + question.correctAnswer)}. ${question.answers[question.correctAnswer]}</p>
                <p><strong>Sua Resposta:</strong> ${userAnswers[index] !== undefined ? String.fromCharCode(65 + userAnswers[index]) + '. ' + question.answers[userAnswers[index]] : 'Nenhuma resposta selecionada'}</p>
            </div>
        `).join('')}
    `;

    resultContainer.classList.remove('hidden');
    document.getElementById('question-container').classList.add('hidden');
}

function restartSimulado() {
    window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', function() {
    showQuestion();
});
