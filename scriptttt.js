// $(document).ready(function(){
  //run jQuery after document has loaded

  var player = "O";

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

  var updateScore = function updateScore(wonBy) {
    var $scoreTicker = $('.score' + wonBy + ' .score');
    var score = Number($scoreTicker.html());

    $scoreTicker.html(++score);
  };

  var resetBoard = function resetBoard() {
    clearBoardUI();
    clearBoard();
  };

  var takeTurn = function(event){
    var squareClicked = event.target;
    var $sqClicked = $(squareClicked);
    if ($sqClicked.html() === '') {
      //checks for html content
      board[squareClicked.dataset.row][squareClicked.dataset.col] = player;
      $sqClicked.html(player);
      switchPlayer();
    }
    var winner = gameWonBy();
    if (winner) {
      alert(winner + " wins");
      updateScore(winner);
      resetBoard();
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



  var isBoardFull = function() {
    // get this code from Christine
  };

  var NoWinner = function (){
    if (gameWonBy === null && isBoardFull()){
      alert("NO!!! We've created a time paradox!!!");
      resetBoard();
    }
  };


  $("#grid td").on("click", takeTurn);

// });


