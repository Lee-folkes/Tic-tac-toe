//setup player class
//!!!---need to set hover icons---!!!
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
const playerIndicator = document.querySelector('.active-player-icon');
const hoverImageSrc = document.querySelectorAll('.hover-image');

//assets
//solid icons
const xIcon = './assets/icon-x.svg';
const oIcon = './assets/icon-o.svg';
//hover icons
const xIconHover = './assets/icon-x-outline.svg';
const oIconHover = './assets/icon-o-outline.svg';



//define players
const playerOne = new Player('Player One', oIcon, oIconHover, false);
const playerTwo = new Player('Player Two', xIcon, xIconHover, false);

//player score labels
let xScoreLabel;
let oScoreLabel;

//active player
let activePlayer;

//hover image
let hoverImage;

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
    playerIndicator.src = activePlayer.playerIcon;
    console.log(activePlayer.playerIcon);
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
 
    console.log(playerOne);
    console.log(playerTwo);
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


//define active player
function playerActive(){
    if(playerOne.isTurn){
        activePlayer = playerOne;
    }else{
        activePlayer = playerTwo;
    };
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
    if(e.target.classList.contains('hover-image') && !e.target.classList.contains('checked')){
        e.target.classList.add('display-none');
        e.target.classList.add('checked')
        e.target.parentElement.children[1].setAttribute('src', activePlayer.playerIcon);
        
        if(playerOne.isTurn === true){
            playerOne.isTurn = false;
            playerTwo.isTurn = true;
        }else{
            playerTwo.isTurn = false;
            playerOne.isTurn = true;
        }
        playerActive();
        playerIndicator.src = activePlayer.playerIcon;
        setHoverImage();
        
        console.log(playerOne);
        console.log(playerTwo);
    }
    
})

// mainGrid.addEventListener('mouseover', (e) =>{
//         console.log(e.target.children)
//         console.log('hovered');
//         // e.target.children.img.setAttribute('src', activePlayer.hoverIcon);
//         e.target.children[0].src = activePlayer.hoverIcon;

//         mainGrid.addEventListener('mouseout', (e) => {
//             e.target.children[0].src = '';
//         })
        
//     }
// )







