//setup player class

Player = class{
    constructor(playerName, playerIcon, isCpu){
        //player properties
        this.PlayerName = playerName;
        this.score = 0;
        this.playerIcon = playerIcon;
        this.isCpu = isCpu;
        this.wins = 0;
        this.ties = 0;
        this.isTurn = false;
    }
    //methods
    incScore(){
        this.score ++;
        return this;
    }
    incWin(){
        this.wins ++;
        return this;
    }
    incTies(){
        this.ties ++;
        return this;
    }
    toggleTurn(){
        this.isTurn = !this.isTurn;
        return this;
       
    }

}
//get elements
const startIconXimg = document.querySelector('.mark-x img');
const startIconOimg = document.querySelector('.mark-o img');
const startIconX = document.querySelector('.mark-x');
const startIconO = document.querySelector('.mark-o');
const newGameCpuBtn = document.querySelector('.new-game-cpu-button');
const newGamePlayerBtn = document.querySelector('.new-game-player-button');
let playerOneIcon = null;
let playerTwoIcon = null;

//player mark menu toggle states
startIconO.addEventListener('click', e =>{
    if(!e.target.classList.contains('mark-active')){
        startIconO.classList.add('mark-active');
        startIconX.classList.remove('mark-active');
        startIconOimg.classList.add('icon-filter-bg');
        startIconXimg.classList.add('icon-filter-silver');
        startIconXimg.classList.remove('icon-filter-bg');
        //set chosen marker
        playerOneIcon = 'O';
        playerTwoIcon = 'X';

    }
});
startIconX.addEventListener('click', e =>{
    if(!e.target.classList.contains('mark-active')){
        startIconX.classList.add('mark-active');
        startIconO.classList.remove('mark-active');
        startIconX.classList.remove('icon-filter-silver');
        startIconXimg.classList.add('icon-filter-bg');
        startIconOimg.classList.remove('icon-filter-bg');
        startIconOimg.classList.add('icon-filter-silver');
        //set chosen marker
        playerOneIcon = 'X';
        playerTwoIcon = 'O';
    }
});



//setup player objects on button press
newGameCpuBtn.addEventListener ('click', e => {
    const playerOne = new Player('Player One', playerOneIcon, false);
    const playerTwo = new Player('Player Two', playerTwoIcon, true);

    //decide who goes first
    if(playerOne.playerIcon === 'X'){
        playerOne.toggleTurn();
    }else{
        playerTwo.toggleTurn();
    };
    
    console.log(playerOne);
    console.log(playerTwo);
})

newGamePlayerBtn.addEventListener ('click', e => {
    const playerOne = new Player('Player One', playerOneIcon, false);
    const playerTwo = new Player('Player Two', playerTwoIcon, false);

    //decide who goes first
    if(playerOne.playerIcon === 'X'){
        playerOne.toggleTurn();
    }else{
        playerTwo.toggleTurn();
    };
    
    console.log(playerOne);
    console.log(playerTwo);
    
})



// const playerOne = new Player('Player One', 'x', false);
