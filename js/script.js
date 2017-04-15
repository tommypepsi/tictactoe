var isFirefox = typeof InstallTrigger !== 'undefined';

const board = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
]
const board3D = [
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

function winCheck(board, is3d){
  if(!is3d){
    for(let i = 0; i < board.length; i++){
      //console.log(board[i][0] + " " + board[i][1] + " " + board[i][2])
      if(board[0][i] === board[1][i] && board[0][i] === board[2][i] && board[0][i] !== 0){
        return players[board[0][i]]
      }
      if(board[i][0] === board[i][1] && board[i][0] === board[i][2] && board[i][0] !== 0){
        return players[board[i][0]]
      }

    }
    if(board[0][0] === board[1][1] && board[0][0] === board[2][2] && board[0][0] !== 0 ||
      board[0][2] === board[1][1] && board[0][2] === board[2][0] && board[0][2] !== 0){
        return players[board[1][1]]
    }

    let tie = true
    for(let i = 0; i < board.length; i++){
      for(let j = 0; j < board[i].length; j++){
        if(board[i][j] === 0){
          tie = false;
        }
      }
    }
    if(tie){
      return "tie"
    }
    return 0
  }
  //win conditions for 3d tic tac toe
  else{
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
}

function redrawBoard(board, is3d){
  const slots = document.getElementsByTagName("td");
  if(is3d){
    for(let i = 9, table = 0, line = 0, slot = 0; i < slots.length; i++, slot++){
      if(i%3 === 0 && i !== 0){
        line++
        slot = 0
      }
      if(i%9 === 0 && i !== 0){
        line = 0
        table++
      }
      if(table === 4){
        break
      }
      if(board[table - 1][line][slot] > 0){
        slots[i].innerHTML = players[board[table - 1][line][slot]]
      }
      else{
        slots[i].innerHTML = ""
      }
    }
  }
  else{
    for(let i = 0, line = 0, slot = 0; i < slots.length; i++, slot++){
      if(i%3 === 0 && i !== 0){
        line++
        slot = 0
      }

      if(line === 3){
        break
      }
      if(board[line][slot] > 0){
        slots[i].innerHTML = players[board[line][slot]]
      }
      else{
        slots[i].innerHTML = ""
      }
    }
  }

}

function getNewState(board, move, player, is3d){
  if(is3d){
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
  else{
    let predictionBoard = []
    for(let i = 0; i < board.length; i++){
      predictionBoard.push(board[i].slice(0))
    }
    predictionBoard[move[0]][move[1]] = player
    return predictionBoard
  }
}

function getScore(board, is3d){
  if(winCheck(board, is3d) == "tie"){
    return 0
  }
  else if(players[1] == winCheck(board, is3d)){
    return 10
  }
  else{
    return -10
  }
}

function minimax(board, virtualPlayer, depth, is3d){
  if(winCheck(board, is3d)){
    return getScore(board, is3d) - depth
  }
  let scores = []
  let moves = []

  if(is3d){
    for(let i = 0; i < board.length; i++){
      for(let j = 0; j < board[i].length; j++){
        for(let k = 0; k < board[i][j].length; k++){
          if(board[i][j][k] === 0){
            let possibleGame = getNewState(board, [i, j, k], virtualPlayer, is3d)

            let nextPlayer
            if(virtualPlayer === 1){
              nextPlayer = 2
            }
            else{
              nextPlayer = 1
            }
            if(depth < 3){
              scores.push(minimax(possibleGame, nextPlayer, depth + 1, is3d))
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
  }
  else{
    for(let i = 0; i < board.length; i++){
      for(let j = 0; j < board[i].length; j++){
        if(board[i][j] === 0){
          let possibleGame = getNewState(board, [i, j], virtualPlayer, is3d)

          let nextPlayer
          if(virtualPlayer === 1){
            nextPlayer = 2
          }
          else{
            nextPlayer = 1
          }
          scores.push(minimax(possibleGame, nextPlayer, depth + 1, is3d))
          moves.push([i, j])

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

function basicInteraction(isOnePlayer, is3d, board){
  if(!is3d){
    document.getElementById("board").style.display = "block"
  }
  else{
    document.getElementById("board3D").style.display = "block"
  }
  document.getElementById("menu").style.display = "none"
  if(isOnePlayer){
    document.getElementById("choose").style.display = "block"
  }
  const slots = document.getElementsByTagName("td");
  currentPlayer = 1



  if(is3d){
    document.getElementById("O").onclick = function(){
      if(currentPlayer === 2){
        currentPlayer = 1
      }
      console.log(minimax(board, currentPlayer, 0, is3d))
      console.log(bestMove)
      board[bestMove[0]][bestMove[1]][bestMove[2]] = currentPlayer
      console.log(board)
      redrawBoard(board, is3d)
      if(currentPlayer == 1){
        currentPlayer = 2
      }
      else {
        currentPlayer = 1
      }
      document.getElementById("turn").innerHTML = players[currentPlayer]
      document.getElementById("turn").style.display = "block"
      document.getElementById("choose").style.display = "none"
    }
    document.getElementById("X").onclick = function(){
      currentPlayer = 1
      document.getElementById("choose").style.display = "none"
      document.getElementById("turn").innerHTML = players[currentPlayer]
      document.getElementById("turn").style.display = "block"
    }

    document.getElementById("turn").innerHTML = players[currentPlayer]
    document.getElementById("turn").style.display = "block"


    for(let i = 9, table = 0, line = 0, slot = 0; i < slots.length; i++, slot++){
      if(i%3 === 0 && i !== 0){
        line++
        slot = 0
      }
      if(i%9 === 0 && i !== 0){
        table++
        line = 0
      }

      slots[i].onclick = function() {
        if(board[table - 1][line][slot] === 0){
          board[table - 1][line][slot] = currentPlayer

          redrawBoard(board, is3d)
          if(currentPlayer == 1){
            currentPlayer = 2
          }
          else {
            currentPlayer = 1
          }
          document.getElementById("turn").innerHTML = players[currentPlayer]
          if(isOnePlayer){
            console.log(minimax(board, currentPlayer, 0, is3d))
            console.log(bestMove)
            board[bestMove[0]][bestMove[1]][bestMove[2]] = currentPlayer
            console.log(board)
            redrawBoard(board, is3d)
            if(currentPlayer == 1){
              currentPlayer = 2
            }
            else {
              currentPlayer = 1
            }
            document.getElementById("turn").innerHTML = players[currentPlayer]
          }

          if(winCheck(board, is3d)){
            let winner = winCheck(board, is3d)
            if(winner == "tie"){
              document.getElementById("winner").innerHTML = "TIE"
            }
            else{
              document.getElementById("winner").innerHTML = '"' + winner + '" WINS'
            }
            document.getElementById("endGame").style.display = "block"
            document.getElementById("restart").onclick = function(){
              for(let i = 0; i < board.length; i++){
                for(let j = 0; j < board[i].length; j++){
                  for(let k = 0; k < board[i][j].length; k++){
                      board[i][j][k] = 0;
                  }
                }
              }
              redrawBoard(board, is3d)
              document.getElementById("endGame").style.display = "none"
              if(isOnePlayer){
                document.getElementById("choose").style.display = "block"
              }
              currentPlayer = 1
              document.getElementById("turn").innerHTML = players[currentPlayer]
            }
            document.getElementById("changeMode").onclick = function(){
              for(let i = 0; i < board.length; i++){
                for(let j = 0; j < board[i].length; j++){
                  for(let k = 0; k < board[i][j].length; k++){
                      board[i][j][k] = 0;
                  }
                }
              }
              redrawBoard(board, is3d)
              document.getElementById("board3D").style.display = "none"
              document.getElementById("endGame").style.display = "none"
              document.getElementById("turn").style.display = "none"
              document.getElementById("menu").style.display = "block"
            }
          }
        }
      }
    }
  }
  else{
    document.getElementById("O").onclick = function(){
      if(currentPlayer === 2){
        currentPlayer = 1
      }
      console.log(minimax(board, currentPlayer, 0, is3d))
      board[bestMove[0]][bestMove[1]] = currentPlayer
      redrawBoard(board, is3d)
      if(currentPlayer == 1){
        currentPlayer = 2
      }
      else {
        currentPlayer = 1
      }
      document.getElementById("turn").innerHTML = players[currentPlayer]
      document.getElementById("turn").style.display = "block"
      document.getElementById("choose").style.display = "none"
    }
    document.getElementById("X").onclick = function(){
      currentPlayer = 1
      document.getElementById("choose").style.display = "none"
      document.getElementById("turn").innerHTML = players[currentPlayer]
      document.getElementById("turn").style.display = "block"
    }

    document.getElementById("turn").innerHTML = players[currentPlayer]
    document.getElementById("turn").style.display = "block"

    for(let i = 0, line = 0, slot = 0; i < slots.length; i++, slot++){
      if(i%3 === 0 && i !== 0){
        line++
        slot = 0
      }

      slots[i].onclick = function() {
        if(board[line][slot] === 0){
          board[line][slot] = currentPlayer

          redrawBoard(board, is3d)
          if(currentPlayer == 1){
            currentPlayer = 2
          }
          else {
            currentPlayer = 1
          }
          document.getElementById("turn").innerHTML = players[currentPlayer]
          if(isOnePlayer){
            console.log(minimax(board, currentPlayer, 0, is3d))
            board[bestMove[0]][bestMove[1]] = currentPlayer
            redrawBoard(board, is3d)
            if(currentPlayer == 1){
              currentPlayer = 2
            }
            else {
              currentPlayer = 1
            }
            document.getElementById("turn").innerHTML = players[currentPlayer]
          }

          if(winCheck(board, is3d)){
            let winner = winCheck(board, is3d)
            if(winner == "tie"){
              document.getElementById("winner").innerHTML = "TIE"
            }
            else{
              document.getElementById("winner").innerHTML = '"' + winner + '" WINS'
            }
            document.getElementById("endGame").style.display = "block"
            document.getElementById("restart").onclick = function(){
              for(let i = 0; i < board.length; i++){
                for(let j = 0; j < board[i].length; j++){
                  board[i][j] = 0;
                }
              }
              redrawBoard(board, is3d)
              document.getElementById("endGame").style.display = "none"
              if(isOnePlayer){
                document.getElementById("choose").style.display = "block"
              }
              currentPlayer = 1
              document.getElementById("turn").innerHTML = players[currentPlayer]
            }
            document.getElementById("changeMode").onclick = function(){
              for(let i = 0; i < board.length; i++){
                for(let j = 0; j < board[i].length; j++){
                  board[i][j] = 0;
                }
              }
              redrawBoard(board, is3d)
              document.getElementById("board").style.display = "none"
              document.getElementById("endGame").style.display = "none"
              document.getElementById("turn").style.display = "none"
              document.getElementById("menu").style.display = "block"
            }
          }
        }
      }
    }
  }
}

window.onload = function(){
  if(isFirefox){
    document.getElementById("leftPlane").style.display = "none"
  }
  document.getElementById("twoPlayer").onclick = function(){
    if(document.getElementById("versionTwo").style.height == "100px"){
      document.getElementById("versionTwo").style.height = "0px"
    }
    else{
      document.getElementById("versionTwo").style.height = "100px"
    }
  }
  document.getElementById("onePlayer").onclick = function(){
    if(document.getElementById("versionOne").style.height == "100px"){
      document.getElementById("versionOne").style.height = "0px"
    }
    else{
      document.getElementById("versionOne").style.height = "100px"
    }
  }

  document.getElementById("classicOne").onclick = function(){
    basicInteraction(true, false, board)
  }
  document.getElementById("dimensionOne").onclick = function(){
    basicInteraction(true, true, board3D)
  }
  document.getElementById("classicTwo").onclick = function(){
    basicInteraction(false, false, board)
  }
  document.getElementById("dimensionTwo").onclick = function(){
    basicInteraction(false, true, board3D)
  }
}
