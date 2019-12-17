
var score,current,playerSelect,sixScore,gameRunning,maxScore,change1,change2;
gameRest();
function gameRest(){
    gameRunning = true;
    score = [0,0] 
    current = 0;
    playerSelect = Math.floor(Math.random()*2);
   
    maxScore = 100;
    for(var i = 0 ; i < 2; i++){
        document.querySelector('#score-'+i).textContent = '0';
        document.querySelector('#current-'+i).textContent = '0';
        document.querySelector('#name-'+i).textContent = 'PLAYER '+(i+1);
        document.querySelector('.player-'+i+'-panel').classList.remove('winner');
        document.querySelector('.player-'+i+'-panel').classList.remove('active');
        document.querySelector('.player-'+i+'-panel').classList.remove('active');
        document.querySelector('.dice-'+i).style.display = 'none';

    }
    
}
function diceRandomizer(){
    change1 = Math.floor(Math.random()*6+1);
    var roll1= document.querySelector('.dice-0');
    roll1.style.display = 'block'
    roll1.src = 'dice-'+change1+'.png';

    change2 = Math.floor(Math.random()*6+1);
    var roll2= document.querySelector('.dice-1');
    roll2.style.display = 'block'
    roll2.src = 'dice-'+change2+'.png';

}

document.querySelector('.btn-roll').addEventListener('click',function(){
    if(gameRunning){
        
        diceRandomizer()
        console.log(change1+" "+change2+" "+current)
         

        if(change1==change2){
            change1 =0 
            change2 = 0;
            current = 0 ; 
            document.querySelector('#current-'+playerSelect).textContent = current;
        }
        

        else if(change1 != 1 && change2 != 1 ){    
            current += change1+change2;
            document.querySelector('#current-'+playerSelect).textContent = current;
        }else {
            current = 0;
            change1 = 0 ;
            change2  =0;
            document.querySelector('#current-'+playerSelect).textContent = '0';
            changePlayer();
        }   
    }
});
function changePlayer(){
    
    document.querySelector('.player-'+playerSelect+'-panel').classList.add('active')
    playerSelect ==0 ? playerSelect = 1:playerSelect=0;
    
    document.querySelector('.player-'+playerSelect+'-panel').classList.remove('active')
}
document.querySelector('.btn-hold').addEventListener('click',function(){
    
    if(gameRunning){
        
        score[playerSelect] = score[playerSelect]+current;
        current = 0;
        document.querySelector('#current-'+playerSelect).textContent = 0;
        document.querySelector('#score-'+playerSelect).textContent = score[playerSelect];
        gameWin();  
        changePlayer();
        document.querySelector('.dice-0').style.display = 'none';
        document.querySelector('.dice-1').style.display = 'none';
    }
    
})
function gameWin(){

    if(score[playerSelect]>=maxScore ){
        document.querySelector('#name-'+playerSelect).classList.add('.winner');
        document.querySelector('#name-'+playerSelect).style.color = 'red';
        document.querySelector('#name-'+playerSelect).textContent = 'WINNER!';
        playerSelect ==0 ? playerSelect = 1:playerSelect=0;
        document.querySelector('#name-'+playerSelect).textContent = 'LOSER!';
        gameRunning = false;
    }
}
document.querySelector('.btn-new').addEventListener('click',function(){
    gameRest();
})
   

    document.getElementById('Number_max_Value').addEventListener('input',function(){
        
    if (score[0]+score[1]+current==0){
        maxScore =  parseInt(document.getElementById('Number_max_Value').value.replace(/[a-zA-Z!@#$%^&*()_=+-]/g,""));
    }
    console.log(maxScore)

})
const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

openModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = document.querySelector(button.dataset.modalTarget)
    openModal(modal)
  })
})

overlay.addEventListener('click', () => {
  const modals = document.querySelectorAll('.modal.active')
  modals.forEach(modal => {
    closeModal(modal)
  })
})

closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal')
    closeModal(modal)
  })
})

function openModal(modal) {
  if (modal == null) return
  modal.classList.add('active')
  overlay.classList.add('active')
}

function closeModal(modal) {
  if (modal == null) return
  modal.classList.remove('active')
  overlay.classList.remove('active')
}