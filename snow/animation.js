var startTime = null;
var lastTime = null;

function scale() {
  if ("devicePixelRatio" in window) {
    return window.devicePixelRatio;
  }
  return 1;
}

function startAnimation(canvas, callback) {
  canvas.width = scale() * 600;
  canvas.height = scale() * 400;
  canvas.style.width = "600px";
  canvas.style.height = "400px";
  lastTime = startTime = new Date();
  redrawFrame(canvas, callback)();
}

function redrawFrame(canvas, callback) {
  return function(dt) {
    var context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.save();
    context.scale(scale(), scale());
    var t = new Date();
    callback(context, (t - startTime) / 1000, (t - lastTime) / 1000);
    context.restore();
    lastTime = t;
    window.requestAnimationFrame(redrawFrame(canvas, callback));
  }
}
