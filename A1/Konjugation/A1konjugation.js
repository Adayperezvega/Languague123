document.querySelector('.section-toggle-A1111').addEventListener('click', function () {
    let contentA1111 = document.querySelector('.content-A1111');
    contentA1111.classList.toggle('hidden');
});

const togglesA1111 = document.querySelectorAll('.section-toggle-A1111');
let currentSentenceA1111;
let usedSentencesA1111 = [];
let scoreA1111 = 0;
let currentSentenceNumberA1111 = 0;
let totalSentenceNumberA1111 = 0;
let previousSentencesA1111 = [];

// get a random sentence from the .json file
function getSentenceA1111() {
    if (!startButtonPressedA1111) {
        return;
    }

    fetch("/A1/Konjugation/A1konjugation.json")
        .then(response => response.json())
        .then(data => {
            totalSentenceNumberA1111 = data.length;
            var sentenceIndexA1111 = 0;
            if (usedSentencesA1111.length === data.length) {
                usedSentencesA1111 = [];
                previousSentencesA1111 = [];
                document.querySelectorAll(".hidden").forEach((elem) => {
                    elem.classList.add("hidden");
                });
                scoreA1111 = 0;
            }
            while (usedSentencesA1111.includes(sentenceIndexA1111)) {
                sentenceIndexA1111 = (sentenceIndexA1111 + 1) % data.length;
            }
            currentSentenceA1111 = data[sentenceIndexA1111];
            usedSentencesA1111.push(sentenceIndexA1111);
            currentSentenceNumberA1111 = usedSentencesA1111.length;
            updateSentenceNumberA1111();
            var sentenceElementA1111 = document.getElementById("sentence-A1111");
            sentenceElementA1111.innerHTML = currentSentenceA1111.verb;

            let totalScoreA1111 = document.getElementById("score-A1111");
            totalScoreA1111.innerHTML = "Score: " + scoreA1111 + "/" + data.length;
            //speakSentenceA1111();

        });
}
// function to show next sentence
function nextSentenceA1111() {
    clearInputFieldsA1111();
    clearFeedbackA1111();
    getSentenceA1111();
    previousSentencesA1111.push(currentSentenceA1111);
    updateSentenceNumberA1111();
}

// function to show previous sentence
function previousSentenceA1111() {
    if (previousSentencesA1111.length > 0) {
        usedSentencesA1111.pop();
        currentSentenceA1111 = previousSentencesA1111.pop();
        document.getElementById("sentence-A1111").innerHTML = currentSentenceA1111.verb;
        clearInputFieldsA1111();
        clearFeedbackA1111();
        currentSentenceNumberA1111--;
    } else {
        console.log("No previous sentence found.");
    }
    updateSentenceNumberA1111();
}

// clear input fields
function clearInputFieldsA1111() {
    const inputContainers = document.querySelectorAll('.conjugation-input-A1111');
    inputContainers.forEach(container => container.value = '');
}

// clear feedback
function clearFeedbackA1111() {
    const yoInput = document.getElementById("yo-input-A1111");
    yoInput.value = "";
    yoInput.classList.remove("incorrect");
    const tuInput = document.getElementById("tú-input-A1111");
    tuInput.value = "";
    tuInput.classList.remove("incorrect");

    const elEllaInput = document.getElementById("él/ella-input-A1111");
    elEllaInput.value = "";
    elEllaInput.classList.remove("incorrect");

    const nosotrosInput = document.getElementById("nosotros/nosotras-input-A1111");
    nosotrosInput.value = "";
    nosotrosInput.classList.remove("incorrect");

    const vosotrosInput = document.getElementById("vosotros/vosotras-input-A1111");
    vosotrosInput.value = "";
    vosotrosInput.classList.remove("incorrect");

    const ellosInput = document.getElementById("ellos/ellas-input-A1111");
    ellosInput.value = "";
    ellosInput.classList.remove("incorrect");

    const yoFeedback = document.getElementById("yo-feedback-A1111");
    yoFeedback.innerHTML = "";
    yoFeedback.classList.remove("correct");
    yoFeedback.classList.remove("incorrect");

    const tuFeedback = document.getElementById("tú-feedback-A1111");
    tuFeedback.innerHTML = "";
    tuFeedback.classList.remove("correct");
    tuFeedback.classList.remove("incorrect");

    const elEllaFeedback = document.getElementById("él/ella-feedback-A1111");
    elEllaFeedback.innerHTML = "";
    elEllaFeedback.classList.remove("correct");
    elEllaFeedback.classList.remove("incorrect");

    const nosotrosFeedback = document.getElementById("nosotros/nosotras-feedback-A1111");
    nosotrosFeedback.innerHTML = "";
    nosotrosFeedback.classList.remove("correct");
    nosotrosFeedback.classList.remove("incorrect");

    const vosotrosFeedback = document.getElementById("vosotros/vosotras-feedback-A1111");
    vosotrosFeedback.innerHTML = "";
    vosotrosFeedback.classList.remove("correct");
    vosotrosFeedback.classList.remove("incorrect");

    const ellosFeedback = document.getElementById("ellos/ellas-feedback-A1111");
    ellosFeedback.innerHTML = "";
    ellosFeedback.classList.remove("correct");
    ellosFeedback.classList.remove("incorrect");
}

