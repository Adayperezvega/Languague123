document.querySelector('.section-toggle-A11').addEventListener('click', function () {
  let contentA11 = document.querySelector('.content-A11');
  contentA11.classList.toggle('hidden');
});

const togglesA11 = document.querySelectorAll('.section-toggle-A11');
let currentSentenceA11;
let usedSentencesA11 = [];
let scoreA11 = 0;
let currentSentenceNumberA11 = 0;
let totalSentenceNumberA11 = 0;
let previousSentencesA11 = [];

// get a random sentence from the .json file
function getSentenceA11() {
  if (!startButtonPressedA11) {
    return;
  }

  fetch("/A1/Grammatik/A1grammatik.json")
    .then(response => response.json())
    .then(data => {
      totalSentenceNumberA11 = data.length;
      var sentenceIndexA11 = 0;
      if (usedSentencesA11.length === data.length) {
        usedSentencesA11 = [];
        previousSentencesA11 = [];
        document.querySelectorAll(".hidden").forEach((elem) => {
          elem.classList.add("hidden");
        });
        scoreA11 = 0;
      }
      while (usedSentencesA11.includes(sentenceIndexA11)) {
        sentenceIndexA11 = (sentenceIndexA11 + 1) % data.length;
      }
      currentSentenceA11 = data[sentenceIndexA11];
      usedSentencesA11.push(sentenceIndexA11);
      currentSentenceNumberA11 = usedSentencesA11.length;
      updateSentenceNumberA11();
      var sentenceElementA11 = document.getElementById("sentence-A11");
      sentenceElementA11.innerHTML = currentSentenceA11.falsch;

      let totalScoreA11 = document.getElementById("score-A11");
      totalScoreA11.innerHTML = "Score: " + scoreA11 + "/" + data.length;
      speakSentenceA11();

    });
}

// function to show next sentence
function nextSentenceA11() {
  getSentenceA11();
  document.getElementById("translation-input-A11").value = "";
  document.getElementById("feedback-A11").innerHTML = "";
  document.getElementById("feedback-A11").classList.remove("correct");
  document.getElementById("feedback-A11").classList.remove("incorrect");
  previousSentencesA11.push(currentSentenceA11);
  updateSentenceNumberA11();
}

// function to show previous sentence
function previousSentenceA11() {
  if (previousSentencesA11.length > 0) {
    usedSentencesA11.pop();
    currentSentenceA11 = previousSentencesA11.pop();
    var sentenceElementA11 = document.getElementById("sentence-A11");
    sentenceElementA11.innerHTML = currentSentenceA11.falsch;
    currentSentenceNumberA11--;
  } else {
    console.log("No previous sentence found.");
  }
  updateSentenceNumberA11();
  speakSentenceA11();
}

// update sentence number 
function updateSentenceNumberA11() {
  const current = document.getElementById("current-sentence-number-A11");
  current.innerHTML = currentSentenceNumberA11;
  const total = document.getElementById("total-sentence-number-A11");
  total.innerHTML = totalSentenceNumberA11;
}


function checkTranslationA11() {
  var inputA11 = document.getElementById("translation-input-A11").value;
  var feedbackA11 = document.getElementById("feedback-A11");
  if (inputA11 === currentSentenceA11.spanish) {
    feedbackA11.innerHTML = "Correct!";
    feedbackA11.classList.add("correct");
    scoreA11++;
  } else {
    var inputWordsA11 = inputA11.split(" ");
    var correctWordsA11 = currentSentenceA11.spanish.split(" ");
    feedbackA11.innerHTML = "";
    feedbackA11.classList.add("incorrect");
    for (var i = 0; i < correctWordsA11.length; i++) {
      if (inputWordsA11[i] !== correctWordsA11[i]) {
        feedbackA11.innerHTML += "<span class='incorrect-word'>" + correctWordsA11[i] + "</span> ";
      } else {
        feedbackA11.innerHTML += correctWordsA11[i] + " ";
      }
    }
  }
}





// Hide and show the Section A11 with the start button
togglesA11.forEach((toggleA11) => {
  toggleA11.addEventListener('click', (event) => {
    event.preventDefault();
    const sectionA11 = document.querySelector(`.section-container-A11.${event.target.classList[1]}`);
    sectionA11.classList.toggle('open');
    const elementsToShowA11 = section.querySelector('.content-A11');
    elementsToShowA11.classList.toggle('hidden');
  });
});

//functionalities with the keyboard
let startButtonPressedA11 = false;

document.getElementById("start-button-A11").addEventListener("click", function () {
  startButtonPressedA11 = true;
  getSentenceA11();
  document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      checkTranslationA11();
    } else if (event.code === "ArrowRight") {
      nextSentenceA11();
    } else if (event.code === "ArrowLeft") {
      previousSentenceA11();
    }
  });

  document.getElementById("sentence-A11").classList.remove("hidden");
  document.getElementById("actual-sentence-A11").classList.remove("hidden");
  document.getElementById("translation-input-A11").classList.remove("hidden");
  document.getElementById("check-button-A11").classList.remove("hidden");
  document.getElementById("repeat-button-A11").classList.remove("hidden");
  document.getElementById("previous-button-A11").classList.remove("hidden");
  document.getElementById("next-button-A11").classList.remove("hidden");
  document.getElementById("task-description-A11").style.display = "none"
  document.getElementById("score-container-A11").classList.remove("hidden");
  document.getElementById("score-A11").classList.remove("hidden");
  document.getElementById("translate-sentence-A11").classList.remove("hidden");
  document.getElementById("start-button-A11").classList.toggle("hidden");
  document.getElementById("input-container-A11").classList.toggle("hidden");
  const togglesA11 = document.querySelectorAll('.toggle-A11');
  togglesA11.forEach((toggle) => {
    toggle.addEventListener("click", (event) => {
      event.preventDefault();
      const sectionA11 = document.querySelector(`.section-container-A11.${event.target.classList[1]}`);
      if (sectionA11.classList.contains("open")) {
        sectionA11.classList.remove("open");
        const elementsToShowA11 = sectionA11.querySelector(".content-A11");
        elementsToShowA11.classList.add("hidden");
      } else {
        sectionA11.classList.add("open");
        const elementsToShowA11 = sectionA11.querySelector(".content-A11");
        elementsToShowA11.classList.remove("hidden");
      }
    });
  });
});


// Speak Sentence
function speakSentenceA11() {
  const sentenceA11 = currentSentenceA11.spanish;
  var synth = window.speechSynthesis;
  var utterance = new SpeechSynthesisUtterance(sentenceA11);
  utterance.rate = 0.75;
  utterance.pitch = 1;
  utterance.lang = 'es-ES';
  utterance.voice = speechSynthesis.getVoices().filter(function (voice) { return voice.lang === 'es-ES'; })[0];
  synth.speak(utterance);
}




