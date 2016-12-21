var main = function() {

  var audioElement1 = document.createElement('audio');
  audioElement1.setAttribute('src', 'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
  var audioElement2 = document.createElement('audio');
  audioElement2.setAttribute('src', 'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
  var audioElement3 = document.createElement('audio');
  audioElement3.setAttribute('src', 'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
  var audioElement4 = document.createElement('audio');
  audioElement4.setAttribute('src', 'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');

  var simonMoves = []; // Array holds Simon's 20 moves.
  var playerMoves = []; // Holds player's moves to check against Simon's.
  var simonMoveNumber = 0;
  var randomNumber;
  var simonPlay; // 1 second timer that plays Simon's turn. 
  var simonEnd;
  var colorDelay = 700; // (milliseconds) Changes button colors for .7 seconds when pressed.
  var colorEnd = 1000; // 1 second delay between Simon moves.
  var turnLength = 0; // Goes up to 20 for the player win.
  var strictOn = false; // Strict mode.
  
  // Disable buttons on Simon's turn.
   function buttonDisable() {
    $('#blue').attr("disabled", true);
    $('#red').attr("disabled", true);
    $('#yellow').attr("disabled", true);
    $('#green').attr("disabled", true);
  }
  
  function buttonEnable() {
    $('#blue').attr("disabled", false);
    $('#red').attr("disabled", false);
    $('#yellow').attr("disabled", false);
    $('#green').attr("disabled", false);
  }
  
  // Button behavor - show a lighter color for .7 seconds than switch back to original color and make a sound.
  function greenPress() {
    function colorOriginal() {
      $('#green').css("background-color", "green");
    }
    $('#green').css("background-color", "#00ff00");
    setTimeout(colorOriginal, colorDelay)
    audioElement1.play();
   };

  function redPress() {
    function colorOriginal() {
      $('#red').css("background-color", "red");
    }
    $('#red').css("background-color", "pink");
    setTimeout(colorOriginal, colorDelay);
    audioElement2.play();
  };

  function yellowPress() {
    function colorOriginal() {
      $('#yellow').css("background-color", "yellow");
    }
    $('#yellow').css("background-color", "#ffff94");
    setTimeout(colorOriginal, colorDelay)
    audioElement3.play();
  };

  function bluePress() {
    function colorOriginal() {
      $('#blue').css("background-color", "blue");
    }
    $('#blue').css("background-color", "#add8e6");
    setTimeout(colorOriginal, colorDelay)
    audioElement4.play();
  };

  // Create Array with Simon's 20 random moves, 1=green, 2=red, 3=yellow, 4=blue.
  function simonCreate() {
    for (var i = 0; i < 20; i++) {
      randomNumber = Math.floor((Math.random() * 4) + 1);
      simonMoves.push(randomNumber);
    }
    //console.log(simonMoves)
  }

  // Every time function is run Simon will play his moves plus 1 more.
  function simonNextRound() {
    function simonTurn() {
      $('.count').html(turnLength + 1)
      $('h3').html("");
      switch (simonMoves[simonMoveNumber]) {
        case 1:
          greenPress();
          break;
        case 2:
          redPress();
          break;
        case 3:
          yellowPress();
          break;
        case 4:
          bluePress();
          break;
      }
      simonMoveNumber++;
    }

    // This calls simonTurn function over and over on a 1 second timer which cycles through the simonMoves Array.
    simonPlay = setInterval(simonTurn, 1000);

    function myTimer() {
      clearInterval(simonPlay);
      colorEnd = colorEnd + 1000;
      playerMoves = [];
      buttonEnable();
      turnLength ++;
      $('#start').attr("disabled", false);
    }
    // End the simonPlay timer 1 second later every turn which shows one more move.
    simonEnd = setTimeout(myTimer, colorEnd);
  }

  // When player presses button, pushes a number 1-4 into an playerMoves Array and checks it against simonMoves Array. Conditional checks player loss to see if Strict mode is on.
  function checkPlayerMoves() {
    simonMoveNumber = 0;
    // Player presses wrong button.
    for (var i = 0; i < playerMoves.length; i++) {
      if (playerMoves[i] != simonMoves[i]) {
        buttonDisable();
        $('#start').attr("disabled", true);
        if (strictOn == false) {
          $('h3').html("Try Again!");
          colorEnd = colorEnd - 1000;
          turnLength --;
          simonNextRound();
        } else if (strictOn == true) {
          $('h3').html("You Lose!");
          setTimeout(newGame, 2000);
        }
        return;
      }
    }
    //  Player presses correct button sequence that equals turnLength move to next round unless turnLength is 20, then its a win. 
    if (playerMoves.length == turnLength) {
      buttonDisable();
      if (turnLength == 20) {
        $('h3').html("YOU WIN!")
        $('#start').attr("disabled", true);
        setTimeout(newGame, 2000);
      } else {
        simonNextRound();
      }
    }
  }

  $('#green').click(function() {
    playerMoves.push(1);
    checkPlayerMoves();
    greenPress();
  });
  $('#red').click(function() {
    playerMoves.push(2);
    checkPlayerMoves();
    redPress();
  });
  $('#yellow').click(function() {
    playerMoves.push(3);
    checkPlayerMoves();
    yellowPress();
  });
  $('#blue').click(function() {
    playerMoves.push(4);
    checkPlayerMoves();
    bluePress();
  });

  function newGame() {
    simonMoves = [];
    playerMoves = [];
    simonMoveNumber = 0;
    turnLength = 0;
    colorEnd = 1000;
    $('h3').html("");
    $('.count').html('--');
    simonCreate();
    simonNextRound();
  }

  $('#start').click(function() {
    function colorOriginal() {
      $('#start').css("background-color", "red");
    }
    $('#start').css("background-color", "pink");
    $('#start').attr("disabled", true);
    setTimeout(colorOriginal, 1000)
    newGame();
  });

  $('#strict').click(function() {
    function colorOriginal() {
      $('#strict').css("background-color", "yellow");
    }
    $('#strict').css("background-color", "#ffff94");
    setTimeout(colorOriginal, 100)
    if (strictOn == false) {
      $('.circle').css("background-color", "red");
      strictOn = true;
    } else if (strictOn == true) {
      $('.circle').css("background-color", "white");
      strictOn = false;
    }
  });

  buttonDisable();
  $('.circle').attr("disabled", true);
}

$(document).ready(main);