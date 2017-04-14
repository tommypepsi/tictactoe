const board = [
  [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ],
  [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ],
  [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ]
]
let currentPlayer = 1
let players = {
  1: "X",
  2: "O"
}
var a = 0

function winCheck(board){
  for(let i = 0; i < board.length; i++){

    for(let j = 0; j < board[i].length; j++){
      //look for vertical line
      if(board[i][0][j] === board[i][1][j] && board[i][0][j] === board[i][2][j] && board[i][0][j] !== 0){
        return players[board[i][0][j]]
      }
      //look horizontal line
      if(board[i][j][0] === board[i][j][1] && board[i][j][0] === board[i][j][2] && board[i][j][0] !== 0){
        return players[board[i][j][0]]
      }
      //another level for the z axis
      for(let k = 0; k < board[i][j].length; k++){
        //look for line on z axis
        if(board[0][j][k] === board[1][j][k] && board[0][j][k] === board[2][j][k] && board[0][j][k] !== 0){
          return players[board[0][j][k]]
        }

        //look for diagonal on the z and y axis and z and x
        let oposingKSide
        let oposingJSide
        if(k === 0){
          oposingKSide = 2
        }
        else if(k === 2){
          oposingKSide = 0
        }
        if(j === 0){
          oposingJSide = 2
        }
        else if(j === 2){
          oposingJSide = 0
        }

        if(board[0][j][k] === board[1][j][1] && board[0][j][k] === board[2][j][oposingKSide] && board[0][j][k] !== 0){
          return players[board[0][j][k]]
        }
        if(oposingJSide !== undefined){
          if(board[0][j][k] === board[1][1][k] && board[0][j][k] === board[2][oposingJSide][k] && board[0][j][k] !== 0){
            return players[board[0][j][k]]
          }
        }
      }
    }
  }
  //look for diagonal in a board
  for(let i = 0; i < board.length; i++){
    if(board[i][0][0] === board[i][1][1] && board[i][0][0] === board[i][2][2] && board[i][0][0] !== 0 ||
      board[i][0][2] === board[i][1][1] && board[i][0][2] === board[i][2][0] && board[i][0][2] !== 0){
        return players[board[i][1][1]]
    }
  }

  //loog for diagonal on z axix
  let middle = board[1][1][1]
  if(board[0][0][0] === middle && board[0][0][0] === board[2][2][2] && middle !== 0 ||
    board[0][0][2] === middle && board[0][0][2] === board[2][2][0] && middle !== 0 ||
    board[0][2][0] === middle && board[0][2][0] === board[2][0][2] && middle !== 0 ||
    board[0][2][2] === middle && board[0][2][2] === board[2][0][0] && middle !== 0){
      return players[middle]
    }

  //finally look if there's a tie
  let tie = true
  for(let i = 0; i < board.length; i++){
    for(let j = 0; j < board[i].length; j++){
      for(let k = 0; k < board[i][j].length; k++)
      if(board[i][j][k] === 0){
        tie = false;
      }
    }
  }
  if(tie){
    return "tie"
  }
  return 0
}

function redrawBoard(board){
  const slots = document.getElementsByTagName("td")

  for(let i = 0, table = 0, line = 0, slot = 0; i < slots.length; i++, slot++){
    if(i%3 === 0 && i !== 0){
      line++
      slot = 0
    }
    if(i%9 === 0 && i !== 0){
      line = 0
      table++
    }

    if(board[table][line][slot] > 0){
      slots[i].innerHTML = players[board[table][line][slot]]
    }

  }

}

function getNewState(board, move, player){
  let predictionBoard = []
  for(let i = 0; i < board.length; i++){
    predictionBoard.push([])
    for(let j = 0; j < board[i].length; j++){
      predictionBoard[i].push(board[i][j].slice(0))
    }
  }
  predictionBoard[move[0]][move[1]][move[2]] = player
  return predictionBoard
}

function getScore(board){
  let winner = winCheck(board)


  if(winCheck(board) == "tie"){
    return 0
  }
  else if(players[1] == winCheck(board)){

    return 10
  }
  else{
    return -10
  }
}

function minimax(board, virtualPlayer, depth){
  if(winCheck(board)){
    return getScore(board) - depth
  }
  let scores = []
  let moves = []
  for(let i = 0; i < board.length; i++){
    for(let j = 0; j < board[i].length; j++){
      for(let k = 0; k < board[i][j].length; k++){
        if(board[i][j][k] === 0){
          let possibleGame = getNewState(board, [i, j, k], virtualPlayer)

          let nextPlayer
          if(virtualPlayer === 1){
            nextPlayer = 2
          }
          else{
            nextPlayer = 1
          }
          if(depth < 3){
            scores.push(minimax(possibleGame, nextPlayer, depth + 1))
            moves.push([i, j, k])
          }
          else{
            scores.push(5 - depth)
            moves.push([i, j, k])
          }
        }
      }
    }
  }

  if(virtualPlayer == 1){
    let maxIndex = scores.indexOf(Math.max.apply(Math, scores))
    bestMove = moves[maxIndex]
    return scores[maxIndex]
  }
  else{
    let minIndex = scores.indexOf(Math.min.apply(Math, scores))
    bestMove = moves[minIndex]
    return scores[minIndex]
  }


}
 var bestMove;
 console.log(minimax(board, currentPlayer, 0))
 console.log(bestMove);

window.onload = function(){
  const slots = document.getElementsByTagName("td")

  for(let i = 0, table = 0, line = 0, slot = 0; i < slots.length; i++, slot++){
    if(i%3 === 0 && i !== 0){
      line++
      slot = 0
    }
    if(i%9 === 0 && i !== 0){
      table++
      line = 0
    }

    slots[i].onclick = function() {
      board[table][line][slot] = currentPlayer
      redrawBoard(board)
      if(currentPlayer == 1){
        currentPlayer = 2
      }
      else {
        currentPlayer = 1
      }
      console.log(minimax(board, currentPlayer, 0))
      console.log(bestMove);

      if(winCheck(board)){
        let winner = winCheck(board)
        if(winner == "tie"){
          alert("TIE")
        }
        else{
          alert('"' + winCheck(board) + '" WINS')
        }

      }
    }
  }
}
