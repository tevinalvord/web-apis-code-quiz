// create rightWrongAnswerDiv give it a class
var rightWrongAnswerDiv = document.createElement("div");
rightWrongAnswerDiv.className = "right-wrong-answer-div";
// create rightWrongAnswerPara give it a class
var rightWrongAnswerPara = document.createElement("p");
rightWrongAnswerPara.className = "right-wrong-answer-para";

var startQuizButton = document.querySelector("#start-quiz");
var quizChallenge = document.querySelector("#quiz-challenge");
var sectionEl = document.querySelector("#section-wrapper");
var quizInfoEl = document.querySelector("#quiz-wrapper");
var pageContentEl = document.querySelector("#page-content");
var headerContentEl = document.querySelector("#header-div")
var time = 75;
var count = 0;
var timerInterval = null;
var highScores = [];
var quizInfo = [
    {
        question: "Commonly used data types DO Not include:",
        answer1: "1. strings",
        answer2: "2. booleans",
        answer3: "3. alerts",
        answer4: "4. numbers",
        correctAnswer: "3. alerts",
    },
    {
        question: "The condition in an if / else statement is enclosed with ________.",
        answer1: "1. quotes",
        answer2: "2. curly brackets",
        answer3: "3. parenthesis",
        answer4: "4. square brackets",
        correctAnswer: "3. parenthesis",
    },
    {
        question: "Arrays in JavaScript can be used to store ________.",
        answer1: "1. numbers and strings",
        answer2: "2. other arrays",
        answer3: "3. booleans",
        answer4: "4. all of the above",
        correctAnswer: "4. all of the above",
    },
    {
        question: "String values must be enclosed within ______ when being assigned to variables.",
        answer1: "1. commas",
        answer2: "2. curely brackets",
        answer3: "3. quotes",
        answer4: "4. parenthesis",
        correctAnswer: "3. quotes",
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answer1: "1. JavaScript",
        answer2: "2. terminal/bash",
        answer3: "3. for loops",
        answer4: "4. console.log",
        correctAnswer: "4. console.log",
    },
];

var timer = function() {
    timerInterval = setInterval(function() {
        time--;
        if (time >= 0) {
            document.getElementById("time").textContent = "Time: " + time;
        }
        if (time === 0) {
            alert("Time's up! The quiz is now over.");
            clearInterval(time);
        }
    }, 1000)
};

var addQuizInfo = function() {
    // create new div to hold both question and answer div
    var questionAnswerDiv = document.createElement("div");
    questionAnswerDiv.className = "quiz-wrapper";
    questionAnswerDiv.setAttribute("data-count-id", count);
    sectionEl.appendChild(questionAnswerDiv);
    // create new div with quiz question and append it to quiz wrapper section
    var questionDiv = document.createElement("div");
    questionDiv.innerHTML = "<h1 class='question-title'>" + quizInfo[count].question + "</h1>";
    questionDiv.className = "question-div";
    questionAnswerDiv.appendChild(questionDiv);
    // create new div with quiz answers and append it to quiz wrapper section
    var answerDiv = document.createElement("div")
    answerDiv.innerHTML = "<button class='answer-btn' id='answer-btn'>" + quizInfo[count].answer1 + "</button><button class='answer-btn' id='answer-btn'>" + quizInfo[count].answer2 + "</button><button class='answer-btn' id='answer-btn'>" + quizInfo[count].answer3 + "</button><button class='answer-btn' id='answer-btn'>" + quizInfo[count].answer4 + "</button>";
    answerDiv.className = "answer-div";
    questionAnswerDiv.appendChild(answerDiv);
    // add 1 to count
    count++;
};

var finalScore = function() {
    // create new div for finalScore info
    var finalScoreDiv = document.createElement("div");
    finalScoreDiv.className = "final-score-wrapper";
    finalScoreDiv.setAttribute("id", "final-score-wrapper");
    sectionEl.appendChild(finalScoreDiv);
    // create new div for finalscore text
    var finalScoreTextDiv = document.createElement("div");
    finalScoreTextDiv.innerHTML = "<h1 class='question-title'>All done!</h1><p class='final-score-para'>Your final score is " + time + ".</p>"
    finalScoreTextDiv.className = "final-text-wrapper";
    finalScoreDiv.appendChild(finalScoreTextDiv);
    // create new div for finalscore input field / button
    var finalScoreInputDiv = document.createElement("div");
    finalScoreInputDiv.innerHTML = "<p class='final-score-para'>Enter initials:</p><input type='text' name='score-initials' class='initial-input' placeholder='TA'><button class='score-btn' id='score-btn'>Submit</button>";
    finalScoreInputDiv.className = "final-score-input";
    finalScoreDiv.appendChild(finalScoreInputDiv);
};

