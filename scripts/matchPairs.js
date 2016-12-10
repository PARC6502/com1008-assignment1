// function draw(context) {
//   var img = new Image();
//   img.onload = function() {
//     context.drawImage (img,50,50);
//   }
//   img.src = "../images/logo.svg";
// }
//
// var canvas = document.getElementById('match-pairs-canvas');
// var context = canvas.getContext("2d");
//
// draw(context);
function loadImages(context, fileNames, callback) {
  var preloadedImages = [];
  counter = 0;
  for (var i = 0; i < imageArray.length; i++) {
    preloadedImages[i] = new Image();
    preloadedImages[i].onload = function() {
      counter++;
      if (counter==fileNames.length) callback(preloadedImages);
    }
    preloadedImages[i].src = fileNames[i];
  }
}

var Card = function(x, y) {
  this.x = x;
  this.y = y;
  this.width = 70;
}

Card.prototype.drawFaceDown = function(context, img) {
  context.drawImage(img, this.x, this.y, this.width, this.width);
}

Card.prototype.drawFaceUp = function() {
  context.drawImage(this.face, this.x, this.y, this.width, this.width);
}

var canvas = document.getElementById('match-pairs-canvas');
var context = canvas.getContext("2d");

var cards = [];
var fileNames = ["../images/cat.png",
                "../images/dog.png",
                "../images/elephant.png",
                "../images/giraffe.png",
                "../images/hamster.png",
                "../images/monkey.png",
                "../images/parrot.png",
                "../images/penguin.png",
                "../images/rhino.png",
                "../images/turtle.png",
                "../images/ant.png",
                "../images/cricket.png",
                "../images/dragon_fly.png",
                "../images/ladybug.png",
                "../images/mantis.png"];

var COLS = 3;
var ROWS = 5;
for (var i = 0; i < COLS; i++) {
  for (var j = 0; j < ROWS; j++) {
    cards.push(new Card(i*78 + 10, j*78 + 40));
  }
}
var logo = new Image();
logo.src = "../images/logo.svg";
logo.onload = function() {
  for (var i = 0; i < cards.length; i++) {
    cards[i].drawFaceDown(context, logo)
  }
}
