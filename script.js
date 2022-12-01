const canvasWidth = 500;
const canvasHeight = 500;
const centreX = canvasWidth / 2;
const centreY = canvasHeight / 2;
var btnrejouer;
var btnrejouerdiv;
var direction = 'up';
var interval;
var vitesse = 250; //vitesse du snake a mettre dans le setinterval selon la difficultÃ©
var gameover;
var score;
var hauteur;
var largeur;
var cut;
var intervalID;
const btn = document.querySelector(".btn");
const titre = document.querySelector(".containerGlitch");
const btn_diff = document.querySelector(".btn_diff");
const btn_difficile = document.getElementById("difficile");
const btn_normal = document.getElementById("normal");
const btn_facile = document.getElementById("facile");
const btn_niv = document.querySelector(".btn_niv");
const texte = document.getElementById("texte");
const texte2 = document.getElementById("texte2");

// création du canva pour l'affichage du snake
var canvas = document.getElementById("mycanvas1");
var ctx = canvas.getContext('2d');

// création de la map facile
let facile = [
  ['empty', 'empty', 'empty', 'empty', 'empty'],
  ['empty', 'empty', 'empty', 'empty', 'empty'],
  ['empty', 'empty', 'empty', 'empty', 'empty'],
  ['empty', 'empty', 'snake', 'empty', 'empty'],
  ['empty', 'empty', 'snake', 'empty', 'empty'],
];

// création de la map normal
let normal = [
  ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
  ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
  ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
  ['empty', 'empty', 'empty', 'snake', 'empty', 'empty', 'empty'],
  ['empty', 'empty', 'empty', 'snake', 'empty', 'empty', 'empty'],
  ['empty', 'empty', 'empty', 'snake', 'empty', 'empty', 'empty'],
  ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
];

// création de la map difficile
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

//initialisation du monde et de l'emplacement du snake si aucune difficutlté n'est séléctionnée
let world ;
let snake ;


window.onload = function () {
  var boutonJouer = document.getElementById('jouer');
  var boutonDiff = document.getElementsByClassName("btn_diff")[0];
  
  //création du listener pour les bouton de difficutlté
  boutonDiff.addEventListener('click', function(evt){
    if(evt.target.id === "facile"){
        world = facile;
        snake = [[4,2],[3,2]];
        vitesse = 500;
        btn_facile.classList.add("btn_facile-change");            //changement de couleur du bouton séléctionné (en rouge)
        btn_normal.classList.remove("btn_normal-change");         //changement de couleur du bouton non séléctionné (en bleu)
        btn_difficile.classList.remove("btn_difficile-change");   //changement de couleur du bouton non séléctionné (en bleu)
        
    }else if(evt.target.id === "normal"){
        world = normal;
        snake = [[5,3],[4,3],[3,3]];
        vitesse = 300;
        btn_facile.classList.remove("btn_facile-change");
        btn_normal.classList.add("btn_normal-change");
        btn_difficile.classList.remove("btn_difficile-change");
          
    }else if(evt.target.id === "difficile"){
        world = difficile;
        snake = [[10,6],[9,6],[8,6]];
        vitesse = 150;
        btn_facile.classList.remove("btn_facile-change");
        btn_normal.classList.remove("btn_normal-change");
        btn_difficile.classList.add("btn_difficile-change");
         
    }
  });

  // création du listener pour le bouton "Jouons !"
  boutonJouer.addEventListener('click', function(evt){
    init();
    // on modifie les boutons pour qu'ils soit invisibles
    btn.classList.toggle("btn-change");
    titre.classList.toggle("containerGlitch-change");
    btn_diff.classList.toggle("btn_diff-change");
    btn_niv.classList.toggle("btn_niv-change");
    texte.classList.add("p-change");        //Supprime les textes
    texte2.classList.add("p-change");

  });

  // Création du listener pour le choix du niveau
  document.getElementsByClassName("btn_niv")[0].addEventListener("click", function(evt){
    if(evt.target.id == 1){
      remplissage_niveau(evt.target.id); 
    }else if(evt.target.id == 2){
      remplissage_niveau(evt.target.id);
    }else if (evt.target.id == 3){
      remplissage_niveau(evt.target.id);
    }

    // on modifie les boutons pour qu'ils soit invisibles
    btn.classList.toggle("btn-change");
    titre.classList.toggle("containerGlitch-change");
    btn_diff.classList.toggle("btn_diff-change");
    btn_niv.classList.toggle("btn_niv-change");
     
    texte.classList.add("p-change");
    texte2.classList.add("p-change");
  
  });
};





