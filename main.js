previous_result="";
accuracy=0;

function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier('MobileNet',Modelloaded);
}

function draw() {
image(video,0,0,300,300);
classifier.classify(video,gotResult);
}

function Modelloaded() {
  console.log("Model is Loaded");
}

function gotResult(error,results) {
if(error) {
  console.log(error);
}
else {
  if((accuracy>0.5) && (previous_result != results[0].label))
  console.log(results);
  previous_result = results[0].label;
  accuracy = results[0].confidence;
  accuracy_percentage = accuracy.toFixed(2)*100;
  document.getElementById("result_object_name").innerHTML="Object :"+previous_result;
  document.getElementById("result_object_accuracy").innerHTML="Confidence :"+accuracy_percentage+"%";
  var synth = window.speechSynthesis;
  speak_data ="Object detected is"+previous_result;
  var Utterthis = new SpeechSynthesisUtterance(speak_data);
  synth.speak(Utterthis);
}
}



