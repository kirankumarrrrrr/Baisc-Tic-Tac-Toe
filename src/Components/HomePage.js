import React, { useState } from 'react';
import "../Components/Homepage.css";

const HomePage = () => {
    const [Gameboard, SetGameboard] = useState({
        board: ['','','','','','','','',''],
        currentplayer : "X"
    });
    const [message,SetMessage] = useState(`Current Player - ${Gameboard.currentplayer}`);

    var checkWinner = () => {
        var combinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for(let i=0; i<combinations.length; i++){
            if(Gameboard.board[combinations[i][0]] === Gameboard.board[combinations[i][1]] &&
                Gameboard.board[combinations[i][1]] === Gameboard.board[combinations[i][2]]){
                return Gameboard.board[combinations[i][0]];
            }
        }
        return null;
    };

    var cellclick = (index,value) => {
        let cubes = Gameboard.board;
        if(checkWinner()){
            SetMessage("Winner is already declared, please reset game");
        }else{
            if(cubes[index]){
                SetMessage("Invalid Move");
                setTimeout(()=>{
                    SetMessage(`Current Player - ${Gameboard.currentplayer}`);
                }, 3000);
            }else{
                cubes[index] = Gameboard.currentplayer;
                SetMessage(`Current Player - ${Gameboard.currentplayer === "X" ? "O" : "X"}`);
                let updatedboard = {
                    board: cubes,
                    currentplayer : Gameboard.currentplayer === "X" ? "O" : "X"
                }
                SetGameboard(updatedboard);
                let winner = checkWinner();
                if(winner){
                    SetMessage(`Congratulation, Winner is ${Gameboard.currentplayer}`);
                }else{
                    if(!cubes.includes('')){SetMessage("It's a tie, Please reset for new game");}
                }
            }
        } 
    };

    var resetBoard = () => {
        let clearboard = {
            board: ['','','','','','','','',''],
            currentplayer : "X"
        };
        SetGameboard(clearboard);
        SetMessage(`Board Reset Complete`);
        setTimeout(()=>{SetMessage(`Current Player - X`)}, 1000);    
    }

  return (
    <div className="app-container">
      <h1>Welcome to Tic Tac Toe Game</h1>
      <div>
        <div className="board">
            {Gameboard.board.map((value,index) => (
                <div key={index} className='cell' onClick={() => cellclick(index,value)}>
                    <span>{value}</span>
                </div>
            ))}
        </div>
      </div>
      <div className='winner-section'>
            <span className={message === "Invalid Move" ? 'error-mess' : 'message'}>{message}</span>
            <button className='resetBtn' onClick={resetBoard}>Reset Game</button>
        </div>
    </div>
  )
}

export default HomePage