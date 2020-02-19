let gameTimer;
const numOfQuestions = questions.length;
let time = 60;
let currentQuestion = 0;
let correctAnswers = 0;
let wrongAnswers = 0;

function initGame() {
    correctAnswers = 0;
    wrongAnswers = 0;
    currentQuestion = 0;

    document.getElementById('start').classList.add('hidden');
    document.getElementById('quiz_row').classList.remove('hidden');
    document.getElementById('time').classList.remove('hidden');
    generateQuestion();

    gameTimer = setInterval(function() {
        time--;
        if (time <= 0) {
            document.getElementById('time').innerHTML = 'Game over!';
            endGame();
        } else {
            document.getElementById('time').innerHTML = time;
        }
    }, 1000);
}

function generateQuestion() {
    if (currentQuestion === numOfQuestions) {
        endGame();
    } else {
        document.getElementById('answers').innerHTML = '';

        document.getElementById('question').innerHTML =
            questions[currentQuestion].question;

        for (
            let i = 0;
            i < questions[currentQuestion].potential_answers.length;
            i++
        ) {
            const el = document.createElement('p');
            el.innerHTML =
                questions[currentQuestion].potential_answers[i].answer;
            el.setAttribute(
                'data-answer-id',
                questions[currentQuestion].potential_answers[i].id
            );
            el.addEventListener('click', checkAnswer);
            document.getElementById('answers').appendChild(el);
        }
    }
}

function endGame() {
    clearInterval(gameTimer);
    document.getElementById('quiz_row').classList.add('hidden');

    const resultText = document.createElement('p');
    resultText.innerHTML = 'Quiz Complete!';

    const resultScore = document.createElement('p');
    resultScore.innerHTML =
        'Correct answers: ' + correctAnswers + '/' + questions.length;

    document.getElementById('announcement').appendChild(resultText);
    document.getElementById('announcement').appendChild(resultScore);
}

function checkAnswer() {
    const selectedAnswer = this.getAttribute('data-answer-id');
    console.log('sel', selectedAnswer);
    console.log('ans', questions[currentQuestion].correct_answer);

    if (selectedAnswer === questions[currentQuestion].correct_answer) {
        correctAnswers++;

        document
            .querySelector(`[data-answer-id*="${selectedAnswer}"]`)
            .classList.add('correct');

        document.getElementById('correct_answers').innerHTML = correctAnswers;
        document.getElementById('announcement').innerHTML =
            'Correct!! +10 seconds';

        time = time + 10;
    } else {
        wrongAnswers++;

        document
            .querySelector(`[data-answer-id*="${selectedAnswer}"]`)
            .classList.add('wrong');

        document.getElementById('wrong_answers').innerHTML = wrongAnswers;
        document.getElementById('announcement').innerHTML =
            'Wrong!! -10 seconds';
        time = time - 10;
        console.log('incorrect');
    }

    setTimeout(function() {
        currentQuestion++;
        generateQuestion();
    }, 1500);
}

function writePassword() {
    console.log('write');
}

document.getElementById('start').addEventListener('click', initGame);
