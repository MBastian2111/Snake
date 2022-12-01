const canvasWidth = 500;
const canvasHeight = 500;
const centreX = canvasWidth / 2;
const centreY = canvasHeight / 2;
var btnrejouer;
var direction = 'up';
var interval;
var vitesse = 250; //vitesse du snake a mettre dans le setinterval selon la difficulté
var gameover;
var score;
var cut;
var intervalID;
const btn = document.querySelector(".btn");
const titre = document.querySelector(".containerGlitch");
const btn_diff = document.querySelector(".btn_diff");
const btn_difficile = document.querySelector(".btn_difficile");
const btn_normal = document.querySelector(".btn_normal");
const btn_facile = document.querySelector(".btn_facile");


var canvas = document.getElementById("mycanvas1");
var ctx = canvas.getContext('2d');

let facile = [
  ['empty', 'empty', 'empty', 'empty', 'empty'],
  ['empty', 'empty', 'empty', 'empty', 'empty'],
  ['empty', 'empty', 'empty', 'empty', 'empty'],
  ['empty', 'empty', 'snake', 'empty', 'empty'],
  ['empty', 'empty', 'snake', 'empty', 'empty'],
];

let normal = [
  ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
  ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
  ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
  ['empty', 'empty', 'empty', 'snake', 'empty', 'empty', 'empty'],
  ['empty', 'empty', 'empty', 'snake', 'empty', 'empty', 'empty'],
  ['empty', 'empty', 'empty', 'snake', 'empty', 'empty', 'empty'],
  ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
];

let difficile = [
  ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
  ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
  ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
  ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
  ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
  ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
  ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
  ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
  ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'snake', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
  ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'snake', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
  ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'snake', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
  ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
  ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
];

let world = normal;
let snake = [[5,3],[4,3],[3,3]];


window.onload = function () {
  var boutonJouer = document.getElementById('jouer');
  var boutonDiff = document.getElementsByClassName("btn_diff")[0];
  
  boutonDiff.addEventListener('click', function(evt){
    if(evt.target.id === "facile"){
        world = facile;
        snake = [[4,2],[3,2]];
        vitesse = 500;
        //btn_facile.classList.add("btn_facile-change");
        //btn_facile.classList.remove("btn_facile-change");
    }else if(evt.target.id === "normal"){
        world = normal;
        snake = [[5,3],[4,3],[3,3]];
        vitesse = 300;
        //btn_normal.classList.add("btn_normal-change"); 
        //btn_normal.classList.remove("btn_normal-change"); 
    }else if(evt.target.id === "difficile"){
        world = difficile;
        snake = [[10,6],[9,6],[8,6]];
        vitesse = 150;
        //btn_difficile.classList.add("btn_difficile-change"); 
        //btn_difficile.classList.remove("btn_difficile-change");
    }
  });

  boutonJouer.addEventListener('click', function(evt){
    console.log("appuie");
    init();
    step();
    btn.classList.toggle("btn-change");
    titre.classList.toggle("containerGlitch-change");
    btn_diff.classList.toggle("btn_diff-change");
    
  });
};



function init(){
  gameover = 0;
  interval = 0;
  score = 0;
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  canvas.style.border = "30px solid black";
  canvas.style.margin = "50px auto";
  canvas.style.display = "flex";
  canvas.style.backgroundColor = "rgba("+50+","+100+","+250+",1)";
  canvas.re
  randomspawn(world.length);
  drawTab(score);
}

function vide(y,x) {
  ctx.lineWidth=3.5;
  ctx.shadowBlur = 10;
  
  ctx.shadowColor = "rgb("+50+","+100+","+250+")";
  ctx.strokeStyle= "rgba("+50+","+100+","+250+",1)"; //pour les lignes
  ctx.fillStyle = "black"; // pour les remplissages
  
  ctx.fillRect(x*(canvasWidth/world.length) , y*(canvasHeight/world.length), canvasWidth/world.length, canvasHeight/world.length);
  ctx.strokeRect(x*(canvasWidth/world.length) , y*(canvasHeight/world.length), canvasWidth/world.length, canvasHeight/world.length);
}

function serpan(y,x) { 
  ctx.lineWidth=0;
  ctx.shadowBlur = 0;
  
  ctx.shadowColor = "rgb("+0+","+100+","+250+")";
  ctx.strokeStyle= "rgba("+50+","+100+","+250+",1)"; //pour les lignes
  ctx.fillStyle = "turquoise"; // pour les remplissages
  
  ctx.fillRect(x*(canvasWidth/world.length) , y*(canvasHeight/world.length), canvasWidth/world.length, canvasHeight/world.length);
  ctx.strokeRect(x*(canvasWidth/world.length) , y*(canvasHeight/world.length), canvasWidth/world.length, canvasHeight/world.length);
}

