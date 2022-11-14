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

function vide(x,y) { 
  ctx.strokeStyle = "black"; //pour les lignes
  ctx.fillStyle = "#00FF00"; // pour les remplissages
  ctx.fillRect(x*(canvasWidth/world.length) , y*(canvasHeight/world.length), canvasWidth/world.length, canvasHeight/world.length);
  ctx.strokeRect(x*(canvasWidth/world.length) , y*(canvasHeight/world.length), canvasWidth/world.length, canvasHeight/world.length)
}

function serpan(x,y) { 
  ctx.strokeStyle = "black"; //pour les lignes
  ctx.fillStyle = "blue"; // pour les remplissages
  ctx.fillRect(x*(canvasWidth/world.length) , y*(canvasHeight/world.length), canvasWidth/world.length, canvasHeight/world.length);
  ctx.strokeRect(x*(canvasWidth/world.length) , y*(canvasHeight/world.length), canvasWidth/world.length, canvasHeight/world.length)
}

function apple(x,y) { 
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


drawTab();

function drawTab(){
  
  //randomspawn(world.length);
  
  console.log(world.length);
  for (var j = 0; j<world.length; j++){
    for (var i = 0; i<world.length; i++){
      if (world[i][j] === 'empty'){
        console.log("c'est vide ptn");
        vide(j,i);
      } else if (world[i][j] === 'snake'){
        serpan(j,i);
        console.log("c'est un ptn de serpan");        
      } else if (world[i][j] === 'apple'){
        apple(j,i);
        console.log("c'est une ptn de pomme");
      }
    }
  }
console.log(world);
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

console.log(getapple());
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
