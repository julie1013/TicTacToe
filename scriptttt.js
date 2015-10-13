$(document).ready(function(){
  //run jQuery after document has loaded
  var squares = ['','','','','','','','','']

  $("#grid").on("click", function (event){
    var squareClicked = event.target;
    $(squareClicked).html(switchPlayer);
  });

var currentPlayer = "X";

var switchPlayer = function () {
  if (currentPlayer === 'X') {
    currentPlayer = 'O';
    return 'O';
      } else {
        currentPlayer = 'X';
        return 'X';
      }
  };

var getWinner = function(){
  if (isWinnerX()) {
    return 'X';
  }
  if (isWinnerO) {
    return 'O';
  }
  return null;
};

var isWinner = function(player){
  return winsRow()|| winsColumn()|| winsDiagonal();
};

var winsRow = function(player){
      return allThree(cells('a'), cells('b'), cells('c')) ||
      return allThree(cells('d'), cells('e'), cells('f')) ||
      return allThree(cells('g'), cells('h'), cells('i'));
    };

var winsColumn = function(player){
  return allThree(cells('a'), cells('d'), cells('g')) ||
  return allThree(cells('b'), cells('e'), cells('h')) ||
  return allThree(cells('c'), cells('f'), cells('i'));
};

var winsDiagonal = function(player){
  return allThree(cells('a'), cells('e'), cells('i'))||
  return allThree(cells('c'), cells('e'), cells('g'))
};

function allThree(player, cellOne, cellTwo, cellThree) {
  return (cellOne === player) && (cellTwo === player) && (cellThree === player);
};

});

