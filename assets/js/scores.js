var scorespage = document.getElementById("scorespage");
var backQuiz = document.getElementById("backtoQuiz");

function onBackQuiz() {
  window.location.href = "index.html";
}

var scores = [];
for (var i = 0; i < localStorage.length; i++) {
  var initials = localStorage.key(i);
  var score = localStorage.getItem(initials);
  scores.push({ initials: initials, score: score });
}

scores.sort(function (a, b) {
  return b.score - a.score;
});

scores.forEach(function (score) {
  var result = document.createElement("div");
  result.className = "result";

  var initialsDiv = document.createElement("div");
  initialsDiv.className = "score-item";
  initialsDiv.textContent = score.initials;
  result.appendChild(initialsDiv);

  var scoreDiv = document.createElement("div");
  scoreDiv.className = "score-item";
  scoreDiv.textContent = score.score;
  result.appendChild(scoreDiv);

  scorespage.appendChild(result);
});

backQuiz.addEventListener("click", onBackQuiz);

//this code retrieves scores from the browser's local storage,
//sorts them in descending order based on the score,
//and displays them on a webpage. It also provides a button to redirect the user back to the quiz homepage.
