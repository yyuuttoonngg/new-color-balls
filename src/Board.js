import React from 'react';
import Square from './Square';
import {Link} from "react-router-dom";

export default class Board extends React.Component {
  constructor(props) {
    let array =Array(100).fill('');
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.newBall = this.newBall.bind(this);
    for(let i = 0; i < 3; i ++){
      this.newBall(array);
    }
    let highestScore = localStorage.getItem('highestScore')?localStorage.getItem('highestScore'):0;
    if(localStorage.getItem('data')){
      this.state = JSON.parse(localStorage.getItem('data')); 
    } else{
      this.state = {
        squares: array,
        clicked:[],
        color:null,
        score:0,
        gameOver:false,
        highestScore:highestScore,
      };
    }
    console.log(highestScore)
    console.log(JSON.parse(localStorage.getItem('data')))
  }

  newBall(squares) {
    const colors = ['red','yellow','SeaGreen','SteelBlue','Sandybrown','MediumOrchid','snow'];
    let ranNumber = Math.floor(Math.random() * 100);
    let ranColor = Math.floor(Math.random() * 7);
    if(squares[ranNumber]===''){
      squares[ranNumber] = colors[ranColor];
    } else {
      return this.newBall(squares);
    }
  }

  checkWin(n,squares){
    let arr1 = this.checkX(n,squares);
    let arr2 = this.checkY(n,squares);
    let arr3 = this.checkDiagonal(n,squares);
    let arr4 = this.checkOtherDiagonal(n,squares);
    let arries = [arr1,arr2,arr3,arr4];
    let score = 0;
    let lengthsArr =[arr1.length,arr2.length,arr3.length,arr4.length];
    let i = lengthsArr.indexOf(Math.max(...lengthsArr));
    let longest = arries[i];
    const points =[10,12,18,28,42,60]
    if(longest.length>4){
      longest.forEach((n)=>{
        squares[n]='';      
      })
      score = points[longest.length-5];
    }
    // console.log(longest)
    // console.log(score)
    return score;
  }
  checkOtherDiagonal(n,squares){
    let arr =[];
    let maxNumber = 0 ;
    let init;
    let returnArr = [];
    let x = Math.floor(n/10);
    let y = n%10;
    let small = x>y? x:y;
    let big = 10-x > 10-y? 10-x:10-y;
  
    for(let i =0;i<=small;i++){
      if (squares[n-i*9] !==squares[n]){
        arr.unshift(n-i*9)
      }    
    }
    for(let j=0; j<big;j++){
      if (squares[n+j*9] !==squares[n]){
        arr.push(n+j*9)
      }   
    }
    let smallestOutRange = n- small*9 -9;
    let biggestOutRange=n+big*9;
  
      for(let k=1; k<arr.length;k++){
        if((arr[k]-arr[k-1])/9 > maxNumber){
          maxNumber = (arr[k]-arr[k-1])/9;
          init = arr[k-1]+9;
        } 
      }
      if ((biggestOutRange -arr[arr.length-1])/9 > maxNumber){
        maxNumber =(biggestOutRange -arr[arr.length-1])/9 ;
        init = arr[arr.length-1]+9
      }
      if ((arr[0]-smallestOutRange)/9>maxNumber){
        maxNumber = (arr[0]-smallestOutRange)/9
        init =smallestOutRange+9
      }
      for(let m =0; m<maxNumber-1; m ++){
        returnArr.push(init+m*9);
      }

    if (maxNumber===0){
      for(let l =smallestOutRange+9;l<biggestOutRange;l+=9){
        returnArr.push(l)
      }
    }
    return returnArr;
  }

