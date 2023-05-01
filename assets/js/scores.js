var scorespage = document.getElementById("scorespage");
var backQuiz = document.getElementById("backtoQuiz");

function onBackQuiz() {
  window.location.href = "index.html";
}

for (var i = 0; i < localStorage.length; i++) {
  var initials = localStorage.key(i);
  var score = localStorage.getItem(initials);

  var result = document.createElement("div");
  result.className = "result";

  var initialsDiv = document.createElement("div");
  initialsDiv.className = "score-item";
  initialsDiv.textContent = initials;
  result.appendChild(initialsDiv);

  var scoreDiv = document.createElement("div");
  scoreDiv.className = "score-item";
  scoreDiv.textContent = score;
  result.appendChild(scoreDiv);

  scorespage.appendChild(result);
}

backQuiz.addEventListener("click", onBackQuiz);
