
var trex ,trex_running,trex_collided;
var ground,invisbleground;
var groundImage;
var cloud,cloudImage;
var obstacle,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;
var score;
var cloudGroup,obstacleGroup;
var PLAY=1;
var END=0;
var gameState=PLAY;

function preload(){
  trex_running=loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided=loadAnimation("trex_collided.png");
  groundImage=loadImage("ground2.png");
  cloudImage=loadImage("cloud.png");
  obstacle1=loadImage("obstacle1.png");
  obstacle2=loadImage("obstacle2.png");
  obstacle3=loadImage("obstacle3.png");
  obstacle4=loadImage("obstacle4.png");
  obstacle5=loadImage("obstacle5.png");
  obstacle6=loadImage("obstacle6.png");

}

function setup(){
  createCanvas(600,200)
  
  //crear sprite del t-rex.
  trex=createSprite(50,180,20,50);
  trex.addAnimation("running",trex_running);
  trex.scale=0.5;

 
 //crea sprite del suelo
  ground=createSprite(200,180,400,20);
   ground.addImage("ground",groundImage);
  ground.x=ground.width/2
  //CREA EL PISO INVISIBLE
  invisbleground=createSprite(200,190,400,10)
  invisbleground.visible=false;
  obstacleGroup=new Group();
  cloudGroup=new Group();
  //var ran=Math.round(random(10,60));
  //console.log (ran);

  trex.setCollider("circle",0,0,40);
  trex.debug=true;
  console.log("estado del juego",gameState);       
  score=0
}

function draw(){
 background(150);
 text("puntuación"+score,500,50);
 //cambia el game state
 if (gameState===PLAY){
  ground.velocityX=-2;
  score=score+Math.round(frameCount/240);
  if(keyDown("space")&&trex.y>=100){
    trex.velocityY=-10;
  }
    trex.velocityY=trex.velocityY+0.8;
  //hacemos el piso infinito
 if(ground.x<0){
  ground.x=ground.width/2;
  }  
  spawnclouds();
  spawnObstacles();

  if(obstacleGroup.isTouching(trex)){
     
    gameState=END;
  }
 }
 else if(gameState===END){
 //pone velocidad al piso
 ground.velocityX=0;
 trex.velocityY=0;
 //CAMBIAR LA ANIMACIÓN DEL TREX
 trex.changeAnimation("collided", trex_collided);
 obstacleGroup.setLifetimeEach(-1);
 cloudGroup.setLifetimeEach(-1);
 cloudGroup.setVelocityXEach(0);
 obstacleGroup.setVelocityXEach(0);

 }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      


 //evitar que el trex se caiga
   trex.collide(invisbleground);

    drawSprites();

  }

 function spawnclouds(){
   if(frameCount%60===0){
    cloud=createSprite(600,100,40,10);
    cloud.addImage(cloudImage);
     cloud.y=Math.round(random(10,60));

    cloud.scale=0.4;
    cloud.velocityX=-3;
    cloud.lifetime=200;
    //Ajustar la profundidad
    cloud.depht=trex.depht;
    trex.depht=trex.depht+1;
    cloudGroup.add(cloud)
   }
   }
   function spawnObstacles(){
     if(frameCount%60===0){
      var obstacle=createSprite(600,165,10,40);
      obstacle.velocityX=-6;
      // generar obstaculos aleatorios
      var rand=Math.round(random(1,6));
      switch(rand){
        case 1: obstacle.addImage(obstacle1);
        break;
        
        case 2: obstacle.addImage(obstacle2);
        break;

        case 3: obstacle.addImage(obstacle3);
        break;

        case 4: obstacle.addImage(obstacle4);
        break;

        case 5: obstacle.addImage(obstacle5);
        break;
        
        case 6: obstacle.addImage(obstacle6);
        break;

        default:break;
      }
      obstacle.scale=0.5;
  
      obstacle.lifetime=-1;
      //agregar cada obstaculo al grupo
      obstacleGroup.add(obstacle);
      
      
     
      
     }

  }
     


  
  