  checkDiagonal(n,squares){
    let arr =[];
    let maxNumber = 0 ;
    let init;
    let returnArr = [];
    let x = Math.floor(n/10);
    let y = n%10;
    let small = x<y? x:y;
    let big = 10-x < 10-y? 10-x:10-y;
  
    for(let i =0;i<=small;i++){
      if (squares[n-i*11] !==squares[n]){
        arr.unshift(n-i*11)
      }    
    }
    for(let j=0; j<big;j++){
      if (squares[n+j*11] !==squares[n]){
        arr.push(n+j*11)
      }   
    }
    let smallestOutRange = n- small*11 -11;
    let biggestOutRange=n+big*11;
  
      for(let k=1; k<arr.length;k++){
        if((arr[k]-arr[k-1])/11 > maxNumber){
          maxNumber = (arr[k]-arr[k-1])/11;
          init = arr[k-1]+11;
        }
  
      }
      if ((biggestOutRange -arr[arr.length-1])/11 > maxNumber){
        maxNumber =(biggestOutRange -arr[arr.length-1])/11 ;
        init = arr[arr.length-1]+11
      }
      if ((arr[0]-smallestOutRange)/11>maxNumber){
        maxNumber = (arr[0]-smallestOutRange)/11
        init =smallestOutRange+11
      }
      for(let m =0; m<maxNumber-1; m ++){
        returnArr.push(init+m*11);
      }

    if (maxNumber===0){
      for(let l =smallestOutRange+11;l<biggestOutRange;l+=11){
        returnArr.push(l)
      }
    }
    return returnArr;
  }

  checkY(n,squares){
    let columnNumber = n%10;
    let arr =[];
    let maxNumber = 0 ;
    let init;
    let returnArr = [];
    for(let i  = columnNumber; i<100; i +=10 ){
      if(squares[i]!==squares[n]){
        arr.push(i);
      }      
    }
    for(let j=1; j<arr.length;j++){
      if((arr[j]-arr[j-1])/10<11&& (arr[j]-arr[j-1])/10>maxNumber){
        maxNumber = (arr[j]-arr[j-1])/10;
        init = arr[j-1]+10;
      }
    }
    if ((100+columnNumber -arr[arr.length-1])/10 > maxNumber){
      maxNumber = (100+columnNumber -arr[arr.length-1])/10;
      init = arr[arr.length-1]+10;
    }
    if ((arr[0]-columnNumber+10)/10>maxNumber){
      maxNumber = (arr[0]-columnNumber)/10+1
      init =columnNumber
    }
    for(let m =0; m<maxNumber-1; m ++){
      returnArr.push(init+m*10);
    }
    if(maxNumber===0){
      returnArr =[columnNumber,columnNumber+10,columnNumber+20,columnNumber+30,columnNumber+40,columnNumber+50,columnNumber+60,columnNumber+70,columnNumber+80,columnNumber+90]
    }
    return returnArr;
  }

  checkX(n,squares){
    let lineNumber = Math.floor(n/10);
    let arr = [];
    let maxNumber = 0;
    let init;
    let returnArr =[]
    for(let i  = 10*lineNumber; i<10*lineNumber+10; i++){
      if(squares[i]!==squares[n]){
        arr.push(i);
      }      
    }
    for(let j=1; j<arr.length;j++){
      if(arr[j]-arr[j-1]<11&& arr[j]-arr[j-1]>maxNumber){
        maxNumber = arr[j]-arr[j-1];
        init = arr[j-1]+1;
      }
    }
    if (10*lineNumber+10 -arr[arr.length-1]>maxNumber && 10*lineNumber+10 >arr[arr.length-1]){
      maxNumber = 10*lineNumber+10 -arr[arr.length-1];
      init = arr[arr.length-1]+1
    }
    if (arr[0]-10*lineNumber+1>maxNumber && arr[0]>10*lineNumber){
      maxNumber = arr[0]-10*lineNumber+1
      init =10*lineNumber 
    }
    for(let m =0; m<maxNumber-1;m++){
      returnArr.push(init+m);
    }
    if(maxNumber===0){
      returnArr =[10*lineNumber,10*lineNumber+1,10*lineNumber+2,10*lineNumber+3,10*lineNumber+4,10*lineNumber+5,10*lineNumber+6,10*lineNumber+7,10*lineNumber+8,10*lineNumber+9]
    }
    return returnArr
  }

