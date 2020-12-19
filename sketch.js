var database;
var dog,dogImg;
var happyDogImg;
var foodS,foodStock;
var feedButton,addButton;
var fedTime,lastFed;
var foodObj;

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

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  foodObj = new Milk(100,100,10,10);
  
  feedButton = createButton("Feed the pet");
  feedButton.position(650,95);
  feedButton.mousePressed(feedDog);

  addButton = createButton("Add Food");
  addButton.position(750,95);
  addButton.mousePressed(addFoods);
}

function draw(){
  background(46,139,87);

  foodObj.display();

  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  });

  fill(255,255,254);
  textSize(15);
  if(lastFed >= 12){
    text("Last Feed : "+ lastFed%12 + "PM",350,30);
  }
  else if(lastFed == 0){
    text("Last Feed : 12 AM",350,30);
  }
  else{
    text("Last Feed : "+ lastFed + "AM",350,30);
  }
  
  drawSprites();
  textSize(20);
  fill("green")
  stroke(255);
  text("STOCK: " + foodS,50,50);
}

function readStock(data){
  foodS = data.val();
  foodObj.FoodStock = foodS;
}

function writeStock(x){
  if(x <= 0){
    x = 0;
  }
  else{
    x--;
  }
  database.ref('/').update({
    Food:x
  });
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function feedDog(){
  dog.addImage(happyDogImg);

  foodObj.FoodStock--;
  database.ref('/').update({
    Food: foodObj.FoodStock,
    FeedTime: hour()
  })
}