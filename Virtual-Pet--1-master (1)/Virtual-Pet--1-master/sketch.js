//Create variables here
var dog, hungrydog, happydog,feed,addFood;
var database;
var foodS, foodStock, food;
var feedPet, addFood;
var fedTime, lastFed;
var foodObj;

function preload(){
  hungrydog=loadImage("images/dogImg.png");
  happydog=loadImage("images/dogImg1.png")

}

function setup() {
	createCanvas(800, 700);
 
  database=firebase.database();
  console.log("database connected")

  foodObj=new Food();

  dog=createSprite(400,400,100,100)
  dog.addImage(hungrydog)
  dog.scale=0.5

  feed=createButton("Feed The Dog");
  feed.positon(700,95)
  feed.mousePressed(feedDog);

  addFood=createbutton("Add Food")
  addFood.position(800,95)
  addFood.mousePressed(addFoods)

  foodStock =database.ref("FOOD");
  foodStock.on("value",readStock);
  }



function draw() { 
  background(46,139,87);
  
  fedTime=database.ref('FED TIME');
  fedTime.on('value',function(data){
    lastfed=data.val();
  })

  fill(255,255,254)
  textSize(15);
  if(lastFed>=12) {
    text("Last Fed:"+ lastFed%12+"PM",350,30);
  }else if(lastFed===0) {
    text("Last Fed: 12 AM",350,30);
  }else{
    text("Last Fed;"+ lastFed+"AM",350,30);
  }


  foodObj.display();
   drawSprites();

  //add styles here

  strokeWeight(5)
  fill("red");
  text("FOOD REMAINING:"+foodS,150,50);
}
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS)
}
function writeStock (x) {
  if(x<=0){
    x=0
  }else{
    x=x-1
  }
  database.ref('/').update({
    FOOD:x
  })


}

function feedDog() {
  dog.addImage(happydog);

  if(foodObj.getFoodStock()<= 0){ 
    foodObj.updateFoodStock(foodObj.getFoodStock()*0); 
  }else{
     foodObj.updateFoodStock(foodObj.getFoodStock()-1); }
  database.ref('/').update({
    FOOD:foodObj.getFoodStock(),
    FEDTIME:hour()
})
}

function addFoods() {
  foodS++
  database.ref('/').update({

  })
}



