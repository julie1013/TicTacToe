// $(document).ready(function(){
  //run jQuery after document has loaded

  var player = 'X';
  var turnCounter = 0;

  var switchPlayer = function () {
    if (player === 'X') {
      player = 'O';
      return 'O';
    } else {
      player = 'X';
      return 'X';
    }
  };

  var board = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];

  var gameWonBy = function(){
    if (board[0][0]!== null && board[0][0] === board[1][1] && board[0][0] === board[2][2]){
      return board[0][0];
    } else if (board[2][0]!== null && board[2][0] === board[1][1] && board[2][0] === board[0][2]){
      return board[2][0];
    }
    for (var i = 0; i < 3; i++){
      if (board[i][0] !== null && board[i][0] === board[i][1] && board[i][0] === board[i][2]){
       return board[i][0];
      }
      if (board[0][i] !== null && board[0][i] === board [1][i] && board [0][i] === board[2][i]){
       return board[0][i];
      }
    }
    return null;
  }

  var timeResults = function (message) {
    var $message = $('.top');
    $message.find('p').remove('p');
    $message.append('<p>' + message + '</p>')
  }

  var updateScore = function (wonBy) {
    var $scoreTicker = $('.score' + wonBy + ' .score');
    var score = Number($scoreTicker.html());

    $scoreTicker.html(++score);
  };

  var resetBoard = function() {
    clearBoardUI();
    clearBoard();
  };

  var takeTurn = function(event){
    var squareClicked = event.target;
    var $sqClicked = $(squareClicked);
    var imageSrc;

    if ($sqClicked.html() === '') {
      //checks for html content
      board[squareClicked.dataset.row][squareClicked.dataset.col] = player;
      if (player === 'X') {
        imageSrc = 'hourglass.jpg';
      } else {
        imageSrc = 'clock.jpg';
      }
      // <img src="hourglass.jpg"/>
      $sqClicked.html('<img src="' + imageSrc + '" style="width: 60px;"/>');
      switchPlayer();
    }
    var winner = gameWonBy();
    turnCounter++;
    if (winner === "X") {
      timeResults("Let's go back in time!");
      updateScore(winner);
      resetBoard();
      turnCounter = 0;
    } else if (winner === "O") {
      timeResults("Onward to the future!");
      updateScore(winner);
      resetBoard();
      turnCounter = 0;
    } else if (NoWinner()) {
      timeResults("NO!!! We've created a time paradox!!!");
      resetBoard();
      turnCounter = 0;
    }
  }



  var clearBoardUI = function() {
    $('td').html('');
  };

  var clearBoard = function() {
    board = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
    ];
  };


  var NoWinner = function (){
    return turnCounter === 9;
  };


  $("#grid td").on("click", takeTurn);

// });


