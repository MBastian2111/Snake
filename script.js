const canvasWidth = 900;
const canvasHeight = 600;
const blockSize = 30;
var canvas = document.getElementById("mycanvas1");
var ctx = canvas.getContext('2d');
  
init ();

function init(){
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  canvas.style.border = "30px solid gray";
  canvas.style.margin = "50px auto";
  canvas.style.display = "block";
  canvas.style.backgroundColor = "#ddd";
}

function vide(x,y) {
  ctx.fillRect(x*(canvasWidth/world.length) , y*(canvasHeight/world.length), canvasWidth/world.length, canvasHeight/world.length);
}
  
let world = [
  ['empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
  ['empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
  ['empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
  ['empty', 'empty', 'snake', 'empty', 'empty', 'empty'],
  ['empty', 'empty', 'snake', 'empty', 'empty', 'empty'],
  ['empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
];
  
console.log(world.length);
  for (var i = 0; i<world.length; i++){
    for (var j = 0; j<world.length; j++){
      if (world[i][j] === 'empty'){
        console.log("c'est vide ptn");
        vide(i,j);
      } else if (world[i][j] === 'snake'){
        console.log("c'est un ptn de serpan");
        
        
      } else if (world[i][j] === 'apple'){
        console.log("c'est une ptn de pomme");
      }
    }
  }
console.log(world);