var checkAnswer = function() {
    // append rightWrongAnswerDiv to section element
    sectionEl.append(rightWrongAnswerDiv);
    // append rightWrongAnswer Para to rightWrongAnswerDiv
    rightWrongAnswerDiv.append(rightWrongAnswerPara);

    var selectedAnswer = event.target.textContent;

    if (selectedAnswer === quizInfo[(count - 2)].correctAnswer) {
        rightAnswer(rightWrongAnswerPara);
    } 
    else if (selectedAnswer !== quizInfo[(count - 2)].correctAnswer) {
        time -= 10;
        wrongAnswer(rightWrongAnswerPara);
    }
};

var rightAnswer = function(rightWrongAnswerPara) {
    rightWrongAnswerPara.textContent = "Correct!";
};

var wrongAnswer = function(rightWrongAnswerPara) {
    rightWrongAnswerPara.textContent = "Wrong. :(";
};

var removeCorrectWrong = function() {
    var rightWrongAnswerInput = document.querySelector("div[class='right-wrong-answer-div']")

    setTimeout(() => {
        rightWrongAnswerInput.remove();
    }, 3000);
};

var removeQuestionAnswer = function() {
    var questionAnswerInput = document.querySelector("div[class='quiz-wrapper']");
    questionAnswerInput.remove();
};

var saveScore = function() {
    var currentScore = time;
    var initialInput = document.querySelector("input[name='score-initials']").value;
    var scoreDataObj = {
        name: initialInput,
        score: currentScore,
    };
    highScores.push(scoreDataObj);
};

var highScore = function() {
    // create highscorediv to hold all high score elements
    var highScoreDiv = document.createElement("div");
    highScoreDiv.className = "high-score-wrapper"
    highScoreDiv.setAttribute("id", "high-score-wrapper")
    sectionEl.appendChild(highScoreDiv);
    // create highscore h1 element
    var highScoreH1 = document.createElement("h1");
    highScoreH1.className = "quiz-title"
    highScoreH1.textContent = "High scores"
    highScoreDiv.appendChild(highScoreH1);
    // create order list element
    var highScoreOlEl = document.createElement("ol");
    highScoreOlEl.className = "high-scores-ol";
    highScoreDiv.appendChild(highScoreOlEl);
    // create div for "go back" and "clear high scores" buttons
    var highScoreBtnDiv = document.createElement("div");
    highScoreBtnDiv.className = "high-score-btn-div";
    highScoreBtnDiv.innerHTML = "<button class='score-btn' id='go-back-btn'>Go back</button><button class='clear-score-btn' id='clear-high-scores-btn'>Clear high scores</button>"
    highScoreDiv.appendChild(highScoreBtnDiv);
    // add li of high scores to ol
    var highScoreLiEl = document.createElement("li");
    highScoreLiEl.className = "high-scores-li";
    highScoreLiEl.innerText = "1. " + highScores[0].name + " - " + highScores[0].score;
    highScoreOlEl.appendChild(highScoreLiEl);
};

var startQuiz = function() {
    // start timer countdown from 75
    timer();
    // remove div containing default html
    quizChallenge.remove();
    // add first quiz question
    addQuizInfo();
};

var quiz = function(event) {
    // get target element from event
    var targetEl = event.target;
    //  start quiz if start quiz button is clicked
    if (targetEl.matches("#start-quiz")) {
        startQuiz();
    } 
    // add additional quiz questions after first is answered and remove previous question/answers
    else if (targetEl.matches("#answer-btn")) {
        if (count < 5) {
            addQuizInfo();
        } 
        else if (count === 5) {
            finalScore();
            clearInterval(timerInterval);
        }
        checkAnswer();
        removeQuestionAnswer();
        removeCorrectWrong();
    }
    // clear finalscore and load high scores
    else if (targetEl.matches("#score-btn")) {
        // make sure input isnt empty
        var initialInput = document.querySelector("input[name='score-initials']").value;
        if (!initialInput) {
            alert("You need to enter your initials")
            return false;
        }
        // save score with initial in input
        saveScore();
        // remove content from the page after score submission
        var finalScoreEl = document.querySelector("#final-score-wrapper");
        var headerEl = document.querySelector('#header-div')
        finalScoreEl.remove();
        headerEl.remove();
        // show high scores
        highScore();
    }
    // clear highScores and reload page
    else if (targetEl.matches("#go-back-btn")) {
        location.reload();
    }
    // clear high scores from highScores pages
    else if (targetEl.matches("#clear-high-scores-btn")) {
    
    }
    else if (targetEl.matches("#high-scores")) {
        var headerEl = document.querySelector('#header-div')
        quizChallenge.remove();
        headerEl.remove();
        highScore();
    }
};  

pageContentEl.addEventListener("click", quiz);
headerContentEl.addEventListener("click", quiz);