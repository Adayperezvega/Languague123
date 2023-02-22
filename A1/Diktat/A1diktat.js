document.querySelector('.section-toggle-A111').addEventListener('click', function () {
  let contentA111 = document.querySelector('.content-A111');
  contentA111.classList.toggle('hidden');
});

const togglesA111 = document.querySelectorAll('.section-toggle-A111');
let currentSentenceA111;
let usedSentencesA111 = [];
let scoreA111 = 0;
let currentSentenceNumberA111 = 0;
let totalSentenceNumberA111 = 0;
let previousSentencesA111 = [];

// get a random sentence from the .json file
function getSentenceA111() {
  if (!startButtonPressedA111) {
    return;
  }

  fetch("/A1/Diktat/A1diktat.json")
    .then(response => response.json())
    .then(data => {
      totalSentenceNumberA111 = data.length;
      var sentenceIndexA111 = 0;
      if (usedSentencesA111.length === data.length) {
        usedSentencesA111 = [];
        previousSentencesA111 = [];
        document.querySelectorAll(".hidden").forEach((elem) => {
          elem.classList.add("hidden");
        });
        scoreA111 = 0;
      }
      while (usedSentencesA111.includes(sentenceIndexA111)) {
        sentenceIndexA111 = (sentenceIndexA111 + 1) % data.length;
      }
      currentSentenceA111 = data[sentenceIndexA111];
      usedSentencesA111.push(sentenceIndexA111);
      currentSentenceNumberA111 = usedSentencesA111.length;
      updateSentenceNumberA111();
      var sentenceElementA111 = document.getElementById("sentence-A111");
      sentenceElementA111.innerHTML = currentSentenceA111.diktat;

      let totalScoreA111 = document.getElementById("score-A111");
      totalScoreA111.innerHTML = "Score: " + scoreA111 + "/" + data.length;
      speakSentenceA111();

    });
}

// function to show next sentence
function nextSentenceA111() {
  getSentenceA111();
  document.getElementById("translation-input-A111").value = "";
  document.getElementById("feedback-A111").innerHTML = "";
  document.getElementById("feedback-A111").classList.remove("correct");
  document.getElementById("feedback-A111").classList.remove("incorrect");
  previousSentencesA111.push(currentSentenceA111);
  updateSentenceNumberA111();
}

// function to show previous sentence
function previousSentenceA111() {
  if (previousSentencesA111.length > 0) {
    usedSentencesA111.pop();
    currentSentenceA111 = previousSentencesA111.pop();
    var sentenceElementA111 = document.getElementById("sentence-A111");
    sentenceElementA111.innerHTML = currentSentenceA111.diktat;
    currentSentenceNumberA111--;
  } else {
    console.log("No previous sentence found.");
  }
  updateSentenceNumberA111();
}

// update sentence number 
function updateSentenceNumberA111() {
  const current = document.getElementById("current-sentence-number-A111");
  current.innerHTML = currentSentenceNumberA111;
  const total = document.getElementById("total-sentence-number-A111");
  total.innerHTML = totalSentenceNumberA111;
}


// check the customer's translation
function checkTranslationA111() {
  var inputA111 = document.getElementById("translation-input-A111").value;
  var feedbackA111 = document.getElementById("feedback-A111");
  if (inputA111 === currentSentenceA111.spanish) {
    feedbackA111.innerHTML = "Correct!";
    feedbackA111.classList.add("correct");
    scoreA111++;
  } else {
    var inputWords = inputA111.split(" ");
    var correctWords = currentSentenceA111.spanish.split(" ");
    feedbackA111.innerHTML = "Falsch. Die richtige Antwort lautet: ";
    feedbackA111.classList.add("incorrect");
    for (var i = 0; i < correctWords.length; i++) {
      if (inputWords[i] !== correctWords[i]) {
        feedbackA111.innerHTML += "<span class='incorrect-word'>" + correctWords[i] + "</span> ";
      } else {
        feedbackA111.innerHTML += correctWords[i] + " ";
      }
    }
  }
}


// Hide and show the Section A111 with the start button
togglesA111.forEach((toggleA111) => {
  toggleA111.addEventListener('click', (event) => {
    event.preventDefault();
    const sectionA111 = document.querySelector(`.section-container-A111.${event.target.classList[1]}`);
    sectionA111.classList.toggle('open');
    const elementsToShowA111 = section.querySelector('.content-A111');
    elementsToShowA111.classList.toggle('hidden');
  });
});

//functionalities with the keyboard
let startButtonPressedA111 = false;

document.getElementById("start-button-A111").addEventListener("click", function () {
  startButtonPressedA111 = true;
  getSentenceA111();
  document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      checkTranslationA111();
    } else if (event.code === "ArrowRight") {
      nextSentenceA111();
    } else if (event.code === "ArrowLeft") {
      speakSentenceA111();
    }
  });

  document.getElementById("task-description-A111").style.display = "none"
  document.getElementById("start-button-A111").classList.toggle("hidden");
  document.getElementById("sentence-A111").classList.remove("hidden");
  document.getElementById("input-container-A111").classList.toggle("hidden");
  document.getElementById("translate-sentence-A111").classList.remove("hidden");
  document.getElementById("next-button-A111").classList.remove("hidden");
  document.getElementById("actual-sentence-A111").classList.remove("hidden");
  document.getElementById("repeat-button-A111").classList.remove("hidden");
  document.getElementById("translation-input-A111").classList.remove("hidden");
  document.getElementById("score-container-A111").classList.remove("hidden");
  document.getElementById("score-A111").classList.remove("hidden");
  document.getElementById("check-button-A111").classList.remove("hidden");
  document.getElementById("next-button-A111").classList.remove("hidden");
  const togglesA111 = document.querySelectorAll('.toggle-A111');
  togglesA111.forEach((toggle) => {
    toggle.addEventListener("click", (event) => {
      event.preventDefault();
      const sectionA111 = document.querySelector(`.section-container-A111.${event.target.classList[1]}`);
      if (sectionA111.classList.contains("open")) {
        sectionA111.classList.remove("open");
        const elementsToShowA111 = sectionA111.querySelector(".content-A111");
        elementsToShowA111.classList.add("hidden");
      } else {
        sectionA111.classList.add("open");
        const elementsToShowA111 = sectionA111.querySelector(".content-A111");
        elementsToShowA111.classList.remove("hidden");
      }
    });
  });
});


// Speak Sentence
function speakSentenceA111() {
  const sentenceA111 = currentSentenceA111.diktat;
  var synth = window.speechSynthesis;
  var utterance = new SpeechSynthesisUtterance(sentenceA111);
  utterance.rate = 0.75;
  utterance.pitch = 1;
  utterance.lang = 'es-ES';
  utterance.voice = speechSynthesis.getVoices().filter(function (voice) { return voice.lang === 'es-ES'; })[0];
  synth.speak(utterance);
}

// Repeat Sentence
document.getElementById("repeat-button-A111").addEventListener("click", function () {
  speakSentenceA111();
});

