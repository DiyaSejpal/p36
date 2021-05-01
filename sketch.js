var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var Feed, lastFed;

//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,500);


  foodObj = new Food();


  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
  

  FeedTheDog = createButton("Feed The Dog");
  FeedTheDog.position(300,95);
  FeedTheDog.mousePressed(feedDog);


}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  
 
  //write code to display text lastFed time here

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  var food_Stock_val = foodObj.getFoodStock();
  if(food_Stock_val <= 0){
    foodObj.updateFoodStock(food_Stock_val*0);
  }else{
    foodObj.updateFoodStock(food_Stock_val -1);
  }

  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })


}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })

}
