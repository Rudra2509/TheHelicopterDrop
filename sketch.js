var helicopterIMG, helicopterSprite, packageSprite,packageIMG;
var packageBody,ground;
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var rect1,rect2,rect3;

function preload()
{
	helicopterIMG=loadImage("helicopter.png")
	packageIMG=loadImage("package.png")
}

function setup() {
	createCanvas(800, 600);
	rectMode(CENTER);
	

	packageSprite=createSprite(width/2, 200, 10,10);
	packageSprite.addImage(packageIMG)
	packageSprite.scale=0.2

	helicopterSprite=createSprite(width/2, 200, 10,10);
	helicopterSprite.addImage(helicopterIMG)
	helicopterSprite.scale=0.6

	groundSprite=createSprite(width/2, height-35, width,50);
	groundSprite.shapeColor=color("brown")

    rect1 = createSprite(100,530,200,20)
	rect1.shapeColor = "green"
	rect2  = createSprite(10,470,20,100)
	rect2.shapeColor = "green"
    rect3 = createSprite(190,470,20,100)
	rect3.shapeColor = "green"

	engine = Engine.create();
	world = engine.world;

	
	packageBody = Bodies.circle(width/2 , 200 , 5 , {restitution:0.7, isStatic:true});
	World.add(world, packageBody);
	

	//Create a Ground
	ground = Bodies.rectangle(width/2, height-35, width, 50 , {isStatic:true} );
 	World.add(world, ground);

	rectangle1 = Bodies.rectangle(100,510,200,20, {isStatic:true} );
 	World.add(world, rectangle1);
	 rectangle2 = Bodies.rectangle(10,450,20,100, {isStatic:true} );
 	World.add(world, rectangle2);
	rectangle3 = Bodies.rectangle(190,450,20,100, {isStatic:true} );
 	World.add(world, rectangle3);
	 

	Engine.run(engine);
  
}


function draw() {
  rectMode(CENTER);
  background(0);
  createEdgeSprites();
  packageBody.position.x = helicopterSprite.x;
  packageSprite.x= packageBody.position.x 
  packageSprite.y= packageBody.position.y 

  rectangle1.x = rect1.x;
  rectangle2.x = rect2.x;
  rectangle3.x = rect3.x;
  
  if(packageSprite.y > 500 && packageSprite.x > rect2.x && packageSprite.x < rect3.x){
  packageSprite.velocityX = rect1.velocityX;
  Matter.Body.setStatic(packageBody, true);
  rect1.velocityX = 0;
  rect2.velocityX = 0;
  rect3.velocityX = 0;
  }

   //packageSprite.collide(rect2)
   //packageSprite.collide(rect3)
   //packageSprite.collide(rect1)
   //rect1.setBounceOnWall(true)
   //rect2.setBounceOnWall(true)
   //rect3.setBounceOnWall(true)
   
   
  
   if(rect2.x < 15){
	rect2.velocityX = 6;
	rect1.velocityX = 6;
	rect3.velocityX = 6;
	}

	if(rect3.x > 790){
		rect3.velocityX = -6;
		rect1.velocityX = -6;
		rect2.velocityX = -6;
		}

  if(packageBody.position.y < 300){
  helicopterSprite.x = mouseX;
  }

  if(packageSprite.y > 450 && packageSprite.x < rect2.x || packageSprite.y > 500 && packageSprite.x > rect3.x){
    textSize(20)
	stroke("red")
    text("MISSION UNSUCCESSFUL",270,150)
	rect1.velocityX = 0;
	rect2.velocityX = 0;
	rect3.velocityX = 0;
  }
  
  if(packageSprite.y > 450 && packageSprite.x > rect2.x && packageSprite.x < rect3.x){
	textSize(20);
	stroke("green");
    text("MISSION SUCCESSFUL",270,150)
  }

  //restart1();

  drawSprites();
  textSize(12)
  stroke("blue")
  text("You are the Pilot of this helicopter.",30,30)
  text("Due to frequent zombie attacks the location of the dropping point keeps on changing",30,50)
  text("Your mission is to drop the package at the dropping point",30,70)
  stroke("yellow")
  text("A L L  T H E  B E S T  ! ! !",30,90)
}

function keyPressed() {
 if (keyCode === DOWN_ARROW) {
    // Look at the hints in the document and understand how to make the package body fall only on press of the Down arrow key.
    Matter.Body.setStatic(packageBody, false )
  }
}

//function restart1(){
//if(keycode === "space" && rect1.velocityX === 0){
//packageSprite.x = width/2;
//packageSprite.y = 200;
////helicopterSprite.x = width/2;
//rect1.x = 100;
//rect2.x = 10;
//rect3.x = 190;
//}
//}

