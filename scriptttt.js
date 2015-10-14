$(document).ready(function(){
  //run jQuery after document has loaded
  var squares = ['','','','','','','','','']

  $("#grid td").on("click", function (event){
    var squareClicked = event.target;
    $(squareClicked).html(switchPlayer);
  });

var player = "X";

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

  var playerXTurn = true;

  var gameWon = function(){
    if (board[0][0]!== null && board[0][0] === board[1][1] && board[0][0] === board[2][2]){
      return board[0][0];
    } else if (board[2][0]!== null && board[2][0] === board[1][1] && board[2][0] === board[0][2]){
      return board[2][0];
    }
    for (var i = 0; i < 3; i++){
      if (board[i][0] !== null && board[i][0] === board[i][1] && board [i][0] === board[i][2]){
       return board[i][0];
      }
      if (board[0][i] !== null && board[0][i] === board [1][i] && board [0][i] === board[2][i]){
       return board[0][i];
      }
    }
  }
  var takeTurn = function(event){

  }



});
