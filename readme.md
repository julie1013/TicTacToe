Tick-Tock-Toe is a variation of Tic-Tac-Toe. However, in this case it is a time experiment. Players use hourglasses instead of "X"s, and clocks instead of "O"s. If hourglass wins, the player goes back in time. If clock wins, the player goes forward in time. A tie causes a time paradox.

I wanted to make a creative and funny experience for what is otherwise a boring game. The types of "stories" that I came up with in creating this game reflected that. As a user, I would be more interested in playing a mundane game like Tic-Tac-Toe if it had an amusing twist on it (such as declaring the creation of a time paradox if there are no winners, and also display of "black holes" when hovering over a cell). Therefore, I created the play on words, Tick-Tock-Toe.

I did draw a wireframe sketch for the game, but most of the game page's creation was done spontaneously; the sketch (which I no longer have) was a very rough guide.

I started by making the HTML and CSS first, as I knew that the design aspect would be the easiest. Plus, having a visual reference point to help me understand what the JavaScript would do when executing the game was important. The HTML and CSS were not an issue for me. However, in terms of the actual programming I did not know where to begin. Saad, Jeff, and Matt walked me through the process of creating the game. Saad reminded me of the importance of breaking down a major problem (the entire game) into little problems (variables, functions, etc.).

It was difficult for me to know which code to use for all different "small problems" in the game, but once it was explained to me it made sense. Tom helped me and some others on Tuesday night to get the game started. The simplest problem was thus the "switch" function, which set the game to switch back and forth between players.

Saad taught me that a good way to consolidate checking conditions for a winner in terms of rows and columns was to use a for loop within the "gameWonBy" function. The loop runs, first checking if coordinate [i][0] (i representing the row, and the number representing the corresponding column) is NOT null. If this is the case, then it checks the condition of two adjacent coordinates are the same (ie occupied and with the same game piece). The loop checked a second condition, this time with [0][i], with i representing the column and the number representing the row. Both conditional statements search six possible wins. When a win is found, the function stops. In order to check the other two possibilities (diagonal), a conditional statement searches for game piece matches in the coordinates that correspond with both diagonal wins. If a condition for one diagonal win is met, the function stops. I ended up setting the function to check for diagonal wins first because these are the two simplest conditions to check for.

One of the students showed me how to check for a tie. The game counts each time a move has been played. If there have been 9 moves and the condition of a winner has not been met, conditions for a tie have been met and the game is over.

HERE IS THE GAME: http://julie1013.github.io/TicTacToe/


