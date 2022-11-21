const canvasWidth = 500;
const canvasHeight = 500;
//const maxValeur = world.length;

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
//var intervarlID = setInterval(step,500);
  
init ();


function init(){
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  canvas.style.border = "30px solid gray";
  canvas.style.margin = "50px auto";
  canvas.style.display = "block";
  canvas.style.backgroundColor = "gray";
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

randomspawn(world.length);
function randomspawn(max){
  var i = Math.floor(Math.random() * max);
  var j = Math.floor(Math.random() * max);

  if(world[i][j] === 'snake'){
    randomspawn(world.length);
  }else{
    world[i][j] = 'apple';
  } 
}


drawTab();

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

/*function step(){
  var direction = 'up';
  let snake = [[3,5],[3,4],[3,3]];

  if(direction === 'up'){
    snake[][]
  }

  let snake = [[3,5],[3,4],[3,3]];
  console.log(snake[2][2]);
  snake[][]
*/


let snake = [[5,3],[4,3],[3,3]];
let snakehead = snake[snake.length-1];
console.log(snakehead);
isDead(snake[snake.length-1]);


function isDead(coorTete){
  var x = coorTete[1];
  var y = coorTete[0];
  console.log("co tete " + coorTete);
  console.log(x);
  console.log(y);
  console.log(world[x][y]);

  if (world[x][y] != 'empty' || world[x][y] != 'apple'){
    console.log("dead");
  }else{
    console.log("alive");
  }  
}

window.addEventListener("keydown",function(event){
  var direction;
  if (event.key === 'ArrowDown'){
    if (direction != 'up'){
    
    direction = 'down';
    console.log(direction);
    if(getapple() == snake[snake.length-1]){
      
      console.log("pareil");

      snake.push([snake[snake.length-1][0]+1,snake[snake.length-1][1]]);
      world[snake[snake.length-1][0]][snake[snake.length-1][1]] = 'snake';
      randomspawn(world.length);
      drawTab();
      isDead(snake[snake.length-1]);

    }else{
      direction = 'down';
      console.log("autre");
      
      var cut = snake.shift();
      world[cut[0]][cut[1]] = 'empty';

      snake.push([snake[snake.length-1][0]+1,snake[snake.length-1][1]]);
      world[snake[snake.length-1][0]][snake[snake.length-1][1]] = 'snake';
      drawTab();
      isDead(snake[snake.length-1]);      
    }
  }

  }else  if (event.key === 'ArrowLeft'){
    if (direction != 'right'){
    direction = 'left';

    if(getapple() == snake[snake.length-1]){
      
      console.log("pareil");

      snake.push([snake[snake.length-1][0],snake[snake.length-1][1]-1]);
      world[snake[snake.length-1][0]][snake[snake.length-1][1]] = 'snake';
      randomspawn(world.length);
      drawTab();
      isDead(snake[snake.length-1]);

    }else{
      direction = 'left';
      console.log("autre");
      
      var cut = snake.shift();
      world[cut[0]][cut[1]] = 'empty';

      snake.push([snake[snake.length-1][0],snake[snake.length-1][1]-1]);
      world[snake[snake.length-1][0]][snake[snake.length-1][1]] = 'snake';
      drawTab();
      isDead(snake[snake.length-1]);      
    }
  }

  }else  if (event.key === 'ArrowRight'){
    if(direction != 'left'){
    direction = 'right';

    if(getapple() == snake[snake.length-1]){
      
      console.log("pareil");
      
      snake.push([snake[snake.length-1][0],snake[snake.length-1][1]+1]);
      world[snake[snake.length-1][0]][snake[snake.length-1][1]] = 'snake';
      randomspawn(world.length);
      drawTab();
      isDead(snake[snake.length-1]);

    }else{
      direction = 'right';
      console.log("autre");
      
      var cut = snake.shift();
      world[cut[0]][cut[1]] = 'empty';

      snake.push([snake[snake.length-1][0],snake[snake.length-1][1]+1]);
      world[snake[snake.length-1][0]][snake[snake.length-1][1]] = 'snake';
      drawTab();
      isDead(snake[snake.length-1]);      
    }
  }

  }else  if (event.key === 'ArrowUp'){
    if (direction === 'down'){}else{
    direction = 'up';
   
    if(getapple() == snake[snake.length-1]){
      
      console.log("pareil");
      
      snake.push([snake[snake.length-1][0]-1,snake[snake.length-1][1]]);
      world[snake[snake.length-1][0]][snake[snake.length-1][1]] = 'snake';
      randomspawn(world.length);
      drawTab();
      isDead(snake[snake.length-1]);

    }else{
      direction = 'up';
      console.log("autre");
      
      var cut = snake.shift();
      world[cut[0]][cut[1]] = 'empty';

      snake.push([snake[snake.length-1][0]-1,snake[snake.length-1][1]]);
      world[snake[snake.length-1][0]][snake[snake.length-1][1]] = 'snake';
      drawTab();
      isDead(snake[snake.length-1]);      
    }
    }
  
  }
});