function remplissage_niveau(niveau){
  (async function(){
    try {
        let response = await fetch("json/Niveau" + niveau + ".json");


        if(response.ok){
            let data = await response.json();
            vitesse = data.delay;

            //Création du tableau tab_niv 1D de longueur data.dimensions 
            var tab_niv= new Array(data.dimensions);
            //Création de tableau 1D pour chaque valeur de tab_niv permettant de faire de tab_niv un tableau 2D
            for (var i = 0; i<data.dimensions; i++){
              tab_niv[i] = new Array(data.dimensions); 
            }
            
            //Remplissage de tab_niv par empty
            for (var k = 0; k<data.dimensions; k++){
              for (var l = 0; l<data.dimensions; l++){
                tab_niv[k][l] = "empty";
              }
            }

            //Parcours des éléments serpents dans le json puis remplissage dans le tableau
            for(i of data.snake){
              tab_niv[i[0]][i[1]]="snake";
            }
            //Parcours des éléments murs dans le json puis remplissage dans le tableau
            for(i of data.walls){
              tab_niv[i[0]][i[1]]="walls";
            }
            //Parcours des éléments pommes dans le json puis remplissage dans le tableau
            for(i of data.apple){
              tab_niv[i[0]][i[1]]="apple";
            }
            
            //On initialise les variables globales avec les valeurs correspondantes aux json
            world = tab_niv;
            snake = data.snake;
            init();
        }else{
            throw("Err" + response.status);
        }
    }catch(err){
        console.log(err);
    }

})();

}
  

function init(){
  hauteur = (canvasHeight/world.length);
  largeur = (canvasWidth/world.length);
  gameover = 0;
  interval = 0;
  score = 0;
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  canvas.style.border = "30px solid black";
  canvas.style.margin = "25px auto";
  canvas.style.display = "flex";
  canvas.style.backgroundColor = "rgba("+50+","+100+","+250+",1)";
  randomspawn(world.length);
  drawTab(score);
  step();
}

// dessin d'une case vide
function vide(y,x) {
  ctx.lineWidth=3.5;
  ctx.shadowBlur = 10;
  
  ctx.shadowColor = "rgb("+50+","+100+","+250+")";
  ctx.strokeStyle= "rgba("+50+","+100+","+250+",1)"; //pour les lignes
  ctx.fillStyle = "black"; // pour les remplissages
  
  ctx.fillRect(x*largeur , y*hauteur, largeur, hauteur);
  ctx.strokeRect(x*largeur , y*hauteur, largeur, hauteur);
}

// dessin d'une case serpent
function serpan(y,x) { 
  ctx.lineWidth=0;
  ctx.shadowBlur = 0;
  
  ctx.shadowColor = "rgb("+0+","+100+","+250+")";
  ctx.strokeStyle= "rgba("+50+","+100+","+250+",1)"; //pour les lignes
  ctx.fillStyle = "turquoise"; // pour les remplissages
  
  ctx.fillRect(x*largeur , y*hauteur, largeur, hauteur);
  ctx.strokeRect(x*largeur , y*hauteur, largeur, hauteur);
}

