var trex, trex_running, trex_collided;

var ground, invisibleGround, groundImage,cloudImage,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;
var jumpSound,dieSound,checkPointSound;
var score=0;
var cloudsGroup,obstaclesGroup;
var PLAY=1;
var END=0;
var gameState=PLAY;
var gameOver,gameOverImage,restart,restartImage;

function preload() {

        trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
        trex_collided = loadImage("trex_collided.png");

        groundImage = loadImage("ground2.png")
        cloudImage=loadImage("cloud.png");
        obstacle1=loadImage("obstacle1.png");
        obstacle2=loadImage("obstacle2.png");
        obstacle3=loadImage("obstacle3.png");
        obstacle4=loadImage("obstacle4.png");
        obstacle5=loadImage("obstacle5.png");
        obstacle6=loadImage("obstacle6.png");
        gameOverImage=loadImage("gameOver.png");
        restartImage=loadImage("restart.png");
        jumpSound=loadSound("jump.mp3");
        dieSound=loadSound("die.mp3");
        checkPointSound=loadSound("checkpoint.mp3")
}

function setup() {

        createCanvas(600, 200);
        var message="I am Hema";
        //console.log(message);

        //create a trex sprite
        trex = createSprite(50,160,20,50);
        trex.addAnimation("running", trex_running);
        trex.scale = 0.5;
        trex.debug=true;
        trex.setCollider("rectangle",0,0,200,trex.height);

        //create a ground sprite
        ground = createSprite(200,180,400,20);
        ground.addImage("ground",groundImage);
        ground.x = ground.width /2;
     

        gameOver=createSprite(300,100);
        gameOver.addImage("gameOver",gameOverImage);
        gameOver.scale= 0.6


        restart=createSprite(300,140);
        restart.addImage("restart",restartImage);
        restart.scale= 0.4
        
        invisibleGround=createSprite(200,190,400,20);
        invisibleGround.visible=false;

        cloudsGroup=new Group();
        obstaclesGroup=new Group();

          
}

function draw() {
  
        background(180);
         
        //console.log(message);
        text("Score : "+score,500,50 );
        if(gameState===PLAY){
                score=score+Math.round(frameCount/60);
                ground.velocityX = -(4+3*score/100);
                if(score>0 && score%100===0){
                        checkPointSound.play();
                }

                gameOver.visible=false;
                restart.visible=false;

                 //jump when the space button is pressed
                 if (keyDown("space") && trex.y>=155) {

                trex.velocityY = -10;
                jumpSound.play();

                }
                trex.velocityY = trex.velocityY + 0.8
                if (ground.x < 0) {

                ground.x = ground.width / 2;
        
                }
                spawnClouds();
                spawnObstacles();
                if(obstaclesGroup.isTouching(trex)){
                       gameState=END;
                       dieSound.play();
                       
                }
        }
        else if (gameState===END){
                ground.velocityX=0;
                trex.velocityY=0;
                trex.addImage("Collided",trex_collided);
                obstaclesGroup.setVelocityXEach(0);
                cloudsGroup.setVelocityXEach(0);
                obstaclesGroup.setLifetimeEach(-1);
                cloudsGroup.setLifetimeEach(-1);
                gameOver.visible=true
                restart.visible=true

                if(mousePressedOver(restart)){
                        reset();
                }
        }
        
        trex.collide(invisibleGround);
        
        drawSprites();
}
function reset(){
       score=0;
       gameState=PLAY;
       restart.visible=false;
       gameOver.visible=false;
        obstaclesGroup.destroyEach();
        cloudsGroup.destroyEach();

}
function spawnClouds(){
   if(frameCount % 60 === 0){
        var cloud=createSprite(600,100,40,10);
        cloud.addImage("cloud",cloudImage);
        cloud.y = Math.round(random(10,60));
        cloud.scale=0.1;
        cloud.velocityX=-3;
        cloud.lifetime=210;
        cloud.depth=trex.depth;
        trex.depth+=1

        cloudsGroup.add(cloud);
   }
}
function spawnObstacles(){
        if(frameCount % 60 === 0){
        var obstacle=createSprite(600,165,20,20);
        obstacle.velocityX=-(6+score/100);
           
        var rand=Math.round(random(1,6));

        switch(rand){
                case 1 : obstacle.addImage(obstacle1);
                        break;
                case 2 : obstacle.addImage(obstacle2);
                        break;
                case 3 : obstacle.addImage(obstacle3);
                        break;
                case 4 : obstacle.addImage(obstacle4);
                        break;
                case 5 : obstacle.addImage(obstacle5);
                        break;
                case 6 : obstacle.addImage(obstacle6);
                        break;
                default:break;
        }
        obstacle.scale=0.1;
        obstacle.lifetime=160;

        obstaclesGroup.add(obstacle);
       
}
}