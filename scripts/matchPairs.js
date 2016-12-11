/* Functions */
function drawFaceDown(card) {
  context.fillStyle = "#e06666";
  context.fillRect(card.x, card.y, card.width, card.width);
  context.drawImage(faceDown, card.x, card.y, card.width, card.width);
  card.flipped = false;
}

function drawFaceUp(card) {
  context.fillStyle = "#e06666";
  context.fillRect(card.x, card.y, card.width, card.width);
  context.drawImage(card.img, card.x, card.y, card.width, card.width);
  card.flipped = true;
}

function drawBoard() {
  for (var i = 0; i < cards.length; i++) {
    drawFaceDown(cards[i]);
  }
}

function preloader(imagesToLoad, callback) {
  var preloadedImages = [];
  counter = 0;
  for (var i = 0; i < imagesToLoad.length; i++) {
    preloadedImages[i] = new Image();
    preloadedImages[i].onload = function() {
      counter++;
      if (counter==imagesToLoad.length) callback(preloadedImages);
    }
    preloadedImages[i].src = imagesToLoad[i];
  }
}

function imageSelector(availableImages, num) {
  // selects num images from availableImages
  selected = [];
  for (var i = 0; i < num; i++) {
    // select random image
    var randomIndex = Math.floor(Math.random(availableImages.length));
    var image = availableImages[randomIndex];
    // place 2 copies in array
    selected.push(image);
    selected.push(image);
    // remove from array
    availableImages.splice(randomIndex,1);
  }
  return selected.sort(function(){
    return 0.5 - Math.random();
  });
}

function generateCards(images) {
  var imageWidth;
  if (canvas.width > canvas.height) {
    imageWidth = canvas.height/(rows+1);
  } else {
    imageWidth = canvas.width/(cols+1);
  }
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      cards.push({img: images.pop(),
                  x: i*(canvas.width/cols) + 10,
                  y: j*(canvas.height/rows) + 40,
                  flipped: false,
                  width: imageWidth});
    }
  }
}

function getMouseXY(evt) {
  var boundingRect = canvas.getBoundingClientRect();
  var offsetX = boundingRect.left;
  var offsetY = boundingRect.top;
  var w = ( boundingRect.width - canvas.width )/2;
  var h = ( boundingRect.height - canvas.height )/2;
  offsetX += w;
  offsetY += h;

  var mx =  Math.round ( evt.clientX - offsetX );
  var my =  Math.round ( evt.clientY - offsetY );
  console.log(mx + ", " + my);
  return {x: mx, y: my};
}

function countFlippedCards() {
  count = 0;
  for (var i = 0; i < cards.length; i++) {
    if (cards[i].flipped) {count++;}
  }
  return count;
}

function flipCard(card) {
  flippedCards = countFlippedCards();
  if (card.flipped) {
    return;
  } else if  (flippedCards >= 2) {
    drawBoard();
    drawFaceUp(card);
  } else {
    drawFaceUp(card);
  }

}

function cardUnderMouse(evt) {
  var pos = getMouseXY(evt);
  for (var i = 0; i < cards.length; i++) {
    var x0 = cards[i].x;
    var x1 = cards[i].x + cards[i].width;
    var y0 = cards[i].y;
    var y1 = cards[i].y + cards[i].width;
    if (pos.x >= x0 && pos.x <= x1 && pos.y >= y0 && pos.y <= y1) {
      flipCard(cards[i]);
    }
  }
}
function resizeCanvas() {
  console.log("width: " + window.innerWidth + "height: " + window.innerHeight);
  canvas.setAttribute("width", window.innerWidth*0.8);
  canvas.setAttribute("height", window.innerHeight*0.8);
}

function startGame(images) {
  generateCards(images);
  drawBoard();
  canvas.addEventListener('click', function(evt) {
    cardUnderMouse(evt);
  });
}

