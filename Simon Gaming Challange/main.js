var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var level=0;
var started = false;

var userClickedPattern = [];

$(document).keypress(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});
$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
function animatePress(color){
    $("."+color).addClass("pressed");
    setTimeout(function () {
        $("."+color).removeClass("pressed");
    },100);
}
function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if(gamePattern.length===userClickedPattern.length){
            setTimeout(function () {
                nextSequence()
            },1000);
        }

    }
    else if (gamePattern[currentLevel] != userClickedPattern[currentLevel]) {
        $("body").addClass("game-over");
        setTimeout(function () {
            var audio = new Audio("sounds/wrong.mp3");
            audio.play();
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game over! press A key to restart");
        startOver();
    }

}
function nextSequence() {
    userClickedPattern=[];
    level++;
    $("h1").text("level "+level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}
function startOver() {
     gamePattern = [];
     level=0;
     started = false;
     userClickedPattern = [];
}