let currentQuestionIndex = 0;

let time = questions.length * 15;

let timerID;



let questionsElement = document.getElementById('questions');
let timerElement = document.getElementById('time');
let choicesElement = document.getElementById('choices');
let submitButton =  document.getElementById('submit');
let startButton = document.getElementById('start');
let initialElement = document.getElementById('initials');
let feedBackElement = document.getElementById('feedback');

let sfxCorrect = new Audio("./assets/sfx/correct.wav");
let sfxWrong = new Audio("./assets/sfx/incorrect.wav")


function questionClick(){
    if(this.value !== questions[currentQuestionIndex].answer){
        time -= 15;

        if(time < 0){
            time = 0;
        }

        timerElement.textContent = time;

        feedBackElement.textContent = "WRONG"
        sfxWrong.play()
    } else {
        sfxCorrect.play()
        feedBackElement.textContent = "CORRECT"

    }


    feedBackElement.setAttribute('class', 'feedback');

    setTimeout(function(){
        feedBackElement.setAttribute('class', 'feedback hide')
    }, 1000);

    currentQuestionIndex++;

    if(currentQuestionIndex === questions.length){
        quizEnd()
    } else{
        getQuestion()
    }

}

function getQuestion(){
    let currentQuestion = questions[currentQuestionIndex];
    let titleElement = document.getElementById('question-title');
    titleElement.textContent = currentQuestion.title;

    choicesElement.innerHTML = "";

    currentQuestion.choices.forEach(function(choice, index) {
        let choicesButton = document.createElement('button');

        choicesButton.setAttribute('class', 'choice');
        choicesButton.setAttribute('value', choice);

        choicesButton.textContent = `${index + 1}. ${choice}`
        
        choicesButton.addEventListener('click', questionClick);

        choicesElement.append(choicesButton);

    })

}


function startQuiz(){
    let startScreenElement = document.getElementById('start-screen');
    startScreenElement.setAttribute('class', 'hide');

    questionsElement.removeAttribute('class');

    timerID = setInterval(clockTick, 1000);

    timerElement.textContent = time;

    getQuestion();


}

function quizEnd(){
    clearInterval(timerID);

    let endScreenElement = document.getElementById('end-screen');
    endScreenElement.removeAttribute('class')

    let finalScoreElement = document.getElementById('final-score')
    finalScoreElement.textContent = time

    questionsElement.setAttribute('class', "hide")


}

function clockTick(){
    time--;
    timerElement.textContent = time;

    if(time <= 0){
        quizEnd();
    }
}

function saveHighScore(){
    let initials = initialElement.value.trim();

    if (initials !== ""){
       let highScore = JSON.parse(localStorage.getItem('highscores')) || []; 
       let newScore = {
        score: time,
        initials: initials
       }

       highScore.push(newScore);
       localStorage.setItem('highscores', JSON.stringify(highScore));
    }

    window.location.href = 'highscores.html';
}

function checkForEnter(event){
    if (event.ket === "Enter"){
        saveHighScore();
    }
}

startButton.addEventListener("click", startQuiz);

submitButton.addEventListener("click", saveHighScore);

initialElement.addEventListener("keyup", checkForEnter);