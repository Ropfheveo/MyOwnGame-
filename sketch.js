 var PLAY = 1;
 var END = 0;
 var gameState = PLAY;

 var ninja , ninja_running , ninja_collided , ninja_attack;
 var ground , invisibleGround , groundImage;
 var obstaclesGroup , obstacle1 , obstacle2 , obstacle3;
 var ghost , ghost_running;
 var skeleton , skeleton_running;
 var bat;
 var trap , trap_trapping;
 var life , lifeImg;
 var hit;
 var bground , backgroundImg , invisibleGround , canvas;

 var score;
 var gameOverImg , gameOver , restart , restartImg;
 var gameSound , dieSound , defeatSound;
 
     function preload(){
       ninja_running = loadAnimation("./Images/ninja2.png" , "./Images/ninja3.png" , "./Images/ninja4.png" , "./Images/ninja5.png" , "./Images/ninja6.png" , "./Images/ninja7.png");
       ninja_collided = loadImage("./Images/ninja21.png");
       ninja_attack = loadAnimation("./Images/ninja8.png" , "./Images/ninja15.png" , "./Images/ninja16.png");

       obstacle1 = loadImage("./Images/obstacle1.png");
       obstacle2 = loadImage("./Images/obstacle2.png");
       obstacle3 = loadImage("./Images/obstacle3.png");

       skeleton_running = loadAnimation("./Images/skeleton1.png" , "./Images/skeleton2.png");

       ghost_running = loadAnimation("./Images/ghost.png" , "./Images/ghost1.png" , "./Images/ghost2.png" , "./Images/ghost3.png");

       trap = loadImage("./Images/trap1.png");
       trap_trapping = loadAnimation("./Images/trap2.png" , "./Images/trap3.png" , "./Images/trap4.png" , "./Images/trap5.png" , "./Images/trap6.png");

       lifeImg = loadImage("./Images/heart.png");

       bat = loadAnimation("./Images/bat1.png" , "./Images/bat2.png" , "./Images/bat3.png");
       
       restartImg = loadImage("./Images/restart.png");
       gameOverImg = loadImage("./Images/gameOver.png");
       backgroundImg = loadImage("./Images/background.jpg");

      // gameSound = loadSound("./music/Farm.mp3");
       dieSound = loadSound("./music/dramatic-hit.mp3");
       defeatSound = loadSound("./music/clown-laugh.mp3");
     }
 
     function setup(){
      canvas = createCanvas(displayWidth - 20, displayHeight-50);

      bground = createSprite(displayWidth,displayHeight/2,displayWidth*2,displayHeight-50);
      bground.addImage("ground",backgroundImg);
      bground.x = bground.width /2;
      bground.velocityX = -2

      invisibleGround = createSprite(displayWidth/2,displayHeight-150,displayWidth,20);
      invisibleGround.visible = false;

      ninja = createSprite(200,160,100,100);
      ninja.addAnimation("running", ninja_running);
      ninja.addAnimation("collided", ninja_collided);
      ninja.addAnimation("attack", ninja_attack);                                                                                                   

      ninja.scale = 0.5;
      ninja.setCollider("rectangle",0,0,ninja.width,ninja.height);
      ninja.debug = true

     // ghost = createSprite(300,60,30,30);
     // ghost.addAnimation("running", ghost_running);

     // skeleton = createSprite(160,160,30,30);
     // skeleton.addAnimation("running",skeleton_running);

     //life = createSprite(1200,50,10,10);
     life = 3;

      gameOver = createSprite(300,100);
      gameOver.addImage(gameOverImg);
      
      restart = createSprite(300,140);
      restart.addImage(restartImg);
      
      gameOver.scale = 0.5;
      restart.scale = 0.5;

      //gameSound.loop();

      obstaclesGroup = createGroup();
      skeletonGroup = createGroup();
      ghostGroup = createGroup();
      //trapGroup = createGroup();
      
      score = 0;
     }
 
     function draw(){
      background("blue");

      text("Score: "+ score, 500,50);
      console.log(frameCount);

      if(gameState === PLAY){
        gameOver.visible = false;
        restart.visible = false;

        bground.velocityX = -(1 + score/100)
        score = score + Math.round(getFrameRate()/60);

        if(score>0 && score%100 === 0){
         // checkPointSound.play();
        }

        if(keyDown("space")&& ninja.y >= 100){
         ninja.velocityY = -12;
       //  gameSound.play();
        }

       // if(keyDown("D")){
       //   
       // }

       ninja.velocityY = ninja.velocityY + 0.8

       if (bground.x < 0){
        bground.x = bground.width/2;
      }

        if(obstaclesGroup.isTouching(ninja)){
           //trex.velocityY = -12;
           //gameSound.play();
           //gameState = END;
           life--
           //hit = 1
           obstaclesGroup.destroyEach()
           dieSound.play();
        }

         if(skeletonGroup.isTouching(ninja)){
           //trex.velocityY = -12;
           //gameSound.play();
           //gameState = END;
           life--
           //hit = 1
           skeletonGroup.destroyEach()
           dieSound.play();
        }

         if(ghostGroup.isTouching(ninja)){
           //trex.velocityY = -12;
           //gameSound.play();
           //gameState = END;
           life--
           //hit = 1
           ghostGroup.destroyEach()
           dieSound.play();
          }
 
         /* if(trapGroup.isTouching(ninja)){
            //trex.velocityY = -12;
            //dieSound.play();
            //gameState = END;
            //life--
            hit = 1
            defeatSound.play();
          }*/

          if(life === 3){
            //gameState=END
            //add 3 life sprite
            if(hit === 1){
              life--;
              hit = 0
            }
          }

          if(life === 2){
            //gameState=END
            if(hit === 1){
              life--;
              hit = 0
            }
          }

          if(life === 1){
            //gameState=END
            if(hit === 1){
              life--;
              hit = 0
            }
          }

          if(life === 0){
            gameState=END
          }

    // if(trap.isTouching(ninja)){
    //   gameState = END;
    // }
      //spawn the clouds();
    spawnObstacles();
    spawnGhost();
    spawnSkeleton();
   // spawnTrap();
    //spawn obstacles on the ground
    //spawnObstacles();
     }

     else if (gameState === END) {
       gameOver.visible = true;
       restart.visible = true;
     
      //change the ninja animation
       ninja.changeAnimation("collided", ninja_collided);
    
       bground.velocityX = 0;
       ninja.velocityY = 0;

       obstaclesGroup.setLifetimeEach(-1);
       skeletonGroup.setLifetimeEach(-1);
       ghostGroup.setLifetimeEach(-1);
       trapGroup.setLifetimeEach(-1);

       obstaclesGroup.setVelocityXEach(0);
       skeletonGroup.setVelocityXEach(0);   
       ghostGroup.setVelocityXEach(0);
       trapGroup.setVelocityXEach(0);

      if(mousePressedOver(restart)) {
      reset();
      }
    }
    ninja.collide(invisibleGround);
    drawSprites();
  }

  function reset(){
    gameState = PLAY;
    gameOver.visible = false;
    restart.visible = false;
    obstaclesGroup.destroyEach();
    skeletonGroup.destroyEach();
    ghostGroup.destroyEach();
    ninja.changeAnimation("running", ninja_running);
    score = 0;
  }

  function spawnObstacles(){
    if (frameCount % 100 === 0){
      var obstacle = createSprite(1370,160,40,40);
      //450
      obstacle.velocityX = -(1 + score/100);
       //generate random obstacles
       var rand = Math.round(random(1,3));
       switch(rand) {
         case 1: obstacle.addImage(obstacle1);
                 break;
         case 2: obstacle.addImage(obstacle2);
                 break;
         case 3: obstacle.addImage(obstacle3);
                 break;
      //   case 4: obstacle.addImage(obstacle4);
      //          break;
      //   case 5: obstacle.addImage(obstacle5);
      //           break;
      //   case 6: obstacle.addImage(obstacle6);
      //           break;
          default: break;
       }
       //assign scale and lifetime to the obstacle           
       obstacle.scale = 0.5;
       obstacle.lifetime = 300;
      //add each obstacle to the group
       obstaclesGroup.add(obstacle);
    }
   }

   function spawnSkeleton(){
    if (frameCount % 80 === 0){
       var skeleton = createSprite(1370,550,100,100);
       skeleton.addAnimation("Srunning",skeleton_running);  
       //var obstacle = createSprite(600,165,30,30);
       skeleton.velocityX = -(2 + score/100);
       //skeleton.y = Math.round(random(80,1020));
       //assign scale and lifetime to the obstacle           
       skeleton.scale = 0.5;
       skeleton.lifetime = 300;
      //add each obstacle to the group
       skeletonGroup.add(skeleton);
    }
   }

    function spawnGhost(){
    if (frameCount % 120 === 0){
      var ghost = createSprite(1370,160,30,30);
      ghost.addAnimation("Grunning",ghost_running);
      //var obstacle = createSprite(600,165,30,30);
      ghost.velocityX = -(2 + score/100); 
      ghost.y = Math.round(random(80,120));
       //assign scale and lifetime to the obstacle           
       ghost.scale = 0.5;
       ghost.lifetime = 300;
      //add each obstacle to the group
       ghostGroup.add(ghost);
    }
   }

  /* function spawnTrap(){
    if (frameCount % 150 === 0){
      var trap = createSprite(1370,160,30,30);
      trap.addAnimation("trapping",trap_trapping); 
      //var obstacle = createSprite(600,165,30,30);
      trap.velocityX = -(6 + score/100);
      trap.y = Math.round(random(80,120));
       //assign scale and lifetime to the obstacle
       trap.scale = 0.5;
       trap.lifetime = 300;

      //add each obstacle to the group
       trapGroup.add(trap);
    }
   }*/