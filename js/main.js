import utils from "./utils";
const canvas = document.getElementById("stars");

function setCanvasSize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
setCanvasSize();

const ctx = canvas.getContext("2d");

addEventListener("resize", () => {
  setCanvasSize();
  init();
});

// the object
function Star(x, y, radius, color) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.velocity = 3;
}

Star.prototype.draw = function() {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
  ctx.fillStyle = this.color;
  ctx.fill();
  ctx.closePath();
};

Star.prototype.update = function() {
  this.draw();

  if (this.y + this.radius + this.velocity >= innerHeight) {
    this.velocity = -this.velocity * 0.8;
    this.shatter();
    this.radius -= 3;
  } else {
    this.velocity += 1;
  }

  this.y += this.velocity;
};

Star.prototype.shatter = function() {
  for (let i = 0; i < 8; i++) {
    miniStars.push(new MiniStar(this.x, this.y, 5, "red"));
  }
};

function MiniStar(x, y, radius, color) {
  Star.call(this, x, y, radius, color);
  this.velocity = {
    x: utils.randomIntFromRange(-5, 5),
    y: utils.randomIntFromRange(-15, 15)
  };
  this.friction = 0.8;
  this.gravity = 0.1;
  this.ttl = 100;
  this.opacity = 1;
}

MiniStar.prototype.draw = function() {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(255, 0, 0, ${this.opacity})`;
  ctx.fill();
  ctx.closePath();
};

MiniStar.prototype.update = function() {
  this.draw();

  if (this.y + this.radius + this.velocity.y >= innerHeight) {
    this.velocity.y = -this.velocity.y * this.friction;
  } else {
    this.velocity.y += this.gravity;
  }

  this.x += this.velocity.x;
  this.y += this.velocity.y;
  this.opacity -= 1 / this.ttl--;
};

function addStar() {
  let x = utils.randomIntFromRange(20, innerWidth - 20);
  let radius = utils.randomIntFromRange(10, 20);
  stars.push(new Star(x, 0, radius, "blue"));
}

// initialization
let stars;
let miniStars;
function init() {
  stars = [];
  miniStars = [];

  addStar();
  setInterval(addStar, 1000);
}

// the animation loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach((star, index) => {
    star.update();
    if (star.radius <= 0) {
      stars.splice(index, 1);
    }
  });
  miniStars.forEach((miniStar, index) => {
    miniStar.update();
    if (miniStar.ttl <= 0) {
      miniStars.splice(index, 1);
    }
  });
  requestAnimationFrame(animate);
}

init();
animate();