// dessin d'une case mur
function wall(y,x){
  ctx.lineWidth=0;
  ctx.shadowBlur = 0;

  ctx.shadowColor = "rgba("+50+","+100+","+250+",1)";
  ctx.strokeStyle= "rgba("+50+","+100+","+250+",1)"; //pour les lignes
  ctx.fillStyle = "white"; // pour les remplissages

  ctx.fillRect(x*largeur , y*hauteur, largeur, hauteur);
  ctx.strokeRect(x*largeur , y*hauteur, largeur, hauteur);
}

// dessin d'une case pomme
function apple(y,x) { 
  ctx.lineWidth=0;
  ctx.shadowBlur = 0;
  
  ctx.shadowColor = "rgba("+50+","+100+","+250+",1)";
  ctx.strokeStyle= "rgba("+50+","+100+","+250+",1)"; //pour les lignes
  ctx.fillStyle = "red"; // pour les remplissages
  
  ctx.fillRect(x*largeur , y*hauteur, largeur, hauteur);
  ctx.strokeRect(x*largeur , y*hauteur, largeur, hauteur);
}

// Fonction qui permet l'apparation a un emplacement aléatoire d'une pomme 
function randomspawn(max){
  var i = Math.floor(Math.random() * max);
  var j = Math.floor(Math.random() * max);

  if(world[i][j] === 'snake' || world[i][j] === 'walls' || world[i][j] === 'apple'){
    randomspawn(world.length);
  }else{
    world[i][j] = 'apple';
  } 
}



//fonction qui va parcourir la map contenu dans world pour afficher les element selon leurs nature, elle permet aussi d'afficher le score
function drawTab(score){
  
  for (var i = 0; i<world.length; i++){
    for (var j = 0; j<world.length; j++){
      if (world[i][j] === 'empty'){
        vide(i,j);
      } else if (world[i][j] === 'snake'){
        serpan(i,j);               
      } else if (world[i][j] === 'apple'){
        apple(i,j);
      } else if (world[i][j] === 'walls'){
        wall(i,j);
      }
    }
  }

  affiche_score(score);

}

// Fonction qui affiche Victoire en cas de remplissage complet du tableau par le serpent, un bouton rejouer va egalement apparaitre et va recharger la page s'il est cliqué.
function vict(){
  ctx.shadowBlur = 10;
  ctx.shadowColor = "White";
  ctx.font = "bold 70px sans-serif";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.lineWidth = "5";
  ctx.fillText("Victoire", centreX, centreY - 180);
  

  btnrejouerdiv = document.createElement("div");
  btnrejouerdiv.classList.add("rejouer");
  btnrejouer = document.createElement("button");
  btnrejouer.id = "btnrejouer";
  btnrejouer.textContent = "Rejouer ?";
  btnrejouerdiv.appendChild(btnrejouer);
  document.body.insertBefore(btnrejouerdiv,canvas);
  btnrejouer.addEventListener("click", function(evt){
    window.location.reload();
  })
}

// Fonction qui affiche un GameOver en cas de mort du serpent, un bouton rejouer va egalement apparaitre et va recharger la page s'il est cliqué.
function gameOver(){
 
  ctx.shadowBlur = 10;
  ctx.shadowColor = "red";
  ctx.font = "bold 70px sans-serif";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.lineWidth = "5";
  ctx.fillText("Game Over", centreX, centreY - 180);
  
// On créer une nouvelle div puis on y met le bouton "Rejouer"
  btnrejouerdiv = document.createElement("div");
  btnrejouerdiv.classList.add("rejouer");
  btnrejouer = document.createElement("button");
  btnrejouer.id = "btnrejouer";
  btnrejouer.textContent = "Rejouer ?";
  btnrejouerdiv.appendChild(btnrejouer);
  document.body.insertBefore(btnrejouerdiv,canvas);

  // On créer un listener sur le bouton rejouer
  btnrejouer.addEventListener("click", function(evt){
    window.location.reload();
  }) 
}

