//arrray of colors
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];
var started = false;

var level = 0;
console.log(started);


$(document).on("keypress", function() {
  if (started === false) {
    $("#level-title").text("level " + level);
    nextSequence();
    started = true;
    console.log(started);
    checkAnswer(userClickedPattern[level]);
  }
});



// picks next color
function nextSequence() {

  userClickedPattern.length = 0;
  // changes level value
  level++;
  // updates level on screen
  $("#level-title").text("level " + level);
  //creates random number from 1 to 3
  randomNumber = Math.floor(Math.random() * 4);

  //takes random number & indexes a colr in buttonColoours array
  var randomChosenColour = buttonColours[randomNumber];

  //pushes color to the end of game patteren array
  gamePattern.push(randomChosenColour);

  //animates button when choosoen
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
  audio.play();
}

// gets id of button which store color in an array
$(".btn").on("click", function(event) {
  userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});



//plays sound when user clicks button
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// animates the button pressed with grey backgrouind for small period of time
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
  });
}

function checkAnswer(currentLevel){

  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log('sucess');
    if (userClickedPattern.length === gamePattern.length) {

      setTimeout(nextSequence, 1000);
    }

  }else{
    // adds class game-over which turn background red
    $("body").addClass("game-over");

    // removes class game-over after 200 millliseconds
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);

    $("h1").text("Game over, Press Any key to Restart");
    // plays audio when wrong answer is selected
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    startOver();
  }

  function startOver(){
    $(document).on("keydown", function(){
      level = 0;
      gamePattern.length = 0;
      started = false;
    })
  }
}
