const startBtn = document.getElementById('startBtn');
const buttonNext = document.getElementById('nextButton');
const questionsContainerEl = document.getElementById('questionsDiv');
const questionEl = document.getElementById('question')
const answerButtonEl = document.getElementById('answerButton')

startBtn.addEventListener('click', startQuiz)

function startQuiz() {
buttonStart.classList.add('hide');
randomQuestions = questions.sort(() => Math.random() - .5)
currentQuestionIndex = 0
questionsContainerEl.classList.remove('hide');
nextQuestion()
}

function nextQuestion() {
    stateReset()
    displayQuestion(randomQuestions[currentQuestionIndex])
}

function displayQuestion(question) {
    questionEl.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', choiceAnswer)
        answerButtonEl.appendChild(button)
    })
} 

function stateReset() {
   buttonNext.classList.add('hide')
   while (answerButtonEl.firstChild) {
    answerButtonEl.removeChild(answerButtonEl.firstChild)
   }
}


function answer(e) {

}

const questions = [
    {
        question: 'Test?',
        answers: [
            {text: 'True', correct: true},
            {text: 'False', correct: false},
            {text: 'False', correct: false},
            {text: 'False', correct: false}
        ]
    }
]