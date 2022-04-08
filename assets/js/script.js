var startQuizButton = document.querySelector("#start-quiz");
var quizChallenge = document.querySelector("#quiz-challenge");
var quizInfoEl = document.querySelector("#quiz-wrapper");
var pageContentEl = document.querySelector("#page-content")
var time = 75;
var count = 0;
var quizInfo = [
    {
        question: "Commonly used data types DO Not include:",
        answer1: "1. strings",
        answer2: "2. booleans",
        answer3: "3. alerts",
        answer4: "4. numbers",
        correctAnswer: "alerts",
    },
    {
        question: "The condition in an if / else statement is enclosed with ________.",
        answer1: "1. quotes",
        answer2: "2. curly brackets",
        answer3: "3. parenthesis",
        answer4: "4. square brackets",
        correctAnswer: "parenthesis",
    },
    {
        question: "Arrays in JavaScript can be used to store ________.",
        answer1: "1. numbers and strings",
        answer2: "2. other arrays",
        answer3: "3. booleans",
        answer4: "4. all of the above",
        correctAnswer: "all of the above",
    },
    {
        question: "String values must be enclosed within ______ when being assigned to variables.",
        answer1: "1. commas",
        answer2: "2. curely brackets",
        answer3: "3. quotes",
        answer4: "4. parenthesis",
        correctAnswer: "quotes",
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answer1: "1. JavaScript",
        answer2: "2. terminal/bash",
        answer3: "3. for loops",
        answer4: "4. console.log",
        correctAnswer: "console.log",
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
    quizInfoEl.appendChild(questionAnswerDiv);
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
    count++;
};

// var removeQuestion = function() {
//     var questionAnswerInput = document.querySelector("div[data-count-id='0']");
//     questionAnswerInput.remove();
// }

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
    // add additional quiz questions after first is answered
    else if (targetEl.matches("#answer-btn")) {
        addQuizInfo();
    }
};

pageContentEl.addEventListener("click", quiz);