//Fonction qui permet la mise a jour graphique du score en changeant le titre de la page
function affiche_score(score){
  document.getElementById("textGlitch").textContent = "Score: " + score;
}



// fonction qui permet le deplacement du snake ainsi que les vérifactions tel que savoir si une pomme est mangé,
// si le serpent est mort, si toutes les cases sont occupées par le serpent ou la mise a jour du score.
function step(){
  var case_Snake=0;
  var nbrMur=0;

  //On calcule le nombre de case occupées par le serpent et le nombre de mur
  for (var k = 0; k<world.length; k++){
    for (var l = 0; l<world.length; l++){
      if (world[k][l]==='snake'){
        case_Snake = case_Snake+1;
      } else if (world[k][l]==='walls'){
        nbrMur = nbrMur + 1
      }

    }
  }

  //On lance l'interval une seule fois
  if(interval === 0){
    intervalID = setInterval(step,vitesse);
    interval = 1;
  }

  //On vérifie si le nombre de case occupées par le serpent est égal au nombre de case total possible
  if(case_Snake === (Math.pow(world.length,2))-nbrMur){
    clearInterval(intervalID);
    vict();
  //on verifie si le serpent est mort pour arreter l'interval et appeler la fonction pour faire apparaitre le texte gameover
  }else if(gameover === 1){
    clearInterval(intervalID);
    gameOver();
  //on regarde quel touche a été appuyée pour changer la valeur de la variable direction, on vérifie aussi si le mouvement est possible
  //par exemple on ne peut pas aller en bas si la  direction est vers le haut. Dans se cas la, la direction de change pas.
  }else{
      window.addEventListener("keydown",function(event){
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
    //On bouge le serpent selon la direction définit plus tôt
    switch(direction){
      case 'up':
        //On vérifie si le serpent est hors de la map ou si la tête touche une case serpent ou si la tête touche un mur.
        if ( snake[snake.length-1][0]-1 < 0|| world[snake[snake.length-1][0]-1][snake[snake.length-1][1]] === 'snake' ||  world[snake[snake.length-1][0]-1][snake[snake.length-1][1]] === 'walls' ){
          gameover = 1;
        }else {
          // On regarde si le serpent mange un pomme,dans ce cas on avance la tête d'une case et on ne lui coupe pas la queu,
          // augmenter le score et regénérer une pomme.

          if(world[snake[snake.length-1][0]-1][snake[snake.length-1][1]] === 'apple'){
            snake.push([snake[snake.length-1][0]-1,snake[snake.length-1][1]]);
            world[snake[snake.length-1][0]][snake[snake.length-1][1]] = 'snake';
            score++;
            randomspawn(world.length);
            drawTab(score);

          }else{
          // Si le serpent n'est pas sur une pomme, on avance la tête d'une case et on coupe la queue.

            cut = snake.shift();
            world[cut[0]][cut[1]] = 'empty';
            snake.push([snake[snake.length-1][0]-1,snake[snake.length-1][1]]);
            world[snake[snake.length-1][0]][snake[snake.length-1][1]] = 'snake';
            drawTab(score);

          }}
          break;


      case 'down':
        if ( snake[snake.length-1][0]+1 === world.length || world[snake[snake.length-1][0]+1][snake[snake.length-1][1] ] === 'snake' ||  world[snake[snake.length-1][0]+1][snake[snake.length-1][1] ] === 'walls'){
          
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
        if ( snake[snake.length-1][1]-1 < 0|| world[snake[snake.length-1][0]][snake[snake.length-1][1]-1] === 'snake' || world[snake[snake.length-1][0]][snake[snake.length-1][1]-1] === 'walls' ){
         
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
        if ( snake[snake.length-1][1]+1 === world.length || world[snake[snake.length-1][0]][snake[snake.length-1][1]+1] === 'snake' || world[snake[snake.length-1][0]][snake[snake.length-1][1]+1] === 'walls'){
          
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