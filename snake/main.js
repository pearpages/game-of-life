const SPEED = 10;
const CANVAS_OPTIONS = {
  cols: 50,
  rows: 50,
  id: 'canvas',
  resolution: 10,
  bgColor: '#3e4444'
};

main();

function main() {
  const snake = new Snake(document.body, CANVAS_OPTIONS);
  setInterval(() => {
    snake.update();
    draw([
      snake.show.bind(snake)
    ]);
  }, SPEED);
}

function draw(cbs) {
  deleteCanvas();
  const context = createCanvas();
  cbs.forEach(cb => cb(context));
}

function keyPressed({keyCode}, direction ) {
  if (keyCode == 38 ) { // UP
    direction(0, -1);
  } else if (keyCode == 40 ) { // DOWN
    direction(0, 1);
  } else if (keyCode == 37 ) { // LEFT
    direction(-1, 0);
  } else if (keyCode == 39 ) { // RIGHT
    direction(1, 0);
  }
}

function constrain(value, min, max) {
  if (value <= min) {
    return min;
  } else if (value >= max) {
    return max;
  }
  return value;
}

function Snake(body, {resolution, cols, rows}) {
  this.x = 0;
  this.y = 0;
  this.xspeed = 1;
  this.yspeed = 0;

  body.onkeydown = event => keyPressed(event, this.direction.bind(this));

  this.update = function(maxX = cols, maxY = rows, scale = resolution) {
    this.x = constrain(this.x + this.xspeed, 0, (maxX * scale) - scale);
    this.y = constrain(this.y + this.yspeed, 0, (maxY * scale) - scale);
  }

  this.show = function(context, snakeColor = '#FFF', scale = resolution) {
    context.fillStyle = snakeColor;
    context.fillRect(this.x, this.y, scale, scale);
  }

  this.direction = function(x, y) {
    this.xspeed = x;
    this.yspeed = y;
  }
}

function createCanvas({ cols, rows, id, resolution, bgColor } = CANVAS_OPTIONS) {
  const canvas = document.createElement(id);
  canvas.width = cols * resolution;
  canvas.height = rows * resolution;
  document.body.append(canvas);
  background(canvas, bgColor);
  return context = canvas.getContext('2d');
}

function background(canvas, color) {
  const context = canvas.getContext('2d');
  context.fillStyle = color;
  context.fillRect(0, 0, canvas.width, canvas.height);
}

function deleteCanvas({id} = CANVAS_OPTIONS) {
  !!document.querySelector(id)
    ? document.querySelector(id).remove()
    : 0;
}