  canMove(arr1,str2,squares){
    let possibleMoves = arr1;
    let moves = possibleMoves.length; 
    possibleMoves.forEach((n)=>{
      if(this.inRange(n-1) && squares[n-1]==='' && n%10 !==0 && !possibleMoves.includes(n-1)){
        possibleMoves.push(n-1);
      }
      if(this.inRange(n+1) && squares[n+1]==='' && n%10 !==9 && !possibleMoves.includes(n+1)){
        possibleMoves.push(n+1);
      }
      if(this.inRange(n+10) && squares[n+10]==='' && !possibleMoves.includes(n+10)){
        possibleMoves.push(n+10);
      }
      if(this.inRange(n-10) && squares[n-10]===''&& !possibleMoves.includes(n-10)){ 
        possibleMoves.push(n-10);
      }
    })
    if(possibleMoves.includes(Number(str2))){
      return true;
    } else if (possibleMoves.length ===moves){
      return false;
    } else {
      return this.canMove(possibleMoves,str2,squares);
    }
  }

  inRange(n){
    return( n>=0 && n<100 );
  }

  newRound(squares){
    const emptyCount = squares.filter(square=>square ==='').length;
    if (emptyCount<=3){
      for(let i = 0;i<emptyCount;i++){
        this.newBall(squares);
      }
      this.gameOver();
    } else {
      for(let i = 0;i<3;i++){
        this.newBall(squares);
      }
    }
  }
  gameOver(){
    this.setState({
      gameOver:true,
    });
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    const clicked = this.state.clicked.slice();
    let highestScore = this.state.highestScore;
    let color = this.state.color;
    let score = this.state.score;
   
    if(clicked.length ===0 && squares[Number(i)]!==''){
      clicked.push(i);
      color = squares[Number(i)];

    } else if (clicked.length ===1 && i === clicked[0]){
      clicked.pop();
      color ='';
    } else if (clicked.length ===1 && i !== clicked[0] &&squares[Number(i)]!==''){
      clicked.pop();
      color ='';
    } else if(clicked.length ===1 && i !== clicked[0] &&squares[Number(i)]===''){
      let arr = [Number(clicked[0])];
      if(this.canMove(arr,i,squares)){
        squares[Number(i)] = color;
        squares[Number(clicked[0])] =''
        clicked.pop();  
        let scoreChange = this.checkWin(Number(i),squares);
        if(scoreChange>0){
          score += scoreChange;
          highestScore = highestScore>score? highestScore:score
          localStorage.setItem('highestScore', highestScore);
        } else {
          this.newRound(squares);
        }
      } else{
        while(clicked.length>0){
          clicked.pop();
        }
      }
    }

    let data = {
      squares: squares,
      clicked:clicked,
      color:color,
      score:score,
      highestScore:highestScore,
    }
    localStorage.setItem('data', JSON.stringify(data));
    this.setState(data);
  }

  restartGame(){
    let squares = this.state.squares.slice();
    squares = Array(100).fill('');
    this.newRound(squares);
    let highestScore = localStorage.getItem('highestScore')?localStorage.getItem('highestScore'):0;
    let data = {
      squares:squares,
      clicked:[],
      color:null,
      score:0,
      gameOver:false,
      highestScore: highestScore
    }
    localStorage.setItem('data', JSON.stringify(data));
    this.setState(data)    

  }


  render() {
    const rows =[];
    const gameOver= this.state.gameOver;
    const clicked = this.state.clicked[0];
    for (let i=0; i <10; i ++){
      for(let j=0; j<10; j ++){
        rows.push(<Square key ={`${i}${j}`} value={this.state.squares[Number(`${i}${j}`)]} onClick={() => this.handleClick(`${i}${j}`)} ballColor={
        (clicked===`${i}${j}` ? "selected ball" : "ball")}/>)
      }
      rows.push(<div className="board-row" key={`row${i}`}></div>);
    }

    return (
      <div className="board">
        <div className="header">
          <div className="restart" id="rules">
          <Link to="/rules">Show me the rules !</Link>
          </div>
          <div className ="restart" onClick={() => this.restartGame()}>Restart</div>
        </div>
        <div className="title">
          {gameOver? 'Game Over':'COLOR - 5 -  O'}
            </div>
        <div>
          {rows}
        </div>
        <div className="record">
          <span className="left">Your score: {this.state.score}</span> 
          <span className="right">Record: {this.state.highestScore}</span>
        </div>
      </div>      
    );
  }
}
