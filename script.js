const canvasWidth = 500;
const canvasHeight = 500;
const centreX = canvasWidth / 2;
const centreY = canvasHeight / 2;
var direction = 'up';
const btn = document.querySelector(".btn");


let world = [
  ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
  ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
  ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
  ['empty', 'empty', 'empty', 'snake', 'empty', 'empty', 'empty'],
  ['empty', 'empty', 'empty', 'snake', 'empty', 'empty', 'empty'],
  ['empty', 'empty', 'empty', 'snake', 'empty', 'empty', 'empty'],
  ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
  
];

var canvas = document.getElementById("mycanvas1");
var ctx = canvas.getContext('2d');

window.onload = function () {
  boutonJouer = document.getElementById('jouer');
  boutonJouer.addEventListener('click', function(evt){
    console.log("appuie");
    init();
    btn.classList.toggle("btn-change");
  });
};



function init(){
  var intervarlID = setInterval(step,250);
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  canvas.style.border = "30px solid gray";
  canvas.style.margin = "50px auto";
  canvas.style.display = "block";
  canvas.style.backgroundColor = "gray";
  randomspawn(world.length);
  drawTab();
  
}

function vide(y,x) { 
  ctx.strokeStyle = "black"; //pour les lignes
  ctx.fillStyle = "#00FF00"; // pour les remplissages
  ctx.fillRect(x*(canvasWidth/world.length) , y*(canvasHeight/world.length), canvasWidth/world.length, canvasHeight/world.length);
  ctx.strokeRect(x*(canvasWidth/world.length) , y*(canvasHeight/world.length), canvasWidth/world.length, canvasHeight/world.length)
}

function serpan(y,x) { 
  ctx.strokeStyle = "black"; //pour les lignes
  ctx.fillStyle = "blue"; // pour les remplissages
  ctx.fillRect(x*(canvasWidth/world.length) , y*(canvasHeight/world.length), canvasWidth/world.length, canvasHeight/world.length);
  ctx.strokeRect(x*(canvasWidth/world.length) , y*(canvasHeight/world.length), canvasWidth/world.length, canvasHeight/world.length)
}

function apple(y,x) { 
  ctx.strokeStyle = "black"; //pour les lignes
  ctx.fillStyle = "red"; // pour les remplissages
  ctx.fillRect(x*(canvasWidth/world.length) , y*(canvasHeight/world.length), canvasWidth/world.length, canvasHeight/world.length);
  ctx.strokeRect(x*(canvasWidth/world.length) , y*(canvasHeight/world.length), canvasWidth/world.length, canvasHeight/world.length)
}


function randomspawn(max){
  var i = Math.floor(Math.random() * max);
  var j = Math.floor(Math.random() * max);

  if(world[i][j] === 'snake'){
    randomspawn(world.length);
  }else{
    world[i][j] = 'apple';
  } 
}




function drawTab(){
  
  //randomspawn(world.length);
  
  console.log(world.length);
  for (var i = 0; i<world.length; i++){
    for (var j = 0; j<world.length; j++){
      if (world[i][j] === 'empty'){
        //console.log("c'est vide ptn");
        vide(i,j);
      } else if (world[i][j] === 'snake'){
        serpan(i,j);
        //console.log("c'est un ptn de serpan");        
      } else if (world[i][j] === 'apple'){
        apple(i,j);
        //console.log("c'est une ptn de pomme");
      }
    }
  }
//console.log(world);
}

console.log(getserpan());
function getserpan(){

  let snake = [];
  
  for (var j = 0; j<world.length; j++){
    for (var i = 0; i<world.length; i++){
      if (world[i][j] == 'snake'){
        snake.push([i,j]);
      }
    }
  }
  return snake;
}

console.log(getTab());
function getTab(){
  let Tab = [];

  for (var j = 0; j<world.length; j++){
    for (var i = 0; i<world.length; i++){
        Tab.push([i,j]);      
    }
  }
  return Tab;

}

console.log("POMME:  " + getapple());
function getapple(){
  let appleTab = [];
  for (var j = 0; j<world.length; j++){
    for (var i = 0; i<world.length; i++){
      if (world[i][j] == 'apple'){
       appleTab = [i,j];
      }
    }
  }
  return appleTab;
}



let snake = [[5,3],[4,3],[3,3]];
 

