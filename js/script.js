//Page elements
const startBtn = document.getElementById('startBtn');
const nextBtn = document.getElementById('nextBtn');
const questionsContainerEl = document.getElementById('questionContainer');
const questionEl = document.getElementById('question')
const answerButtonEl = document.getElementById('answerButton')
var highscoreDiv = document.getElementById('highscoreDiv')
var gameOver = document.getElementById('game-over');
var scoreDiv = document.getElementById('score');
var submitBtn = document.getElementById('submit');
var submittedScores = document.getElementById('submittedScores');
var userScore = document.getElementById('currentScore');

let randomQuestions, currentQuestionIndex;
var correctAnswers = 0;
var timer = 30;

//Functionality for start and next buttons.
startBtn.addEventListener('click', startQuiz);

nextBtn.addEventListener('click', () => {
    currentQuestionIndex++
    nextQuestion()
});

//functionality for submit button
submitBtn.addEventListener('click', submitScore);

function submitScore() {
    var initials = document.querySelector('#name').value;
    var highScore = correctAnswers;
    var scoreString = initials + " - " + highScore;
    localStorage.setItem('score', scoreString);
    showScores();
};

function showScores() {
    var scores = localStorage.getItem('score');
    submittedScores.textContent = scores;
    submittedScores.classList.remove('hide');
};


//Starts the quiz
function startQuiz() {
highScore.classList.add('hide');
buttonStart.classList.add('hide');
randomQuestions = questions.sort(() => Math.random() - .5)
currentQuestionIndex = 0
questionsContainerEl.classList.remove('hide');
nextQuestion()
};

//timer
function myTimer() {
    if (timer > 0) {
        timer--;
    } else {
        timer = 0;
        clearInterval(timer);
        return 0;
    }
    var countdown = document.getElementById('timer');
    countdown.textContent = timer;
};
setInterval(myTimer, 1000);

//moves to the next question
function nextQuestion() {
    stateReset()
    displayQuestion(randomQuestions[currentQuestionIndex])
};

//displays the questions
function displayQuestion(question) {
    questionEl.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', choiceAnswer);
        answerButtonEl.appendChild(button);
    });
};

// Show whether chosen answer is correct and increase score with each correct answer
function choiceAnswer(e) {
    const buttonSelected = e.target;
    const correct = buttonSelected.dataset.correct;

    // Correct answer increases score
    if (correct) {
        correctAnswers++;
    } else {
        timer -= 4;
    };

    Array.from(answerButtonEl.children).forEach(button => {
        setStatus(button, button.dataset.correct);
    })
    if (randomQuestions.length > currentQuestionIndex + 1) {
        buttonNext.classList.remove('hide');
    } else {
        // End of Quiz
        buttonStart.innerText = 'Restart';
        buttonStart.classList.remove('hide');
        scoreDiv.classList.remove('hide');
        questionsContainerEl.classList.add('hide');
        userScore.textContent = correctAnswers;
    };
};

// Sets class depending on traits of the answer
function setStatus(element, correct) {
    clearStatus(element);
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    };
};

// Reset class for the next question
function clearStatus(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
};

function stateReset() {
   buttonNext.classList.add('hide')
   while (answerButtonEl.firstChild) {
    answerButtonEl.removeChild(answerButtonEl.firstChild)
   }
};


const questions = [
    {
        question: 'Who created JavaScript?',
        answers: [
            {text: 'Microsoft', correct: false},
            {text: 'Sun Microsystems', correct: false},
            {text: 'Oracle', correct: false},
            {text: 'Netscape', correct: true}
        ]
    },
    {
        question: 'How long did Brendan Eich take to write the JavaScript programming language?',
        answers: [
            {text: '10 days', correct: true},
            {text: '2 weeks', correct: false},
            {text: '2 months', correct: false},
            {text: '10 months', correct: false}
        ]
    },
    {
        question: 'Which of the following is not a reserved word in JavaScript?',
        answers: [
            {text: 'undefined', correct: true},
            {text: 'finally', correct: false},
            {text: 'throw', correct: false},
            {text: 'default', correct: false}
        ]
    },
    {
        question: 'JavaScript wasn’t always called that. What other name has it been released under?',
        answers: [
            {text: 'Mocha', correct: true},
            {text: 'BScript', correct: false},
            {text: 'Latte', correct: false},
            {text: 'Spidermonkey', correct: false}
        ]
    }
];