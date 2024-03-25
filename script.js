prediction_1 = ""
prediction_2 = ""

Webcam.set({
    width:350,
    height:300,
    image_format : 'png', 
    png_quality:90,
    flip_horiz: true
});

camera = document.getElementById("camera");

Webcam.attach( '#camera' );

function take_snapshot()
{
    Webcam.snap(function(data_uri) {
       document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/jL7p-A1Ox/model.json',modelLoaded);

function modelLoaded() {
    console.log('Model Loaded');
}

function check()
{
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function speak()
{
    var synth = window.speechSynthesis; //api for the term
    speak_data_1 = "The first prediction is " + prediction_1;
    speak_data_2 = "The second prediction is " + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}


function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();
        if (results[0].label == "no mask") 
        {
            document.getElementById("update_emoji").innerHTML = "No mask"
        }
        if (results[0].label == "proper mask") 
        {
            document.getElementById("update_emoji").innerHTML = "Proper mask"
        }
        if (results[0].label == "improper mask") 
        {
            document.getElementById("update_emoji").innerHTML = "improper mask"
        }
        if (results[1].label == "no mask") 
        {
            document.getElementById("update_emoji2").innerHTML = "No mask"
        }
        if (results[1].label == "proper mask") 
        {
            document.getElementById("update_emoji2").innerHTML = "Proper mask"
        }
        if (results[1].label == "improper mask") 
        {
            document.getElementById("update_emoji2").innerHTML = "improper mask"
        }
  
       
        
    }
}

