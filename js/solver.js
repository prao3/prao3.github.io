class Solver{
  constructor(computerTurn){
    this.computerTurn = computerTurn;
    this.playerTurn = [2, 1][computerTurn - 1];
    //A little counter to keep track of positions explored in a move
    this.numExplored = 0;
  }
  /*
  A function that returns the next move for a given position
  */
  nextMove(board){
    let miniMove = this.minimax(board);
    let alphaMove = this.alphabeta(board);
    if(miniMove[0] != alphaMove[0] || miniMove[1] != alphaMove[1]){
      console.log("Move mismatch, uh oh");
    }
    return alphaMove;
  }

  /*
  A function that plays random move for this player's turn
  */
  randomMove(board){
    let done = false;
    let turn = numMoves % players.length;
    let position = board.getPosition();
    //Finding an open random move we can make
    while(!done){
      let x = this.getRandomInt(position.length);
      let y = this.getRandomInt(position.length);
      //If we can play the move...
      if(position[x][y] === 0){
        //Stop the loop and return the coordinates
        return [x, y];
      }
    }
  }

  /*
  A function that returns a random integer in the range [0, max)
  */
  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  /*
  A function that returns the best move using minimax with alpha-beta pruning
  */
  alphabeta(board){
    //Initialize bestScore as the worst possible score
    //The worst score should be -10 - 9 at worst, so -20 is good enough
    let bestScore = -20;
    let bestMove = [0, 0];
    for(let i = 0; i < board.getPosition().length; i++){
      for(let j = 0; j < board.getPosition().length; j++){
        if(board.getPosition()[i][j] === 0){
          let copy = new Board(board.getPosition().length, board.getComputerTurn(), board);
          copy.move(i, j);
          let score = this.__alphabeta(copy, -1000, 1000, false);
          if(score >= bestScore){
            bestScore = score;
            bestMove[0] = i;
            bestMove[1] = j;
          }
        }
      }
    }
    //Logging explored positions
    console.log("Alpha-Beta states explored: " + this.numExplored);
    this.numExplored = 0;
    return bestMove;
  }

  __alphabeta(board, alpha, beta, maximizing){
    this.numExplored++;
    //If the computer wins, return 1
    if(board.isWin(this.computerTurn)){
      return 10;
    }
    //If the opponent wins, return -1
    else if(board.isWin(this.playerTurn)){
      return -10;
    }
    //Otherwise, if it's a tie, return 0
    else if(board.isFilled()){
      return 0;
    }

    let bestScore;
    if(maximizing){
      bestScore = -20;
    }
    else{
      bestScore = 10;
    }

    for(let i = 0; i < board.getPosition().length; i++){
      for(let j = 0; j < board.getPosition().length; j++){
        if(board.getPosition()[i][j] === 0){
          let copy = new Board(board.getPosition().length, board.getComputerTurn(), board);
          copy.move(i, j);
          let score = this.__alphabeta(copy, alpha, beta, !maximizing);
          if(maximizing){
            bestScore = Math.max(score, bestScore);
            //Set alpha in here
            alpha = Math.max(alpha, bestScore);
          }
          else{
            bestScore = Math.min(score, bestScore);
            //Set beta in here
            beta = Math.min(beta, bestScore);
          }
          //Check alpha-beta here
          if(alpha >= beta){
            break;
          }
        }
      }
    }
    //Subtracting 1 from best score at each step to promote moves that win quickly
    return bestScore - 1;
  }

  /*
  Using the minimax algorithm to give the best move in a given position
  */
  minimax(board){
    //Initialize bestScore as the worst possible score
    //The worst score should be -10 - 9 at worst, so -20 is good enough
    let bestScore = -20;
    let bestMove = [0, 0];
    for(let i = 0; i < board.getPosition().length; i++){
      for(let j = 0; j < board.getPosition().length; j++){
        if(board.getPosition()[i][j] === 0){
          let copy = new Board(board.getPosition().length, board.getComputerTurn(), board);
          copy.move(i, j);
          let score = this.__minimax(copy, false);
          if(score >= bestScore){
            bestScore = score;
            bestMove[0] = i;
            bestMove[1] = j;
          }
          //console.log("Move: [" + i + ", " + j + "], Score: " + score);
        }
      }
    }
    //Logging explored positions
    console.log("Minimax states explored: " + this.numExplored);
    this.numExplored = 0;
    return bestMove;
  }

  __minimax(board, maximizing){
    this.numExplored++;
    //If the computer wins, return 1
    if(board.isWin(this.computerTurn)){
      return 10;
    }
    //If the opponent wins, return -1
    else if(board.isWin(this.playerTurn)){
      return -10;
    }
    //Otherwise, if it's a tie, return 0
    else if(board.isFilled()){
      return 0;
    }

    let bestScore;
    if(maximizing){
      bestScore = -20;
    }
    else{
      bestScore = 10;
    }

    for(let i = 0; i < board.getPosition().length; i++){
      for(let j = 0; j < board.getPosition().length; j++){
        if(board.getPosition()[i][j] === 0){
          let copy = new Board(board.getPosition().length, board.getComputerTurn(), board);
          copy.move(i, j);
          let score = this.__minimax(copy, !maximizing);
          if(maximizing){
            bestScore = Math.max(score, bestScore);
          }
          else{
            bestScore = Math.min(score, bestScore);
          }
        }
      }
    }
    //Subtracting 1 from best score at each step to promote moves that win quickly
    return bestScore - 1;
  }

  /*
  Returns a deep copy of any position
  */
  copyPosition(position){
    let copy = [];
    for(let i = 0; i < position.length; i++){
      let row = [];
      for(let j = 0; j < position[i].length; j++){
        row.push(position[i][j]);
      }
      copy.push(row);
    }
    return copy;
  }
}
