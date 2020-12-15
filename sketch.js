//Create variables here
var dog, happyDog, database, foodStock, food;
var dogImg, dogImg1;
function preload()
{
  //load images here
  dogImg = loadImage("images/Dog.png");
  dogImg1 = loadImage("images/happydog.png");
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();

  dog = createSprite(250,250,100,100);
  dog.addImage(dogImg);
  dog.scale = 0.3;

  foodStock = database.ref('food')
  foodStock.on("value", readStock)
}


function draw() {  
  background(46,139,87)
  drawSprites();
  //add styles here
  if(keyWentDown(UP_ARROW))
  {
    writeStock();
    dog.addImage(dogImg1);
  }
  textSize(20);
  fill(255);
  text("Remaining Food:" + food, 200,100)
}

function readStock(data)
{
  food = data.val();
}

function writeStock()
{
  if(food <= 0)
  {
    food = 0;
  }
  else
  {
    food = food - 1
  }
  database.ref('/').update({
    'food': food
  })

}