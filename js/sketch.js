var timeout;
var fr;
var total = 0;
var img;
var container = document.getElementById('container');

function preload() {
  img = loadImage("hotslow.png");
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

setInterval(function(){
  var hotslow = loadImage("hotslow.png?v=" + Math.random());
}, 1)


document.getElementById('intense').addEventListener('click', function(e){
  e.preventDefault();
  container.style.display = 'none';
  clearTimeout(timeout);
  interval = setTimeout(function(){
    container.style.display = 'block';
  }, 3000)
});
