//setup player class
Player = class{
    constructor(playerName, playerIcon, hoverIcon, isCpu){
        //player properties
        this.PlayerName = playerName;
        this.score = 0;
        this.playerIcon = playerIcon;
        this.hoverIcon = hoverIcon;
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
const mainGrid = document.querySelector('.main-grid');
const xLabel = document.querySelector('.x-player');
const oLabel = document.querySelector('.o-player');
const hoverImageSrc = document.querySelectorAll('.hover-image');
const gridItems = document.querySelectorAll('.main-grid');
const xScoreValue = document.querySelector('.x-score-value');
const oScoreValue = document.querySelector('.o-score-value');
const tiesScoreValue = document.querySelector('.ties-score-value');
const activeMarker = document.querySelector('.active-player-icon');
const resetButton = document.querySelector('.reset-button');
const gameTiles = document.querySelectorAll('.tile');
const popover = document.querySelector('.popover');
const popoverQuit = document.querySelector('.quit');
const popoverNext = document.querySelector('.next-round');
const popoverMsgTop = document.querySelector('.message-top-text');
const popoverMiddleImg = document.querySelector('.middle-icon');
const popoverMsgMiddle = document.querySelector('.message-middle-text');
let turnCount = 0;
let ties = 0;
let isWinner = false;


//assets
//solid icons
const xIcon = './assets/icon-x.svg';
const oIcon = './assets/icon-o.svg';
let setMarker = oIcon;
//hover icons
const xIconHover = './assets/icon-x-outline.svg';
const oIconHover = './assets/icon-o-outline.svg';



//define players
const playerOne = new Player('PlayerOne', oIcon, oIconHover, false);
const playerTwo = new Player('PlayerTwo', xIcon, xIconHover, false);

//player score labels
let xScoreLabel;
let oScoreLabel;

//active player
let activePlayer;


//hover image
let hoverImage;

//tiles
const tile1 = document.querySelector('.tile1');
const tile2 = document.querySelector('.tile2');
const tile3 = document.querySelector('.tile3');
const tile4 = document.querySelector('.tile4');
const tile5 = document.querySelector('.tile5');
const tile6 = document.querySelector('.tile6');
const tile7 = document.querySelector('.tile7');
const tile8 = document.querySelector('.tile8');
const tile9 = document.querySelector('.tile9');

let tileArray = [tile1.classList[0], tile2.classList[0], tile3.classList[0], tile4.classList[0], tile5.classList[0], tile6.classList[0], tile7.classList[0], tile8.classList[0], tile9.classList[0]]
let board = [tile1, tile2, tile3, tile4, tile5, tile6, tile7, tile8, tile9]

//generate random number for cpu turn
function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
  }


  let targetIndex;
  
  //AI logic
  function setTargetIndex() {
    let corners = [tile1, tile3, tile7, tile9];
    let cornerToTry = corners[getRandomInt(0,corners.length)];
    //choose center square if free
    if (tileArray.indexOf("tile5") !== -1) {targetIndex = tileArray.indexOf("tile5"); console.log('center chosen')}
    //prefer corners every turn
    else if (tileArray.indexOf(cornerToTry.classList[0]) !== -1) {targetIndex = tileArray.indexOf(cornerToTry.classList[0]); console.log('1: ', cornerToTry.classList[0])}
    else if (tileArray.indexOf(cornerToTry.classList[0]) !== -1) {targetIndex = tileArray.indexOf(cornerToTry.classList[0]); console.log('2: ', cornerToTry.classList[0])}
    else if (tileArray.indexOf(cornerToTry.classList[0]) !== -1) {targetIndex = tileArray.indexOf(cornerToTry.classList[0]); console.log('3: ', cornerToTry.classList[0])}
    else if (tileArray.indexOf(cornerToTry.classList[0]) !== -1) {targetIndex = tileArray.indexOf(cornerToTry.classList[0]); console.log('4: ', cornerToTry.classList[0])}
    else if (tileArray.indexOf(cornerToTry.classList[0]) !== -1) {targetIndex = tileArray.indexOf(cornerToTry.classList[0]); console.log('5: ', cornerToTry.classList[0])}
    //if no corners then choose random free tile
    else{targetIndex = getRandomInt(0, tileArray.length);}
  }


//player mark menu toggle states
startIconO.addEventListener('click', e =>{
    if(!e.target.classList.contains('mark-active')){
        startIconO.classList.add('mark-active');
        startIconX.classList.remove('mark-active');
        startIconOimg.classList.add('icon-filter-bg');
        startIconXimg.classList.add('icon-filter-silver');
        startIconXimg.classList.remove('icon-filter-bg');

        //set chosen marker
        playerOne.playerIcon = oIcon; 
        playerTwo.playerIcon = xIcon;
        playerOne.hoverIcon = oIconHover;
        playerTwo.hoverIcon = xIconHover;

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
        playerOne.playerIcon = xIcon;
        playerTwo.playerIcon = oIcon;
        playerOne.hoverIcon = xIconHover;
        playerTwo.hoverIcon = oIconHover;

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
     //set turn icon in top section
    activeMarker.src = setMarker;
}

//setup player objects on button click
newGameCpuBtn.addEventListener ('click', e => {
    //game is against cpu
    playerTwo.isCpu = true;
    //decide who goes first
    goesFirst();
    //set active player
    playerActive();
    //Set player labels
    setPlayerLabel();
    //switch to main game screen
    newGameStart();
    //set hover image
    setHoverImage();
    //if cpu goes first
    if(playerTwo.playerIcon === xIcon){
        setTimeout(() => {
            setTargetIndex();
            cpuTurn(targetIndex);
            playerActive();
           
        },300);}
    
        });

newGamePlayerBtn.addEventListener ('click', e => {
    //decide who goes first
    goesFirst();
    //set active player
    playerActive();
    //Set player labels
    setPlayerLabel();
    //switch to main game screen
    newGameStart();
    //set hover image
    setHoverImage();
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

//to execute on matching a win condition
function winActions(){
    //increase score
    activePlayer.incScore();
    //set winner var
    isWinner = true;
     //output score
     if(activePlayer.playerIcon === xIcon){
        xScoreValue.textContent = activePlayer.score;
    }else{
        oScoreValue.textContent = activePlayer.score;
    };
    
    //set popover img
    popoverMiddleImg.src = activePlayer.playerIcon;

    //check if game is vs player or cpu and format popover accordingly
    //if vs cpu
    if(playerTwo.isCpu){
        //top message
      if (activePlayer.PlayerName === "PlayerOne") {
        popoverMsgTop.textContent = "YOU WON!";
      } else if (activePlayer.PlayerName === "PlayerTwo") {
        popoverMsgTop.textContent = "OH NO, YOU LOST...";
      } else {
        popoverMsgTop.textContent = "";
      }

      //styles on middle text
      popoverMsgMiddle.textContent = "TAKES THE ROUND";
      if (activePlayer.playerIcon === xIcon) {
        popoverMsgMiddle.style.setProperty("color", "var(--colour-accent-700)");
      } else if (activePlayer.playerIcon === oIcon) {
        popoverMsgMiddle.style.setProperty("color", "var(--colour-accent-600)");
      } else {
        popoverMsgMiddle.style.setProperty(
          "color",
          "var(--colour-neutral-500)"
        );
      }
    }
    //if vs player
    else{
      //top message
      if (activePlayer.PlayerName === "PlayerOne") {
        popoverMsgTop.textContent = "PLAYER 1 WINS!";
      } else if (activePlayer.PlayerName === "PlayerTwo") {
        popoverMsgTop.textContent = "PLAYER 2 WINS!";
      } else {
        popoverMsgTop.textContent = "";
      }

      //styles on middle text
      popoverMsgMiddle.textContent = "TAKES THE ROUND";
      if (activePlayer.playerIcon === xIcon) {
        popoverMsgMiddle.style.setProperty("color", "var(--colour-accent-700)");
      } else if (activePlayer.playerIcon === oIcon) {
        popoverMsgMiddle.style.setProperty("color", "var(--colour-accent-600)");
      } else {
        popoverMsgMiddle.style.setProperty(
          "color",
          "var(--colour-neutral-500)"
        );
      }
    }
    //show win popover
    setTimeout(() => {
        popover.classList.remove('display-none');
    },500);
}

//function to highlight cells on matching win condition

function highlightCells(a, b, c){
    if(activePlayer.playerIcon === xIcon){
        a.classList.add('x-tile-win');
        b.classList.add('x-tile-win');
        c.classList.add('x-tile-win');
        a.children[1].classList.add('icon-filter-bg');
        b.children[1].classList.add('icon-filter-bg');
        c.children[1].classList.add('icon-filter-bg');
    }
    else if(activePlayer.playerIcon === oIcon){
        a.classList.add('o-tile-win');
        b.classList.add('o-tile-win');
        c.classList.add('o-tile-win');
        a.children[1].classList.add('icon-filter-bg');
        b.children[1].classList.add('icon-filter-bg');
        c.children[1].classList.add('icon-filter-bg');
    }
}

function checkWin(){
    //inc turn count
    turnCount++;
    //check for winning combo
    if(!isWinner){
        if (
          tile1.classList.contains(activePlayer.PlayerName) &&
          tile2.classList.contains(activePlayer.PlayerName) &&
          tile3.classList.contains(activePlayer.PlayerName)
        ) {
          highlightCells(tile1, tile2, tile3);
          winActions();
        } else if (
          tile4.classList.contains(activePlayer.PlayerName) &&
          tile5.classList.contains(activePlayer.PlayerName) &&
          tile6.classList.contains(activePlayer.PlayerName)
        ) {
          highlightCells(tile4, tile5, tile6);
          winActions();
        } else if (
          tile7.classList.contains(activePlayer.PlayerName) &&
          tile8.classList.contains(activePlayer.PlayerName) &&
          tile9.classList.contains(activePlayer.PlayerName)
        ) {
          highlightCells(tile7, tile8, tile9);
          winActions();
        } else if (
          tile1.classList.contains(activePlayer.PlayerName) &&
          tile4.classList.contains(activePlayer.PlayerName) &&
          tile7.classList.contains(activePlayer.PlayerName)
        ) {
          highlightCells(tile1, tile4, tile7);
          winActions();
        } else if (
          tile2.classList.contains(activePlayer.PlayerName) &&
          tile5.classList.contains(activePlayer.PlayerName) &&
          tile8.classList.contains(activePlayer.PlayerName)
        ) {
          highlightCells(tile2, tile5, tile8);
          winActions();
        } else if (
          tile3.classList.contains(activePlayer.PlayerName) &&
          tile6.classList.contains(activePlayer.PlayerName) &&
          tile9.classList.contains(activePlayer.PlayerName)
        ) {
          highlightCells(tile3, tile6, tile9);
          winActions();
        } else if (
          tile1.classList.contains(activePlayer.PlayerName) &&
          tile5.classList.contains(activePlayer.PlayerName) &&
          tile9.classList.contains(activePlayer.PlayerName)
        ) {
          highlightCells(tile1, tile5, tile9);
          winActions();
        } else if (
          tile3.classList.contains(activePlayer.PlayerName) &&
          tile5.classList.contains(activePlayer.PlayerName) &&
          tile7.classList.contains(activePlayer.PlayerName)
        ) {
          highlightCells(tile3, tile5, tile7);
          winActions();
        } else if (turnCount === 9) {
          ties++;
          tiesScoreValue.textContent = ties;
          popoverMsgTop.textContent = "";
          popoverMsgMiddle.textContent = "ROUND TIED";
          popoverMsgMiddle.style.setProperty(
            "color",
            "var(--colour-neutral-500)"
          );
          popoverMiddleImg.src = "";

          //show tie message
          setTimeout(() => {
            popover.classList.remove("display-none");
          }, 500);
        }
};
    };
    
//define active player
function playerActive(){
    if(playerOne.isTurn){
        activePlayer = playerOne;
    }else{
        activePlayer = playerTwo;
    };
    if(setMarker === xIcon){
        setMarker = oIcon;
    }else{
        setMarker = xIcon;
    }
    activeMarker.src = setMarker;
}

//set hover image
function setHoverImage(){
    hoverImageSrc.forEach(el => {
        //if tile isn't in use
        if(!el.classList.contains('checked')){
            el.src = activePlayer.hoverIcon;
        };
    })
}

//add marks to tiles on click
mainGrid.addEventListener('click', e =>{

    function placeCheck(){
        e.target.classList.add('display-none', 'checked');
        e.target.parentElement.classList.add(activePlayer.PlayerName);
        e.target.parentElement.children[1].setAttribute('src', activePlayer.playerIcon);
        
        playerOne.toggleTurn();
        playerTwo.toggleTurn();

        //update tile array
        const thisTile = e.target.parentElement.classList[0];
        const thisTileI = tileArray.indexOf(thisTile);
        tileArray.splice(thisTileI,1);
    }


    if(playerOne.isCpu === false && playerTwo.isCpu === false){
        if(e.target.classList.contains('hover-image') && !e.target.classList.contains('checked')){
        placeCheck();
        checkWin();
        playerActive();
        setHoverImage();
    }}
    else{
        if(e.target.classList.contains('hover-image') && !e.target.classList.contains('checked')){
            placeCheck();
            checkWin();
            playerActive();
            setHoverImage();

            if(!isWinner){
                setTargetIndex();
                cpuTurn(targetIndex);
               
            };
        }
    }
    
    
})

//cpu actions

function cpuTurn(target){
    //set vars
    const RandTile = tileArray[target];
    const tileEl = document.getElementsByClassName(RandTile);
    const currentTile = tileEl[0].classList[0];
    const currentTileI = tileArray.indexOf(currentTile);

    tileEl[0].children[0].classList.add('display-none', 'checked');
    tileArray.splice(currentTileI,1);

    if(playerOne.isTurn === true){
        tileEl[0].classList.add(playerOne.PlayerName);
        setTimeout(() =>{
            tileEl[0].children[1].src = playerOne.playerIcon;
        },300);
    }else{
        tileEl[0].classList.add(playerTwo.PlayerName);
        setTimeout(() =>{
            tileEl[0].children[1].src = playerTwo.playerIcon;
        },300);
    }
    checkWin();
    playerOne.toggleTurn();
    playerTwo.toggleTurn();
    playerActive();
    setHoverImage();


}

function resetGame(){
    gameTiles.forEach( el => {
        if(el.classList.contains('PlayerOne'))
        {
            el.classList.remove('PlayerOne');
        };
        if (el.classList.contains('PlayerTwo'))
        {
            el.classList.remove('PlayerTwo');
        };
        if(el.children[0].classList.contains('checked'))
        {
            el.children[0].classList.remove('checked');
        };
        if(el.children[0].classList.contains('display-none'))
        {
            el.children[0].classList.remove('display-none');
        };
        if(el.classList.contains('x-tile-win'))
        {
            el.classList.remove('x-tile-win');
            el.children[1].classList.remove('icon-filter-bg');
        };
        if(el.classList.contains('o-tile-win'))
        {
            el.classList.remove('o-tile-win');
            el.children[1].classList.remove('icon-filter-bg');
        };
        
        el.children[1].src = '';
    })
    playerOne.isTurn = false;
    playerTwo.isTurn = false;
    goesFirst();
    playerActive();
    setPlayerLabel();
    setHoverImage();
    tileArray = [tile1.classList[0], tile2.classList[0], tile3.classList[0], tile4.classList[0], tile5.classList[0], tile6.classList[0], tile7.classList[0], tile8.classList[0], tile9.classList[0]];
    turnCount = 0;
    isWinner = false;
}

//reset game board on reset button click
resetButton.addEventListener('click', e => {
    resetGame();
    if(playerTwo.isCpu === true && playerTwo.playerIcon === xIcon){
        setTimeout(() => {
            setTargetIndex();
            cpuTurn(targetIndex);
            playerActive();
        },300)
    }
})

//popover buttons
popoverNext.addEventListener('click', e => {
    resetGame();
    popover.classList.add('display-none');
    if(playerTwo.isCpu === true && playerTwo.playerIcon === xIcon){
        setTimeout(() => {
            setTargetIndex();
            cpuTurn(targetIndex);
            playerActive();
        },300)
    }
})

popoverQuit.addEventListener('click', e => {
    location.reload();
})


