const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;
let engine;
let world;
var ground;
var fruit,rope;
var fruit_con;
var butlon;
var bg_img;
var food;
var globo;
var vuton
var rabbit;
var norman1 ,comer2, pobre_cosita_fea;
var chiki, cut, triste, eating, ventisca;
function preload(){
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');
  norman1=loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  comer2=loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  pobre_cosita_fea=loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  norman1.playing=true;
  pobre_cosita_fea.playing=true
  comer2.looping=false;
  pobre_cosita_fea.looping=false
  chiki=loadSound("sound1.mp3")
  cut=loadSound("rope_cut.mp3")
  triste=loadSound("sad.wav")
  eating=loadSound("eating_sound.mp3")
  ventisca=loadSound("rope_cut.mp3")

}

function setup() 
{
  createCanvas(500,700);
  frameRate(80);
  chiki.play();
  chiki.setVolume(0.5);
  engine = Engine.create();
  world = engine.world;
  butlon = createImg("cut_button.png")
  butlon.position(85,50);
  butlon.size(55,55);
  butlon.mouseClicked(drop);
  shhhhh=createImg("mute.png");
  shhhhh.position(240,20);
  shhhhh.size(50,50);
  shhhhh.mouseClicked(mute);
  ground = new Ground(200,680,600,20);
nieve= createSprite(310,600,101,101);
nieve.addImage(rabbit);
nieve.scale=0.2

globo=createImg("balloon.png")
//>_<
globo.position(-29,280);
globo.size(150,100);
globo.mouseClicked(airBlow)

  rope = new Rope(7,{x:105,y:30});
  fruit = Bodies.circle(200,300,20);
  Matter.Composite.add(rope.body,fruit);

  norman1.frameDelay=20;
  comer2.frameDelay=21;
  pobre_cosita_fea.frameDelay=20
  nieve.addAnimation("normal",norman1);
  
  nieve.addAnimation("comiendo",comer2);
  nieve.addAnimation("crying",pobre_cosita_fea)
  nieve.changeAnimation("normal");

  fruit_con = new Link(rope,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  imageMode(CENTER);
  
}

function draw() 
{
  background(51);

  image(bg_img,width/2,height/2,490,690);
  push();
  imageMode(CENTER);
  if(fruit != null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  
    }
    pop();
  rope.show();
  
  Engine.update(engine);
  ground.show();
  if(collide(fruit,nieve)===true){  
    nieve.changeAnimation("comiendo");
  eating.play();
  }

drawSprites();
 if (fruit != null && fruit. position.y>=650){
nieve.changeAnimation("crying");
chiki.stop();
triste.play();
fruit=null
 }
   
}
function drop (){
  rope.break();
  fruit_con.detach();
  fruit_con= null; 

}
function collide(body,sprite){

  if (body != null){
  //1771117717171717777171777
    var d=dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
    if (d<= 80){
      World.remove(engine.world,fruit);
      fruit=null;
      return true
    }
    else{
      return false 

    }
  }
 
}
function airBlow(){
Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.01,y:0})
ventisca.play();
}
function mute(){

if(chiki.isPlaying()){
chiki.stop()
}
else{
chiki.play();

}

}
