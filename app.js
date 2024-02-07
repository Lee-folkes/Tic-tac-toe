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
const newGameScr = document.querySelector('.new-game-scr');
const mainGameScr = document.querySelector('.main-game-screen')
const xLabel = document.querySelector('.x-player');
const oLabel = document.querySelector('.o-player');

//assets
const xIcon = './assets/icon-x.svg';
const oIcon = './assets/icon-0.svg'

//define players
const playerOne = new Player('Player One', oIcon, false);
const playerTwo = new Player('Player Two', xIcon, false);

//player score labels
let xScoreLabel;
let oScoreLabel;

//player mark menu toggle states
startIconO.addEventListener('click', e =>{
    if(!e.target.classList.contains('mark-active')){
        startIconO.classList.add('mark-active');
        startIconX.classList.remove('mark-active');
        startIconOimg.classList.add('icon-filter-bg');
        startIconXimg.classList.add('icon-filter-silver');
        startIconXimg.classList.remove('icon-filter-bg');

        //set chosen marker
        //replace with urls to assets
        playerOne.playerIcon = oIcon; 
        playerTwo.playerIcon = xIcon;

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
        //replace with urls to assets
        playerOne.playerIcon = xIcon;
        playerTwo.playerIcon = oIcon;

    }
});

function goesFirst(){
    if(playerOne.playerIcon === xIcon){
        playerOne.toggleTurn();
    }else{
        playerTwo.toggleTurn();
    };
}

function newGameStart(){
     //Hide new game screen
     newGameScr.classList.add('display-none');
     //Show main game screen
     mainGameScr.classList.remove('display-none');
}

//setup player objects on button click
newGameCpuBtn.addEventListener ('click', e => {
    //game is against cpu
    playerTwo.isCpu = true;
    //decide who goes first
    goesFirst();
    //Set player labels
    setPlayerLabel();
    //switch to main game screen
    newGameStart();
 
    console.log(playerOne);
    console.log(playerTwo);
});

newGamePlayerBtn.addEventListener ('click', e => {
    //decide who goes first
    goesFirst();
    //Set player labels
    setPlayerLabel();
    //switch to main game screen
    newGameStart();

    console.log(playerOne);
    console.log(playerTwo);
});


//player labels on score section
function setPlayerLabel(){
    if(playerOne.playerIcon === xIcon && playerTwo.isCpu)
    {
        xScoreLabel = ' (You)';
        oScoreLabel = ' (CPU)';
    }
    else if(playerOne.playerIcon === oIcon && playerTwo.isCpu)
    {
        oScoreLabel = ' (You)';
        xScoreLabel = ' (CPU)';
    } 
    else if(playerOne.playerIcon === xIcon && !playerTwo.isCpu)
    {
        xScoreLabel = ' (P1)';
        oScoreLabel = ' (P2)';
    }
    else
    {  
        oScoreLabel = ' (P1)';
        xScoreLabel = ' (P2)';
    };

    xLabel.textContent = xScoreLabel;
    oLabel.textContent = oScoreLabel;

}

