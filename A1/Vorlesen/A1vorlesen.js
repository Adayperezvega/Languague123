document.querySelector('.section-toggle-A11111').addEventListener('click', function () {
  let contentA11111 = document.querySelector('.content-A11111');
  contentA11111.classList.toggle('hidden');
});

// Show and hide the input container when the start button is pressed
document.getElementById("start-button-A11111").addEventListener("click", function () {
  document.getElementById("translation-input-A11111").classList.remove("hidden");
  document.getElementById("translate-sentence-A11111").classList.remove("hidden");
  document.getElementById("start-button-A11111").classList.add("hidden");
  document.getElementById("task-description-A11111").style.display = "none"
  document.getElementById("input-container-A11111").classList.remove("hidden");
  document.getElementById("speak-button-A11111").classList.remove("hidden");
});

// Speak the sentence in the input container when the speak button is pressed
document.getElementById("speak-button-A11111").addEventListener("click", function () {
  const sentence = document.getElementById("translation-input-A11111").value;
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(sentence);
  utterance.lang = 'es-ES';
  utterance.rate = 0.75;

  // Filter the available voices to only include Spanish voices
  const spanishVoices = speechSynthesis.getVoices().filter(function (voice) {
    return voice.lang.startsWith('es-') && voice.localService;
  });

  // Set the voice to the first Spanish voice in the list, or the default voice if there are no Spanish voices
  utterance.voice = spanishVoices.length > 0 ? spanishVoices[0] : speechSynthesis.getVoices().filter(function (voice) { return voice.default; })[0];

  // Check if previous utterance is still speaking
  if (synth.speaking) {
    synth.cancel(); // Stop previous utterance
  }

  synth.speak(utterance);
});

