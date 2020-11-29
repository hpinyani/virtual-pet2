//Create variables here
var dog, dogImg, happyDog, database, foodS, foodStock;
var feed, addFood;
var fedTime, lastFed;
var foodObj;

function preload()
{
dogImg = loadImage("images/dogImg.png");
happyDog = loadImage("images/dogImg1.png")
}

function setup() {
  database = firebase.database();
  createCanvas(1000, 500);
  foodObj=new Food()

  dog = createSprite(800,220,150,150)
  dog.addImage(dogImg);
  dog.scale = 0.15;

  feed = createButton("Feed the Dog")
  feed.position(700,95)
  feed.mousePressed(feedDog)

  addFood = createButton("Add Food")
  addFood.position(800,95)
  addFood.mousePressed(addFoods)
}


function draw() {  
  background("green");
    fedTime = database.ref("FeedTime")
    fedTime.on("value",function(data){
      lastFed=data.val();
    }) 
    textSize(20);
    fill(255)
    if(lastFed>=12){
      text("Last Feed:",+lastFed%12+"PM",350,30)
    }else if(lastFed==0){
      text("LastFeed:12AM",350,30)
    }else{
      text("Last Feed:"+lastFed+"AM",350,30)
    }
  foodObj.display()
  drawSprites();
  //add styles here
  
}
function readStock(data){
  foodS=data.val()
  foodObj.updateFoodStock(foodS)
}
function feedDog(){
  dog.addImage(happyDog);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  database.ref('/').update({
  Food:foodObj.getFoodStock(),
  FeedTime:hour()  
  })
}
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
