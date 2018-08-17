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
  this.friction = 0.8;
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

  // Bounce on the floor
  if (this.y + this.radius + this.velocity.y >= innerHeight - floorHeight) {
    this.velocity.y = -this.velocity.y * this.friction;
    this.shatter();
    this.radius -= 4;
    this.glow -= 2;
  } else {
    this.velocity.y += 1;
  }

  // Bounce on the sides
  if (this.x + this.radius + this.velocity.x >= canvas.width ||
    this.x - this.radius <= 0) {
    this.velocity.x = -this.velocity.x * this.friction;
  }

  this.y += this.velocity.y;
  this.x += this.velocity.x;
};

Star.prototype.shatter = function () {
  for (let i = 0; i < 8; i++) {
    miniStars.push(new MiniStar(this.x, this.y, 5, 'white'));
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

  if (this.y + this.radius + this.velocity.y >= innerHeight - floorHeight) {
    this.velocity.y = -this.velocity.y * this.friction;
  } else {
    this.velocity.y += this.gravity;
  }

  this.x += this.velocity.x;
  this.y += this.velocity.y;
  this.opacity -= this.opacity / this.ttl;
  this.glow -= this.glow / this.ttl;
  this.radius -= this.radius / this.ttl;
  this.ttl--;
};

function addStar() {
  let x = utils.randomIntFromRange(20, canvas.width - 20);
  let radius = utils.randomIntFromRange(10, 20);
  stars.push(new Star(x, -100, radius, 'white'));
}

function addMountainRange(amount, height, color) {
  const mountainWidth = canvas.width / amount || 1;
  for (let i = 0; i < amount; i++) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.moveTo(i * mountainWidth, canvas.height);
    ctx.lineTo(i * mountainWidth + mountainWidth + 325, canvas.height);
    ctx.lineTo(i * mountainWidth + mountainWidth / 2, canvas.height - height);
    ctx.lineTo(i * mountainWidth - 325, canvas.height);
    ctx.fill();
    ctx.closePath();
  }
}

function addFloor() {
  ctx.beginPath();
  ctx.fillStyle = "#262626";
  ctx.fillRect(0, canvas.height, canvas.width, -floorHeight);
  ctx.fill();
  ctx.closePath();
}

// initialization
let stars;
let miniStars;
let ticker = 0;
let randomSpawnRate = 75;
let starredBackground;
let floorHeight = 60;
let backgroundStyle = ctx.createLinearGradient(0, 0, 0, canvas.height);
backgroundStyle.addColorStop(0, '#171e26');
backgroundStyle.addColorStop(1, '#3f586b');

function init() {
  stars = [];
  miniStars = [];
  starredBackground = [];
  for (let i = 0; i < 150; i++) {
    let x = utils.randomIntFromRange(5, canvas.width - 5),
      y = utils.randomIntFromRange(5, canvas.height - 400),
      radius = utils.randomIntFromRange(1, 7);
    starredBackground.push(new Star(x, y, radius, 'white'));
  }
}

// the animation loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Add background to the scene
  ctx.fillStyle = backgroundStyle;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Add background stars
  starredBackground.forEach(star => star.draw());

  // Add mountains
  addMountainRange(1, canvas.height - 50, '#384551');
  addMountainRange(2, canvas.height - 100, '#2B3843');
  addMountainRange(3, canvas.height - 300, '#26333E');

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

  // Add floor
  addFloor();

  ticker++;

  if (ticker % randomSpawnRate == 0) {
    addStar();
    randomSpawnRate = utils.randomIntFromRange(75, 200);
  }

  requestAnimationFrame(animate);
}

init();
animate();
