class Board{
  constructor(size=3, computerTurn=2, board=null){
    this.position = [];
    //If we dont have a board to copy
    if(board === null){
      this.numMoves = 0;
      this.computerTurn = computerTurn;
      //Instantiating an empty starting position
      for(let i = 0; i < size; i++){
        let row = [];
        for(let j = 0; j < size; j++){
          row.push(0);
        }
        this.position.push(row);
      }
    }
    //Otherwise copy the important information from the given board
    else{
      this.numMoves = board.getTurns();
      this.computerTurn = board.getComputerTurn();

      let p = board.getPosition();
      for(let i = 0; i < p.length; i++){
        let row = [];
        for(let j = 0; j < p[i].length; j++){
          row.push(p[i][j]);
        }
        this.position.push(row);
      }
    }
    this.playerTurn = [2, 1][computerTurn - 1];
    this.players = [1, 2];
  }

  getComputerTurn(){
    return this.computerTurn;
  }

  getPosition(){
    return this.position;
  }

  getTurns(){
    return this.numMoves;
  }

  isFilled(){
    for(let i = 0; i < this.position.length; i++){
      for(let j = 0; j < this.position[i].length; j++){
        if(this.position[i][j] === 0){
          return false;
        }
      }
    }
    return true;
  }

  /*
  A function to check if a given player has won
  */
  isWin(player){
    for(let i = 0; i < this.position.length; i++){
      if(this.checkRow(player, i) || this.checkCol(player, i)){
        return true;
      }
    }
    return this.checkDiagonals(player);
  }

  /*
  A function to check if a win is on the two diagonals
  */
  checkDiagonals(player){
    let downCount = 0;
    let upCount = 0;
    for(let i = 0, j = this.position.length - 1; i < this.position.length; i++, j--){
      if(this.position[i][i] === player){
        downCount++;
      }
      else{
        downCount = 0;
      }
      if(this.position[j][i] === player){
        upCount++;
      }
      else{
        upCount = 0;
      }
    }
    return (downCount === this.position.length) || (upCount === this.position.length);
  }

  /*
  A function to check if a win is in a column
  Technically the drawn position is a transpose of our stored position
  So we really are checking a row here
  */
  checkCol(player, col){
    let count = 0;
    for(let i = 0; i < this.position.length; i++){
      if(this.position[i][col] === player){
        count++;
        if(count >= this.position.length){
          return true;
        }
      }
      else{
        count = 0;
      }
    }
    return false;
  }

  /*
  A function to check if a win is in a row
  Technically the drawn position is a transpose of our stored position
  So we really are checking a column here
  */
  checkRow(player, r){
    let row = this.position[r];
    let count = 0;
    for(let i = 0; i < row.length; i++){
      if(row[i] === player){
        count++;
        if(count >= this.position.length){
          return true;
        }
      }
      else{
        count = 0;
      }
    }
    return false;
  }

  /*
  A function to play a move at the given coordinates
  */
  move(i, j){
    let turn = this.numMoves % this.players.length;
    //If we can play the move, play it
    if(this.position[i][j] === 0){
      this.position[i][j] = this.players[turn];
      this.numMoves++;
      return true;
    }
    return false;
  }
}
