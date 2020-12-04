
let gameActive = true
let squareStates = ['','','','','','','','','']
let currentPlayer = 'X'
const gameStatus = document.querySelector('.game-status')
const squares = document.querySelectorAll('.square')
const restartBtn = document.querySelector('.restart-game')
const winningCombo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
// create message functions

const declareWinner = () => `Player ${currentPlayer} has won the game `
const declareTie = ()=> `The game ended in a draw`
const currentPlayerTurn =() => `it is ${currentPlayer}'s turn`


const handleCellClicked =(e)=>{
    const clickedElement = e.target
    const clickedElementIndex = Number(clickedElement.getAttribute('data-square-index'))

    if(squareStates[clickedElementIndex] !=='' || !gameActive){
        return
    }

    squareStates[clickedElementIndex] = currentPlayer 
    clickedElement.innerHTML = currentPlayer
    handleWinner()
}

const handleWinner =()=>{
    let gameWon = false

    for(let i = 0; i<=7; i++){
        let firstChar = squareStates[winningCombo[i][0]]
        let secondChar = squareStates[winningCombo[i][1]]
        let thirdChar = squareStates[winningCombo[i][2]]

        if(firstChar ==='' || secondChar === '' || thirdChar === ''){
            continue
        }
        if(firstChar === secondChar && secondChar === thirdChar){
            gameWon = true
            break
        }
    }

    if(gameWon){
        gameStatus.innerHTML = declareWinner()
        gameActive = false
        return
    }

    if(!squareStates.includes('')){
        gameStatus.innerHTML = declareTie()
        gameActive = false
        return
    }
    changePlayerTurn()
}

const changePlayerTurn =()=>{
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
    gameStatus.innerHTML =currentPlayerTurn()
}
const restartGame = ()=>{
    currentPlayer = 'X'
    squareStates = ['','','','','','','','','']
    gameActive = true
    gameStatus.innerHTML = currentPlayerTurn()
    squares.forEach(square=> square.innerHTML='')
}
squares.forEach(square=> square.addEventListener('click', handleCellClicked))
restartBtn.addEventListener('click', restartGame)