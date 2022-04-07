var startQuizButton = document.querySelector("#start-quiz");
var time = 75;

var timer = function() {
    document.getElementById("time").textContent = "Time: " + time;
    time -= 1;

    // if (time > 1)
    //     alert("The quiz is now over!")
    //     clearInterval(startTimer);
};

 var startTimer = function () {
    setInterval(timer, 1000)
 };

startQuizButton.addEventListener("click", startTimer);