var startQuizButton = document.querySelector("#start-quiz");
var quizChallenge = document.querySelector("#quiz-challenge");
var quizInfoEl = document.querySelector("#quiz-wrapper");
var time = 75;
var quizInfo = [
    {
        question: "Commonly used data types DO Not<br/>include:",
        answer1: "1. strings",
        answer2: "2. booleans",
        answer3: "3. alerts",
        answer4: "4. numbers",
    }
];

var timer = function() {
    document.getElementById("time").textContent = "Time: " + time;
    time -= 1;

    if (time === -1) {
        alert("Time's up! The quiz is now over.");
        clearInterval(countDown);
    }
};

var addQuizInfo = function() {
    // create new div with quiz question and append it to quiz wrapper section
    var questionDiv = document.createElement("div");
    questionDiv.innerHTML = "<h1 class='question-title'>" + quizInfo[0].question + "</h1>";
    questionDiv.className = "question-div";
    quizInfoEl.appendChild(questionDiv);
    // create new div with quiz answers and append it to quiz wrapper section
    var answerDiv = document.createElement("div")
    answerDiv.innerHTML = "<button class='answer-button'>" + quizInfo[0].answer1 + "</button><button class='answer-button'>" + quizInfo[0].answer2 + "</button><button class='answer-button'>" + quizInfo[0].answer3 + "</button><button class='answer-button'>" + quizInfo[0].answer4 + "</button>";
    answerDiv.className = "answer-div";
    quizInfoEl.appendChild(answerDiv);


};

 var startQuiz = function () {
    // start timer countdown from 75
    window.countDown = setInterval(timer, 1000);
    // remove div containing default html
    quizChallenge.remove();
    // add quiz info to quiz wrapper section
    addQuizInfo(quizInfo);

 };

startQuizButton.addEventListener("click", startQuiz);

// setInterval(function(){ 
//     alert("Hello");
//   }, 3000); 