function apple(y,x) { 
  ctx.lineWidth=0;
  ctx.shadowBlur = 0;
  
  ctx.shadowColor = "rgba("+50+","+100+","+250+",1)";
  ctx.strokeStyle= "rgba("+50+","+100+","+250+",1)"; //pour les lignes
  ctx.fillStyle = "red"; // pour les remplissages
  
  ctx.fillRect(x*(canvasWidth/world.length) , y*(canvasHeight/world.length), canvasWidth/world.length, canvasHeight/world.length);
  ctx.strokeRect(x*(canvasWidth/world.length) , y*(canvasHeight/world.length), canvasWidth/world.length, canvasHeight/world.length);
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




function drawTab(score){
  
  for (var i = 0; i<world.length; i++){
    for (var j = 0; j<world.length; j++){
      if (world[i][j] === 'empty'){
        vide(i,j);
      } else if (world[i][j] === 'snake'){
        serpan(i,j);               
      } else if (world[i][j] === 'apple'){
        apple(i,j);
      }
    }
  }

  affiche_score(score);

}


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




 
function gameOver(){
  ctx.save();
  ctx.shadowBlur = 10;
  ctx.shadowColor = "red";
  ctx.font = "bold 70px sans-serif";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.lineWidth = "5";
  ctx.fillText("Game Over", centreX, centreY - 180);
  ctx.restore();

  btnrejouer = document.createElement("button");
  btnrejouer.textContent = "Rejouer ?";
  document.body.insertBefore(btnrejouer,canvas);  
}

function affiche_score(score){
  document.getElementById("textGlitch").textContent = "Votre score: " + score;
}




function step(){

  console.log("step");
  //affiche_score(score);

  if(interval === 0){
    console.log("dans ta mere");
    intervalID = setInterval(step,vitesse);
    interval = 1;
  }

  if(gameover === 1){
    clearInterval(intervalID);
    console.log("NIQUE TA MERE");
    gameOver();
    return -1;
    
  }else{
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
          gameover = 1;
        }else {

          if(world[snake[snake.length-1][0]-1][snake[snake.length-1][1]] === 'apple'){
            snake.push([snake[snake.length-1][0]-1,snake[snake.length-1][1]]);
            world[snake[snake.length-1][0]][snake[snake.length-1][1]] = 'snake';
            score++;
            randomspawn(world.length);
            drawTab(score);

          }else{

            cut = snake.shift();
            world[cut[0]][cut[1]] = 'empty';
            snake.push([snake[snake.length-1][0]-1,snake[snake.length-1][1]]);
            world[snake[snake.length-1][0]][snake[snake.length-1][1]] = 'snake';
            drawTab(score);

          }}
          break;


      case 'down':
        if ( snake[snake.length-1][0]+1 === world.length || world[snake[snake.length-1][0]+1][snake[snake.length-1][1] ] === 'snake'){
          
          gameover = 1;
        }else{

          if(world[snake[snake.length-1][0]+1][snake[snake.length-1][1] ] === 'apple'){
            snake.push([snake[snake.length-1][0]+1,snake[snake.length-1][1]]);
            world[snake[snake.length-1][0]][snake[snake.length-1][1]] = 'snake';
            score++;
            randomspawn(world.length);
            drawTab(score);

          }else{

            cut = snake.shift();
            world[cut[0]][cut[1]] = 'empty';
            snake.push([snake[snake.length-1][0]+1,snake[snake.length-1][1]]);
            world[snake[snake.length-1][0]][snake[snake.length-1][1]] = 'snake';
            drawTab(score);

          }}
        break;


      case 'left':
        if ( snake[snake.length-1][1]-1 < 0|| world[snake[snake.length-1][0]][snake[snake.length-1][1]-1] === 'snake'){
         
          gameover = 1;
        }else {

          if(world[snake[snake.length-1][0]][snake[snake.length-1][1]-1] === 'apple'){
            snake.push([snake[snake.length-1][0],snake[snake.length-1][1]-1]);
            world[snake[snake.length-1][0]][snake[snake.length-1][1]] = 'snake';
            score++;
            randomspawn(world.length);
            drawTab(score);

          }else{

            cut = snake.shift();
            world[cut[0]][cut[1]] = 'empty';
            snake.push([snake[snake.length-1][0],snake[snake.length-1][1]-1]);
            world[snake[snake.length-1][0]][snake[snake.length-1][1]] = 'snake';
            drawTab(score);

          }
        }
        
        break;
      
      
      case 'right':
        if ( snake[snake.length-1][1]+1 === world.length || world[snake[snake.length-1][0]][snake[snake.length-1][1]+1] === 'snake'){
          
          gameover = 1;
        }else{
          if(world[snake[snake.length-1][0]][snake[snake.length-1][1]+1] === 'apple'){

            snake.push([snake[snake.length-1][0],snake[snake.length-1][1]+1]);
            world[snake[snake.length-1][0]][snake[snake.length-1][1]] = 'snake';
            score++;
            randomspawn(world.length);
            drawTab(score);
          
          }else{

            cut = snake.shift();
            world[cut[0]][cut[1]] = 'empty';
            snake.push([snake[snake.length-1][0],snake[snake.length-1][1]+1]);
            world[snake[snake.length-1][0]][snake[snake.length-1][1]] = 'snake';
            drawTab(score);

          }
        }
        break;
    }
  }
}