/* Variables */
var canvas = document.getElementById('match-pairs-canvas');
var context = canvas.getContext("2d");
var cols = 3;
var rows = 4;
// var cols = 3;
// var rows = 4;

var availableImages = ["../images/cat.png",
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

var selectedImages = imageSelector(availableImages, (cols*rows)/2 );
var cards =  [];
var faceDown = new Image();
faceDown.src = "../images/logo.svg";

/* Main program body */
resizeCanvas();
// if (canvas.width > canvas.height) {
//   cols = 4;
//   rows = 3;
// } else {
//   cols = 3;
//   rows = 4;
// }
window.addEventListener('resize', resizeCanvas);
console.log("cols: " + cols + ", rows: " + rows);
preloader(selectedImages, startGame);




// // function draw(context) {
//   // var img = new Image();
// //   img.onload = function() {
// //     context.drawImage (img,50,50);
// //   }
// //   img.src = "../images/logo.svg";
// // }
// //
// // var canvas = document.getElementById('match-pairs-canvas');
// // var context = canvas.getContext("2d");
// //
// // draw(context);
// function loadImages(context, fileNames, callback, cols, rows, cards) {
//   var preloadedImages = [];
//   counter = 0;
//   for (var i = 0; i < imageArray.length; i++) {
//     preloadedImages[i] = new Image();
//     preloadedImages[i].onload = function() {
//       counter++;
//       if (counter==fileNames.length) callback(cols, rows, cards, preloadedImages);
//     }
//     preloadedImages[i].src = fileNames[i];
//   }
// }
//
// function selectImages(filenames) {
//   selected = [];
//   for (var i = 0; i < 12; i++) {
//     // select random image
//     var randomIndex = floor(random(filenames.length));
//     var face = filenames[randomIndex];
//     // place 2 copies in array
//     selected.push(face);
//     selected.push(face);
//     // remove from array
//     filenames.splice(randomIndex,1);
//   }
//   return selected.sort(function(){
//     return 0.5 - random();
//   });
// }
//
// var Card = function(x, y, face) {
//   this.x = x;
//   this.y = y;
//   this.face = face;
//   this.width = 70;
// }
//
// Card.prototype.drawFaceDown = function(context, img) {
//   context.drawImage(img, this.x, this.y, this.width, this.width);
// }
//
// Card.prototype.drawFaceUp = function(context) {
//   context.drawImage(this.face, this.x, this.y, this.width, this.width);
// }
//
// function generateCards(cols, rows, cards, selectedFaces) {
//   for (var i = 0; i < COLS; i++) {
//     for (var j = 0; j < ROWS; j++) {
//       cards.push(new Card(i*100 + 10, j*80 + 40, selectedFaces.pop() ));
//     }
//   }
// }
//
// var canvas = document.getElementById('match-pairs-canvas');
// var context = canvas.getContext("2d");
//
//
// var fileNames = ["../images/cat.png",
//                 "../images/dog.png",
//                 "../images/elephant.png",
//                 "../images/giraffe.png",
//                 "../images/hamster.png",
//                 "../images/monkey.png",
//                 "../images/parrot.png",
//                 "../images/penguin.png",
//                 "../images/rhino.png",
//                 "../images/turtle.png",
//                 "../images/ant.png",
//                 "../images/cricket.png",
//                 "../images/dragon_fly.png",
//                 "../images/ladybug.png",
//                 "../images/mantis.png"];
//
// var COLS = 3;
// var ROWS = 4;
// var cards = [];
// selectedFaces = selectImages(fileNames);
// loadImages(context, selectedFaces, generateCards, COLS, ROWS, cards);
// for (var i = 0; i < cards.length; i++) {
//     cards[i].drawFaceUp(context);
//   }
//
// var logo = new Image();
// logo.src = "../images/logo.svg";
//
// // logo.onload = function() {
// //   for (var i = 0; i < cards.length; i++) {
// //     cards[i].drawFaceUp(context);
// //   }
// // }
