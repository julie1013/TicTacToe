// $(document).ready(function(){
  //run jQuery after document has loaded

  'use strict';
var tttapi = {
  gameWatcher: null,
  ttt: 'http://ttt.wdibos.com',

  ajax: function(config, cb) {
    $.ajax(config).done(function(data, textStatus, jqxhr) {
      cb(null, data);
    }).fail(function(jqxhr, status, error) {
      cb({jqxher: jqxhr, status: status, error: error});
    });
  },

  register: function register(credentials, callback) {
    this.ajax({
      method: 'POST',
      // url: 'http://httpbin.org/post',
      url: this.ttt + '/users',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(credentials),
      dataType: 'json'
    }, callback);
  },

  login: function login(credentials, callback) {
    this.ajax({
      method: 'POST',
      // url: 'http://httpbin.org/post',
      url: this.ttt + '/login',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(credentials),
      dataType: 'json'
    }, callback);
  },

  //Authenticated api actions
  listGames: function (token, callback) {
    this.ajax({
      method: 'GET',
      url: this.ttt + '/games',
      headers: {
        Authorization: 'Token token=' + token
      },
      dataType: 'json'
      }, callback);
  },

  createGame: function (token, callback) {
    this.ajax({
      method: 'POST',
      url: this.ttt + '/games',
      headers: {
        Authorization: 'Token token=' + token
      },
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify({}),
      dataType: 'json',
    }, callback);
  },

  showGame: function (id, token, callback) {
    this.ajax({
      method: 'GET',
      url: this.ttt + '/games/' + id,
      headers: {
        Authorization: 'Token token=' + token
      },
      dataType: 'json'
    }, callback);
  },

  joinGame: function (id, token, callback) {
    this.ajax({
      method: 'PATCH',
      url: this.ttt + '/games/' + id,
      headers: {
        Authorization: 'Token token=' + token
      },
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify({}),
      dataType: 'json'
    }, callback);
  },

  markCell: function (id, data, token, callback) {
    this.ajax({
      method: 'PATCH',
      url: this.ttt + '/games/' + id,
      headers: {
        Authorization: 'Token token=' + token
      },
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(data),
      dataType: 'json'
    }, callback);
  },

  watchGame: function (id, token) {
    var url = this.ttt + '/games/' + id + '/watch';
    var auth = {
      Authorization: 'Token token=' + token
    };
    this.gameWatcher = resourceWatcher(url, auth); //jshint ignore: line
    return this.gameWatcher;
  }
};

var token;
var gameID;
//$(document).ready(...
$(function() {
  var form2object = function(form) {
    var data = {};
    $(form).children().each(function(index, element) {
      var type = $(this).attr('type');
      if ($(this).attr('name') && type !== 'submit' && type !== 'hidden') {
        data[$(this).attr('name')] = $(this).val();
      }
    });
    return data;
  };
  var wrap = function wrap(root, formData) {
    var wrapper = {};
    wrapper[root] = formData;
    return wrapper;
  };

  var callback = function callback(error, data) {
    if (error) {
      console.error(error);
      $('#result').val('status: ' + error.status + ', error: ' +error.error);
      return;
    }
    $('#result').val(JSON.stringify(data, null, 4));
  };

  $('#register').on('submit', function(e) {
    var credentials = wrap('credentials', form2object(this));
    tttapi.register(credentials, callback);
    e.preventDefault();
  });
  $('#login').on('submit', function(e) {
    var credentials = wrap('credentials', form2object(this));
    var cb = function cb(error, data) {
      if (error) {
        callback(error);
        return;
      }
      callback(null, data);
      $('.token').val(data.user.token);
      token = data.user.token;
    };
    e.preventDefault();
    tttapi.login(credentials, cb);
  });



  $('#list-games').on('submit', function(e) {
    var token = $(this).children('[name="token"]').val();
    e.preventDefault();
    tttapi.listGames(token, callback);
  });

  $('#create-game').on('submit', function(e) {
    var token = $(this).children('[name="token"]').val();
    e.preventDefault();
    tttapi.createGame(token, function(err, data){
      gameID = data.game.id;
      resetBoard();
    });
  });

  $('#show-game').on('submit', function(e) {
    var token = $(this).children('[name="token"]').val();
    var id = $('#show-id').val();
    e.preventDefault();
    tttapi.showGame(id, token, callback);
  });

  $('#join-game').on('submit', function(e) {
    var token = $(this).children('[name="token"]').val();
    var id = $('#join-id').val();
    e.preventDefault();
    tttapi.joinGame(id, token, callback);
  });

  $('#mark-cell').on('submit', function(e) {
    var token = $(this).children('[name="token"]').val();
    var id = $('#mark-id').val();
    var data = wrap('game', wrap('cell', form2object(this)));
    e.preventDefault();
    tttapi.markCell(id, data, token, callback);
  });

  $('#watch-game').on('submit', function(e){
    var token = $(this).children('[name="token"]').val();
    var id = $('#watch-id').val();
    e.preventDefault();

    var gameWatcher = tttapi.watchGame(id, token);

    gameWatcher.on('change', function(data){
      var parsedData = JSON.parse(data);
      if (data.timeout) { //not an error
        this.gameWatcher.close();
        return console.warn(data.timeout);
      }
      var gameData = parsedData.game;
      var cell = gameData.cell;
      $('#watch-index').val(cell.index);
      $('#watch-value').val(cell.value);
    });
    gameWatcher.on('error', function(e){
      console.error('an error has occured with the stream', e);
    });
  });

});

// var row = [0];
// var col = [0];


var convert = function(row, col){
  // board[row][col] => result value
  // board[0][0] => 0;
  // board[0][1] => 1;
  // board[0][2] => 2;
  // board[1][0] => 3;
  // board[1][1] => 4;
  // board[1][2] => 5;
  // board[2][0] => 6;
  // board[2][1] => 7;
  // board[2][2] => 8;
  return Number(row)*3 + Number(col);
}




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
  };

  var timeResults = function (message) {
    var $message = $('.top');
    $message.find('p').remove('p');
    $message.append('<p>' + message + '</p>');
  };

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
      $sqClicked.html('<img src="' + imageSrc + '" style="width: 60px;"/>');
      var changeData = {game: {cell: {
       index: convert(squareClicked.dataset.row, squareClicked.dataset.col),
        value: player
      }}};
      tttapi.markCell(gameID, changeData , token, function(){

        switchPlayer();
      });
    }
    var winner = gameWonBy();
    turnCounter++;
    if (winner === "X") {
      timeResults("Let's go back in time!");
      updateScore(winner);
      turnCounter = 0;
    } else if (winner === "O") {
      timeResults("Onward to the future!");
      updateScore(winner);
      turnCounter = 0;
    } else if (noWinner()) {
      timeResults("NO!!! We've created a time paradox!!!");
      turnCounter = 0;
    }
  };



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


  var noWinner = function (){
    return turnCounter === 9;
  };


  $("#grid td").on("click", takeTurn);

// });


