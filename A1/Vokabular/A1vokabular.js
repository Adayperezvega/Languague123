const toggles = document.querySelectorAll('.section-toggle');
let currentSentence;
let usedSentences = [];
let score = 0;
let currentSentenceNumber = 0;
let totalSentenceNumber = 0;
let previousSentences = [];

// get a random sentence from the .json file
function getSentence() {
  if (!startButtonPressed) {
    return;
  }

  fetch("/A1/Vokabular/A1vokabular.json")
    .then(response => response.json())
    .then(data => {
      totalSentenceNumber = data.length;
      var sentenceIndex = 0;
      if (usedSentences.length === data.length) {
        usedSentences = [];
        previousSentences = [];
        document.querySelectorAll(".hidden").forEach((elem) => {
          elem.classList.add("hidden");
        });
        score = 0;
      }
      while (usedSentences.includes(sentenceIndex)) {
        sentenceIndex = (sentenceIndex + 1) % data.length;
      }
      currentSentence = data[sentenceIndex];
      usedSentences.push(sentenceIndex);
      currentSentenceNumber = usedSentences.length;
      updateSentenceNumber();
      var sentenceElement = document.getElementById("sentence");
      sentenceElement.innerHTML = currentSentence.german;

      let totalScore = document.getElementById("score");
      totalScore.innerHTML = "Score: " + score + "/" + data.length;
      //speakSentence();

    });
}

// function to show next sentence
function nextSentence() {
  getSentence();
  document.getElementById("translation-input").value = "";
  document.getElementById("feedback").innerHTML = "";
  document.getElementById("feedback").classList.remove("correct");
  document.getElementById("feedback").classList.remove("incorrect");
  previousSentences.push(currentSentence);
  updateSentenceNumber()
}

// function to show previous sentence
function previousSentence() {
  if (previousSentences.length > 0) {
    usedSentences.pop();
    currentSentence = previousSentences.pop();
    var sentenceElement = document.getElementById("sentence");
    sentenceElement.innerHTML = currentSentence.german;
    currentSentenceNumber--;
  } else {
    console.log("No previous sentence found.");
  }
  updateSentenceNumber();
}

function updateSentenceNumber() {
  const current = document.getElementById("current-sentence-number");
  current.innerHTML = currentSentenceNumber;
  const total = document.getElementById("total-sentence-number");
  total.innerHTML = totalSentenceNumber;

  // Update progress bar
  const progressBar = document.querySelector(".progress-bar");
  const percentage = (currentSentenceNumber / totalSentenceNumber) * 100;
  progressBar.style.width = `${percentage}%`;
}

// check translation
function checkTranslation() {
  var input = document.getElementById("translation-input").value;
  var feedback = document.getElementById("feedback");
  if (input === currentSentence.spanish) {
    feedback.innerHTML = "Correct!";

    feedback.classList.add("correct");
    score++;
  } else {
    var inputWords = input.split(" ");
    var correctWords = currentSentence.spanish.split(" ");
    feedback.innerHTML = " ";
    feedback.classList.add("incorrect");
    for (var i = 0; i < correctWords.length; i++) {
      if (inputWords[i] !== correctWords[i]) {
        feedback.innerHTML += "<span class='incorrect-word'>" + correctWords[i] + "</span> ";
        
      } else {
        feedback.innerHTML += correctWords[i] + " ";
      }
    }
  }
}



// Hide and show the Section A1 with the start button
toggles.forEach((toggle) => {
  toggle.addEventListener("click", (event) => {
    event.preventDefault();
    const section = document.querySelector(`.section-container.${event.target.classList[1]}`);
    section.classList.toggle("open");
    const elementsToShow = section.querySelector(".content");
    elementsToShow.classList.toggle("hidden");
  });
});


//functionalities with the keyboard
let startButtonPressed = false;

document.getElementById("start-button").addEventListener("click", function () {
  startButtonPressed = true;
  getSentence();
  document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      checkTranslation();
    } else if (event.code === "ArrowRight") {
      nextSentence();
    } else if (event.code === "ArrowLeft") {
      previousSentence();
    }
  });


  document.getElementById("sentence").classList.remove("hidden");
  document.getElementById("actual-sentence").classList.remove("hidden");
  document.getElementById("translation-input").classList.remove("hidden");
  document.getElementById("check-button").classList.remove("hidden");
  document.getElementById("next-button").classList.remove("hidden");
  document.getElementById("task-description").style.display = "none"
  document.getElementById("score-container").classList.remove("hidden");
  document.getElementById("score").classList.remove("hidden");
  document.getElementById("translate-sentence").classList.remove("hidden");
  document.getElementById("start-button").classList.toggle("hidden");
  document.getElementById("input-container").classList.toggle("hidden");
  document.getElementById("progress-bar-container").classList.remove("hidden");
  const toggles = document.querySelectorAll('.toggle');
  toggles.forEach((toggle) => {
    toggle.addEventListener("click", (event) => {
      event.preventDefault();
      const section = document.querySelector(`.section-container.${event.target.classList[1]}`);
      if (section.classList.contains("open")) {
        section.classList.remove("open");
        const elementsToShow = section.querySelector(".content");
        elementsToShow.classList.add("hidden");
      } else {
        section.classList.add("open");
        const elementsToShow = section.querySelector(".content");
        elementsToShow.classList.remove("hidden");
      }
    });
  });


});



// speak the current sentence
function speakSentence() {
  var sectionA1 = document.querySelector('.section-container.open');
  if (sectionA1.classList.contains('open')) {
    var sentence = document.getElementById("sentence").innerHTML;
    var synth = window.speechSynthesis;
    var utterance = new SpeechSynthesisUtterance(sentence);
    utterance.rate = 0.8;
    utterance.pitch = 0.75;
    // Select a German voice
    utterance.voice = speechSynthesis.getVoices().filter(function (voice) { return voice.lang === 'de-DE'; })[0];
    synth.speak(utterance);
  }
}

