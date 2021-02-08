const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.height = innerHeight;
canvas.width = innerWidth;

/// Varianles

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};
const colors = ["#00bdff", "#4d39ce", "#088eff"];

///Event Listeners

addEventListener("mousemove", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener("resize", () => {
  canvas.height = innerHeight;
  canvas.width = innerWidth;

  init();
});

///Utility Functions
function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function randomColors(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}
/// Pasrticles Onbject
function Particle(x, y, radius, color) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.radians = Math.random() * Math.PI * 2;
  this.velocity = 0.02;
  this.distanceFromCenter = randomIntFromRange(50, 120);
  this.lastMouse = {
    x: this.x,
    y: this.y,
  };
  this.update = () => {
    const lastpoint = {
      x: this.x,
      y: this.y,
    };
    //Move points over tiome
    this.radians += this.velocity;
    //Drag Efect
    this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
    this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;
    //Circular Motion
    this.x =
      this.lastMouse.x + Math.cos(this.radians) * this.distanceFromCenter;
    this.y =
      this.lastMouse.y + Math.sin(this.radians) * this.distanceFromCenter;

    this.draw(lastpoint);
  };
  this.draw = (lastpoint) => {
    ctx.beginPath();
    // ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    // ctx.fillStyle = this.color;
    // ctx.fill();
    // ctx.closePath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.radius;
    ctx.moveTo(lastpoint.x, lastpoint.y);
    ctx.lineTo(this.x, this.y);
    ctx.stroke();
    ctx.closePath();
  };
}

////Implementation

let particles;
function init() {
  particles = [];
  for (let i = 0; i < 20; i++) {
    const radius = Math.random() * 2 + 1;
    particles.push(
      new Particle(
        canvas.width / 2,
        canvas.height / 2,
        radius,
        randomColors(colors)
      )
    );
  }
  //   console.log(randomColors(colors));
}
function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = "rgba(255, 255 ,255 ,0.03)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  particles.forEach((particle) => {
    particle.update();
  });
}
init();
animate();
