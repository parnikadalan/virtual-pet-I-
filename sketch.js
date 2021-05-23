//Create variables here
var dog, dog1, dogImg, happydogImg, dogImg1;
var database
var foodS, foodStock

function preload() {
  //load images here
  dogImg = loadImage("dogImg.png")
  dogImg1 = loadImage("dogImg1.png")
}

function setup() {
  createCanvas(500, 500);

  dog = createSprite(250, 300, 150, 150);
  dog.addImage("dog", dogImg);
  dog.addImage("dog1", dogImg1)
  dog.scale = 0.2

  database = firebase.database()

  foodStock = database.ref('Food')
  foodStock.on("value", readStock)
}


function draw() {
  background("yellow")

  if (keyWentDown(UP_ARROW)) {
    writeStock(foodS)
    dog.changeImage("dog1", dogImg1)
  }
  drawSprites();
  //add styles here
  text("food left: " + foodS, 150, 150)
  text("press UP_ARROW key to feed drago milk!", 150, 200)
  fill(0)

}

function readStock(data) {
  foodS = data.val()

}

function writeStock(x) {

  if (x <= 0) {
    x = 0;
  } else {
    x = x - 1
  }
  database.ref('/').update({
    Food: x
  })
}

