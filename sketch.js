var database;
var dog,dogImg;
var happyDogImg;
var foodS,foodStock;
var feedButton,addButton;
var fedTime,lastFed;
var foodObj;
var bedroom,garden,washroom;
var gameState,readGS,writeGS;
var currentTime;

function preload(){
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
  bedroom = loadImage("images/Bed Room.png");
  garden = loadImage("images/Garden.png");
  washroom = loadImage("images/Wash Room.png");
}

function setup(){
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

  readGS = database.ref('GameState');
  readGS.on("value",function(data){
    gameState = data.val();
  });
  
  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  });
}

function draw(){
  currentTime = hour();
  if(currentTime === lastFed + 1){
    updateState("playing");
    background(garden);
  }
  else if(currentTime === lastFed + 2){
    updateState("bathing");
    background(washroom);
  }
  else if(currentTime > lastFed + 2 && currentTime <= lastFed + 4){
    updateState("sleeping");
    background(bedroom);
  }
  else{
    if(currentTime > lastFed + 4){
    updateState("hungry");
    dog.addImage(dogImg);
    }
    dog.visible = true;
    foodObj.display();
  }

  if(gameState != "hungry"){
    dog.visible = false;
    feedButton.hide();
    addButton.hide();
  }
  else{
    dog.visible = true;
    feedButton.show();
    addButton.show();
  }
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
    FeedTime: hour(),
    GameState: "fed"
  })
}

function updateState(state){
  database.ref('/').update({
    GameState: state
  })
}