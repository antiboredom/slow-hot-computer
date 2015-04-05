var timeout;
var fr;
var total = 0;
var img;
var container = document.getElementById('container');

function preload() {
  img = loadImage("hotslow.png");
  addImage();
}

function setup() {
  createCanvas(displayWidth, displayHeight);
  imageMode(CENTER);
}

function draw() {
  fr = frameRate();

  if (fr > 0) {
    total += 10;
  }

  for (var i = 0; i < total; i ++){
    var sz = random(1, width);
    image(img, random(0, width), random(0, height), sz, sz);
  }
}

var totalWorkers = 15;
var workers = [];

for (var i = 0; i < totalWorkers; i ++){
  var worker = new Worker('/js/worker.js');
  worker.addEventListener('message', function(e){
    worker.postMessage(Math.random()*10000);
  });
  worker.postMessage(1000);
  workers.push(worker);
}

var totalImages = 0;

function addImage(){
  var img = document.createElement('img');
  img.src = "http://slow-hot-computer.s3.amazonaws.com/hotslow.png?v=" + Math.random();
  // img.style.position = 'absolute'
  // img.style.top = '0'
  // img.style.left = '0'
  // if (totalImages < 100) {
  //   document.body.appendChild(img);
  //   totalImages++;
  // }
  setTimeout(addImage, 100);
}


document.getElementById('intense').addEventListener('click', function(e){
  e.preventDefault();
  container.style.display = 'none';
  clearTimeout(timeout);
  interval = setTimeout(function(){
    container.style.display = 'block';
  }, 3000)
});
