/* Functions */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function doubleAndShuffle(array) {
  array.push.apply(array,array);
  shuffleArray(array);
  return array;
}

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
    // console.log(!cards[i].matched)
    if (!cards[i].matched) {
      drawFaceDown(cards[i]);
    }
  }
}

function preloader(imagesToLoad, callback) {
  var preloadedImages = [];
  counter = 0;
  for (var i = 0; i < imagesToLoad.length; i++) {
    preloadedImages[i] = new Image();
    preloadedImages[i].onload = function() {
      counter++;
      if (counter==imagesToLoad.length) callback(doubleAndShuffle(preloadedImages));
    }
    preloadedImages[i].src = imagesToLoad[i];
  }
}

function imageSelector(availableImages, num) {
  // selects num images from availableImages
  selected = [];
  for (var i = 0; i < num; i++) {
    // select random image
    var randomIndex = Math.floor((Math.random()*availableImages.length));
    var imageSrc = availableImages[randomIndex];
    // place in selected array
    selected.push(imageSrc);
    // remove from availableImages so it's not selected again
    availableImages.splice(randomIndex,1);
  }
  return selected;
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
                  matched: false,
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
  var count = 0;
  var cardInds = []
  for (var i = 0; i < cards.length; i++) {
    if (cards[i].flipped && !cards[i].matched) {
      count++;
      cardInds.push(i);
      // console.log(cardInds[0]);
    }
  }
  if (count == 2 && cards[cardInds[0]].img == cards[cardInds[1]].img) {
    cards[cardInds[0]].matched = true;
    cards[cardInds[1]].matched = true;
    count = 0;
  } else if (count == 2) {
    // console.log("cardInds 1" + cardInds[0]);
    // console.log("cardInds 2" + cardInds[1]);
    // console.log("do they match? " + cards[cardInds[0]].img + cards[cardInds[1]].img);
    setTimeout(drawBoard, 750);
  }
  return count;
}

function flipCard(card) {
  flippedCards = countFlippedCards();
  if (card.flipped || flippedCards.length >= 2) {
    return;
  } else {
    drawFaceUp(card);
  }
  flippedCards = countFlippedCards();
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
// var flippedCards = [];
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
// console.log(selectedImages);
// startGame(selectedImages);
