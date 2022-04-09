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
var time = 75;
var count = 0;
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
    // target time element in HTML and replace it with "Time: 75" counting down by 1 every second
    document.getElementById("time").textContent = "Time: " + time;
    time -= 1;

    if (time === -1) {
        alert("Time's up! The quiz is now over.");
        clearInterval(countDown);
    }
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
    // create input field for finalscoreinputdiv
    // var finalScoreInput = document.createElement()
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

 var startQuiz = function() {
    // start timer countdown from 75
    window.countDown = setInterval(timer, 1000);
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
            checkAnswer();
        } 
        else if (count === 5) {
            finalScore();
            clearInterval(timer);
        }
    checkAnswer();
    removeQuestionAnswer();
    removeCorrectWrong();
    }
};

pageContentEl.addEventListener("click", quiz);