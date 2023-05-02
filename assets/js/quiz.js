// Get elements from the HTML
var quizStart = document.getElementById("quizStart");
var welcome = document.getElementById("Welcome");
var quiz = document.getElementById("quiz");
var result = document.getElementById("result");
var options = document.getElementById("options");
var message = document.getElementById("message");
var timer = document.getElementById("timer");
var summary = document.getElementById("summary");
var initialsBox = document.getElementById("initials");
var saveScoreBtn = document.getElementById("saveScore");
var viewScoresBtn = document.getElementById("viewScores");
var playAgainBtn = document.getElementById("playAgain");

// Declare variables
var secondsLeft = 0;
var score = 0;
var currentQuestion = 0;
var countdownTimer;

// Function to stop the game
function stopGame() {
  clearInterval(countdownTimer);
  timer.textContent = "";
  quiz.style.display = "none";
  result.style.display = "flex";
  summary.textContent = "Your Score is: " + score;
  initialsBox.removeAttribute("hidden");
  saveScoreBtn.removeAttribute("hidden");
  viewScoresBtn.removeAttribute("hidden");
  playAgainBtn.removeAttribute("hidden");
}

// Function to save score
function onSaveScore(e) {
  var initials = initialsBox.value;
  if (initials !== "") {
    localStorage.setItem(initials, score);
    initialsBox.value = "";
  }
}

// Function to view scores
function onViewScores(e) {
  window.location.href = "scores.html";
}

// Function to handle the user's answer
function onSelectAnswer(e) {
  var correctAnswer = questions[currentQuestion].answer;
  var userAnswer = e.target.textContent;

  var correctSound = new Audio("./assets/sfx/correct.wav");
  var incorrectSound = new Audio("./assets/sfx/incorrect.wav");

  if (correctAnswer === userAnswer) {
    score++;
    displayMessage("Correct!!!!!");
    correctSound.play();
  } else {
    score--;
    displayMessage("Wrong -_-");
    incorrectSound.play();
    secondsLeft -= 10;
  }

  displayQuestion();
}

// Function to display a message
function displayMessage(msg) {
  message.textContent = msg;

  setTimeout(function () {
    message.textContent = "";
  }, 1000);
}

// Function to display a question
function displayQuestion() {
  currentQuestion++;

  console.log("current question is" + currentQuestion);

  if (currentQuestion >= questions.length) {
    stopGame();
    return;
  }

  var question = questions[currentQuestion];
  document.getElementById("question").textContent = question.title;

  options.innerHTML = "";

  for (var i = 0; i < question.choices.length; i++) {
    var option = document.createElement("div");
    option.textContent = question.choices[i];
    option.onclick = onSelectAnswer;
    option.classList.add("option");

    options.appendChild(option);
  }
}

// Function to start the game
function onStartGame() {
  secondsLeft = 75;
  currentQuestion = -1;
  score = 0;

  countdownTimer = setInterval(function () {
    if (secondsLeft > 0) {
      timer.textContent = secondsLeft;
    } else {
      stopGame();
    }
    secondsLeft--;
  }, 1000);

  welcome.style.display = "none";
  result.style.display = "none";
  quiz.style.display = "flex";

  displayQuestion();
}

// Event listeners
quizStart.addEventListener("click", onStartGame);
saveScoreBtn.addEventListener("click", onSaveScore);
viewScoresBtn.addEventListener("click", onViewScores);

playAgainBtn.addEventListener("click", function () {
  window.location.reload();
});

//This code sets up a quiz game that includes multiple-choice questions and a timer.
//The user can start the quiz by clicking a "Start Quiz" button.
//Once started, the user has a limited amount of time to answer all the questions.
//If the user answers correctly, they receive a point; if they answer incorrectly, they lose a point and have time deducted from their remaining time.
//At the end of the game, the user's score is displayed along with an input field for their initials, and buttons to save their score, view high scores, or play again.
//When the user saves their score, it is stored in local storage so that it can be displayed on a high scores page.
//The quiz is built dynamically from an array of questions and their answers, which are defined in a separate file.
