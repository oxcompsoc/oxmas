var GRAVITY = 5;
var SNOW_NUMBER = 500;
var SNOW_SPREAD_FACTOR = 5;

function draw(context, time, deltaTime) {
  updateSnow(time, deltaTime);
  drawSnow(context, time, deltaTime);
}

var snow = []
var snowDepth = [];
for (var x = 0; x <= 601; x++) snowDepth.push(0);

function newSnowParticle(x) {
  return {cx: x, x: x,
             y: -400 * Math.random(), 
             dy: 0, 
             noise: Math.random() * Math.PI,
             radius: 1 + Math.random(),
             noise2: Math.random() * 5,
             resistance: GRAVITY * 0.2 * Math.random()};
}

for (var i = 0; i < SNOW_NUMBER; i++) {
  snow.push(newSnowParticle(Math.random() * 600));
}

function updateSnow(t, dt) {
  for (var i = 0; i < snow.length; i++) {
    if (snow[i].y >= 400 - snowDepth[Math.floor(snow[i].x)]) {
      for (var x = Math.max(0, Math.floor(snow[i].x - snow[i].radius * SNOW_SPREAD_FACTOR)); x <= Math.ceil(snow[i].x + snow[i].radius * SNOW_SPREAD_FACTOR) && x <= 600; x++) {
        var dx = (x - snow[i].x) / SNOW_SPREAD_FACTOR;
        var y2 = snow[i].radius * snow[i].radius - dx * dx;
        if (y2 >= 0) {
          snowDepth[x] += Math.sqrt(y2) / (SNOW_SPREAD_FACTOR * 4);
        }
      }
      snow[i] = newSnowParticle(Math.random() * 600);
      var s = -snow[i].y;
      var a = GRAVITY - snow[i].resistance;
      var t = Math.sqrt(2 * s / a);
      snow[i].dy = t * a
      snow[i].y = 0;
    }
  }
}

function drawSnow(context, time, deltaTime) {
  context.fillStyle = "white";
  for (var i = 0; i < snow.length; i++) {
    snow[i].dy += deltaTime * (GRAVITY - snow[i].resistance);
    snow[i].y += deltaTime * snow[i].dy;
    context.beginPath();
    snow[i].x = snow[i].cx + Math.sin(time + snow[i].noise) * snow[i].noise2;
    context.arc(snow[i].x, snow[i].y, snow[i].radius, 0, Math.PI * 2);
    context.fill();
  }

  context.beginPath();
  context.moveTo(0, 400);
  for (var x = 0; x <= 600; x++) {
    context.lineTo(x, 400 - snowDepth[x]);
  }
  context.lineTo(600, 400);
  context.fill();
}
    
startAnimation(document.getElementById("canvas"), draw);
