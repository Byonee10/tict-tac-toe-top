const chooseXObtn = document.querySelector(".chooseXO-btn");
const chooseXO = document.querySelector(".chooseXO");
function displayXO(){
    chooseXO.classList.toggle("closed");
    console.log("display work")
}

chooseXObtn.addEventListener("click",displayXO);


const gameBoard = (() => {
    let winner;
    let getWinner = () => winner;
    let gameboard = [["","",""],
                     ["","",""],
                     ["","",""]];
    
    const getBoard = () => gameboard;
    const getPosition = (row,column) => gameboard[row][column];
    const setPosition = (row,column,el) => gameboard[row][column] = el;
    const resetBoard = () => {
        gameboard = [[0,0,0],
        [0,0,0],
        [0,0,0]];
    };
    return{
    getBoard,
    getWinner,
    getPosition,
    setPosition,
    resetBoard
}

})();

const Player = (name,mark) =>
{
    const getName = () => name;
    const getMark = () => mark;

    return{
        getName,getMark
    }
}

const gameController = (()=>{

    let player1 = Player("Player1","X");
    let player2 = Player("Player2","O");
    let turn= true; 
    let board;
    let winner = null;
    const getWinner = () => winner;
    const whoseTurn = () => turn?player1:player2;
    const switchTurn = () => turn = turn?false:true;
    const startGame = () =>{
        gameBoard.resetBoard();
        turn = true;
        board = gameBoard.getBoard();
    }
    const handleMove = (moveRow,moveColumn) => {
        if(!isGameOver()){
            gameBoard.setPosition(moveRow,moveColumn,whoseTurn().getMark());
            switchTurn();
        }
    }
    const isGameOver = (board) =>
    {
        //check row and columns
        for(let i = 0; i<3; i++){
            if(board[i][0] !== "" && board[i][0] === board[i][1] && board[i][1]===board[i][2]){
                winner == board[i][0];
            }

            else if(board[0][i] !== "" && board[0][i] === board[1][i] && board[1][i] === board[2][i] ){
                winner == board[0][i];
            }

        }

        //check diagonals
        
        if(board[0][0] !== "" && board[0][0]===board[1][1] && board[1][1] === board[2][2]){
            winner = board[0][0];
        }
        else if(board[2][0]!=="" && board[2][0] === board[1][1]&& board[1][1] === board[0][2] ){
            winner = board[2][0];
        }
        
        //if there is winner return the winner mark
        if(winner){
            return winner;
        }
        //if draw
        let isDraw = true;

        for(let i = 0;i<3;i++){
            for(let j=0; j<3;j++){
                if(board[i][j] === ""){
                    isDraw = false;
                }
            }
        }  
        if(isDraw){
            return "draw";
        }

        // game still continues
        return null;
    }

    return{
        whoseTurn,
        startGame,
        handleMove,
        isGameOver,
        getWinner
    }
}

)();

function render(){
    const tiles = document.querySelectorAll(".tile");
    tiles.forEach(
        (tile) => {
            
            tile.innerHTML 
            = gameBoard.getPosition(tile.getAttribute("data-row"),tile.getAttribute("data-col"))}
    );

};

const restart = document.querySelector(".restart");
restart.addEventListener("click",render);

