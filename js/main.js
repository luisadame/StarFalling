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
  this.velocity = {
    x: utils.randomIntFromRange(-4, 4),
    y: 3
  };
  this.glow = 10;
}

Star.prototype.draw = function () {
  ctx.save()
  ctx.beginPath();
  ctx.shadowBlur = this.glow;
  ctx.shadowColor = this.color;
  ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
  ctx.fillStyle = this.color;
  ctx.fill();
  ctx.closePath();
  ctx.restore();
};

Star.prototype.update = function () {
  this.draw();

  if (this.y + this.radius + this.velocity.y >= innerHeight) {
    this.velocity.y = -this.velocity.y * 0.8;
    this.shatter();
    this.radius -= 3;
    this.glow -= 2;
  } else {
    this.velocity.y += 1;
  }

  this.y += this.velocity.y;
  this.x += this.velocity.x;
};

Star.prototype.shatter = function () {
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
  this.gravity = 0.2;
  this.ttl = 100;
  this.opacity = 1;
}

MiniStar.prototype.draw = function () {
  ctx.save();
  ctx.beginPath();
  ctx.shadowBlur = this.glow;
  ctx.shadowColor = this.color;
  ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
  ctx.fill();
  ctx.closePath();
  ctx.restore();
};

MiniStar.prototype.update = function () {
  this.draw();

  if (this.y + this.radius + this.velocity.y >= innerHeight) {
    this.velocity.y = -this.velocity.y * this.friction;
  } else {
    this.velocity.y += this.gravity;
  }

  this.x += this.velocity.x;
  this.y += this.velocity.y;
  this.opacity -= 1 / this.ttl--;
  this.glow -= 10 / this.ttl;
};

function addStar() {
  let x = utils.randomIntFromRange(20, innerWidth - 20);
  let radius = utils.randomIntFromRange(10, 20);
  stars.push(new Star(x, 0, radius, 'white'));
}

function addMountainRange(amount, height, color) {
  const mountainWidth = canvas.width / amount || 1;
  for (let i = 0; i < amount; i++) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.moveTo(0, canvas.height);
    ctx.lineTo(mountainWidth, canvas.height);
    ctx.lineTo(mountainWidth / 2, canvas.height - height);
    ctx.fill();
    ctx.closePath();
  }
}

// initialization
let stars;
let miniStars;
let backgroundStyle = ctx.createLinearGradient(0, 0, 0, canvas.height);
backgroundStyle.addColorStop(0, '#002C52');
backgroundStyle.addColorStop(1, '#001152');

function init() {
  stars = [];
  miniStars = [];

  addStar();
  setInterval(addStar, 1000);
}

// the animation loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Add background to the scene
  ctx.fillStyle = backgroundStyle;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Add mountains
  addMountainRange(1, 300, '#142533');

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