function gameOver(){
  ctx.save();
  ctx.font = "bold 70px sans-serif";
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.lineWidth = "5";
  ctx.fillText("Game Over", centreX, centreY - 180);
  ctx.restore();
  
}





  function step(){
    
    window.addEventListener("keydown",function(event){
      console.log(world[snake[snake.length-1][0]][snake[snake.length-1][1]+1]);
      if (event.key === 'ArrowDown'){
       if(direction === 'up'){
        direction = direction;
       }else{
        direction = 'down';
       }
       
        }else  if (event.key === 'ArrowLeft'){
    
          if(direction === 'right'){
            direction = direction;
           }else{
            direction = 'left';
           }
     
        }else if (event.key === 'ArrowRight'){
    
          if(direction === 'left'){
            direction = direction;
           }else{
            direction = 'right';
           }
          
        }else if (event.key === 'ArrowUp'){
    
          if(direction === 'down'){
            direction = direction;
           }else{
            direction = 'up';
           }
        }
      });

    switch(direction){
      case 'up':
        if ( snake[snake.length-1][0]-1 < 0|| world[snake[snake.length-1][0]-1][snake[snake.length-1][1]] === 'snake'){
          gameOver();
        }else {

          if(world[snake[snake.length-1][0]-1][snake[snake.length-1][1]] === 'apple'){
            snake.push([snake[snake.length-1][0]-1,snake[snake.length-1][1]]);
            world[snake[snake.length-1][0]][snake[snake.length-1][1]] = 'snake';
            randomspawn(world.length);
            drawTab();

          }else{

            var cut = snake.shift();
            world[cut[0]][cut[1]] = 'empty';
            snake.push([snake[snake.length-1][0]-1,snake[snake.length-1][1]]);
            world[snake[snake.length-1][0]][snake[snake.length-1][1]] = 'snake';
            drawTab();

          }}
          break;


      case 'down':
        if ( snake[snake.length-1][0]+1 === world.length || world[snake[snake.length-1][0]+1][snake[snake.length-1][1] ] === 'snake'){
            gameOver();
        }else{

          if(world[snake[snake.length-1][0]+1][snake[snake.length-1][1] ] === 'apple'){
            snake.push([snake[snake.length-1][0]+1,snake[snake.length-1][1]]);
            world[snake[snake.length-1][0]][snake[snake.length-1][1]] = 'snake';
            randomspawn(world.length);
            drawTab();

          }else{

            var cut = snake.shift();
            world[cut[0]][cut[1]] = 'empty';
            snake.push([snake[snake.length-1][0]+1,snake[snake.length-1][1]]);
            world[snake[snake.length-1][0]][snake[snake.length-1][1]] = 'snake';
            drawTab();

          }}
        break;


      case 'left':
        if ( snake[snake.length-1][1]-1 < 0|| world[snake[snake.length-1][0]][snake[snake.length-1][1]-1] === 'snake'){
          gameOver();
        }else {

          if(world[snake[snake.length-1][0]][snake[snake.length-1][1]-1] === 'apple'){
            snake.push([snake[snake.length-1][0],snake[snake.length-1][1]-1]);
            world[snake[snake.length-1][0]][snake[snake.length-1][1]] = 'snake';
            randomspawn(world.length);
            drawTab();

          }else{

            var cut = snake.shift();
            world[cut[0]][cut[1]] = 'empty';
            snake.push([snake[snake.length-1][0],snake[snake.length-1][1]-1]);
            world[snake[snake.length-1][0]][snake[snake.length-1][1]] = 'snake';
            drawTab();

          }
        }
        
        break;
      
      
      case 'right':
        if ( snake[snake.length-1][1]+1 === world.length || world[snake[snake.length-1][0]][snake[snake.length-1][1]+1] === 'snake'){
          gameOver();
        }else{
          if(world[snake[snake.length-1][0]][snake[snake.length-1][1]+1] === 'apple'){

            snake.push([snake[snake.length-1][0],snake[snake.length-1][1]+1]);
            world[snake[snake.length-1][0]][snake[snake.length-1][1]] = 'snake';
            randomspawn(world.length);
            drawTab();
          
          }else{

            var cut = snake.shift();
            world[cut[0]][cut[1]] = 'empty';
            snake.push([snake[snake.length-1][0],snake[snake.length-1][1]+1]);
            world[snake[snake.length-1][0]][snake[snake.length-1][1]] = 'snake';
            drawTab();

          }
        }
        break;
    }
  }
