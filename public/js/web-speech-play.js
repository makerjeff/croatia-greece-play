/**
 * Created by jefferson.wu on 6/24/16.
 */

// speech grammar format
var grammar = '#JSGF V1.0; grammar colors; public <color> = red | green | blue | black ;';

// feed the right module into chrome
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

// create speech recognition instance
var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();

// add grammar to grammars
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;

//set params
//recognition.continuous = true;  //hide this if no continuous
recognition.lang = 'en-US';
recognition.interimResults = true;
recognition.maxAlternatives = 1;

var diagnostic = document.getElementById('debug_messages');
var bg = document.getElementById('container');

document.body.addEventListener('click', function(e){
    recognition.start();
    console.log('ready to listen!');
});

recognition.onresult = function(e) {
    var color = e.results[0][0].transcript;
    diagnostic.textContent = 'Result received: "' + color + '". ';
    bg.style.backgroundColor = color;
    console.log('Confidence level: ' + event.results[0][0].confidence);
};

recognition.onspeechend = function() {
    recognition.stop();
    console.log('Stopped listening.');
};

recognition.onnomatch = function(e){
    diagnostic.textContent = 'I didn\'t recognize that. ';
};

recognition.onerror = function(e) {
    diagnostic.textContent = 'Err0r! : ' + e.error;
};