var database;
var dog,dogImg;
var happyDog,happyDogImg;
var foodS,foodStock;

function preload(){
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500,500);

  database = firebase.database();

  dog = createSprite(300,400,10,10);
  dog.addImage(dogImg);
  dog.scale = 0.2;

  foodStock = database.ref('food');
  foodStock.on("value", readStock);
  
}


function draw() {  
  background(46,139,87);
  
  if(keyDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }

  drawSprites();
  textSize(20);
  fill("green")
  stroke(255);
  text("STOCK: " + foodS,50,50);
  text("Press UP ARROW key to feed",100,250);
}

function readStock(data){
  foodS = data.val();

  if(x<=0){
    x=0;
  }
  else{
    x--;
  }
}

function writeStock(x){
  database.ref('/').update({
    Food:x
  })
}