// update sentence number
function updateSentenceNumberA1111() {
    document.getElementById("current-sentence-number-A1111").innerHTML = currentSentenceNumberA1111;
    document.getElementById("total-sentence-number-A1111").innerHTML = totalSentenceNumberA1111;
}

// check translation
function checkTranslationA1111() {
    const pronounsA1111 = ["yo", "tú", "él/ella", "nosotros/nosotras", "vosotros/vosotras", "ellos/ellas"];
    let isCorrectA1111 = true; for (let i = 0; i < currentSentenceA1111.conjugation.length; i++) {
        const inputConjugationA1111 = document.getElementById(`${pronounsA1111[i]}-input-A1111`);
        const feedbackConjugationA1111 = document.getElementById(`${pronounsA1111[i]}-feedback-A1111`);
        const isInputCorrectA1111 = inputConjugationA1111.value.toLowerCase() === currentSentenceA1111.conjugation[i].toLowerCase();

        inputConjugationA1111.classList.toggle("incorrect", !isInputCorrectA1111);
        feedbackConjugationA1111.classList.toggle("incorrect", !isInputCorrectA1111);
        feedbackConjugationA1111.classList.toggle("correct", isInputCorrectA1111);
        feedbackConjugationA1111.innerHTML = isInputCorrectA1111 ? "Richtig!" : ` ${currentSentenceA1111.conjugation[i]}`;
        if (!isInputCorrectA1111) {
            isCorrectA1111 = false;
        }
    }


    if (isCorrectA1111) {
        scoreA1111++;
        const totalScoreA1111 = document.getElementById("score-A1111");
        totalScoreA1111.innerHTML = "Score: " + scoreA1111 + "/" + totalSentenceNumberA1111;
    }
}



// Hide and show the Section A1111 with the start button
togglesA1111.forEach((toggleA1111) => {
    toggleA1111.addEventListener('click', (event) => {
        event.preventDefault();
        const sectionA1111 = document.querySelector(`.section-container-A1111.${event.target.classList[1]}`);
        if (sectionA1111) {
            sectionA1111.classList.toggle('open');
            const elementsToShowA1111 = sectionA1111.querySelector('.content-A1111');
            if (elementsToShowA1111) {
                elementsToShowA1111.classList.toggle('hidden');
            }
        }
    });
});


//functionalities with the keyboard
let startButtonPressedA1111 = false;

document.getElementById("start-button-A1111").addEventListener("click", function () {
    startButtonPressedA1111 = true;
    getSentenceA1111();
    document.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            checkTranslationA1111();
        } else if (event.code === "ArrowRight") {
            nextSentenceA1111();
        } else if (event.code === "ArrowLeft") {
            previousSentenceA1111();
        }
    });
    document.getElementById("task-description-A1111").style.display = "none"
    document.getElementById("start-button-A1111").classList.toggle("hidden");
    document.getElementById("translate-sentence-A1111").classList.remove("hidden");
    document.getElementById("actual-sentence-A1111").classList.remove("hidden");
    document.getElementById("sentence-A1111").classList.remove("hidden");
    document.getElementById("input-container-A1111").classList.remove("hidden");
    document.getElementById("check-button-A1111").classList.remove("hidden");
    document.getElementById("previous-button-A1111").classList.remove("hidden");
    document.getElementById("next-button-A1111").classList.remove("hidden");
    document.getElementById("score-container-A1111").classList.remove("hidden");
    document.getElementById("score-A1111").classList.remove("hidden");
    const togglesA1111 = document.querySelectorAll('.toggle-A1111');
    togglesA1111.forEach((toggle) => {
        toggle.addEventListener("click", (event) => {
            event.preventDefault();
            const sectionA1111 = document.querySelector(`.section-container-A1111.${event.target.classList[1]}`);
            if (sectionA1111.classList.contains("open")) {
                sectionA1111.classList.remove("open");
                const elementsToShowA1111 = sectionA1111.querySelector(".content-A1111");
                elementsToShowA1111.classList.add("hidden");
            } else {
                sectionA1111.classList.add("open");
                const elementsToShowA1111 = sectionA1111.querySelector(".content-A1111");
                elementsToShowA1111.classList.remove("hidden");
            }
        });
    });
});




