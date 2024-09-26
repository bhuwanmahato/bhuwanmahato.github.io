let particles = [];

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("heroSketch");
  for (let i = 0; i < 100; i++) {
    particles.push(new Particle());
  }
}

function draw() {
  //background(30, 30, 50);
  for (let particle of particles) {
    let mouse = createVector(mouseX, mouseY);
    particle.update(mouse);
    particle.show();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(random(-1, 1), random(-1, 1));
    this.size = random(3, 8);
    this.color = color(
      random(100, 255),
      random(100, 255),
      random(200, 255),
      150
    );
  }

  update(mouse) {
    let acc = p5.Vector.sub(mouse, this.pos);
    acc.setMag(0.1);
    this.vel.add(acc);
    this.vel.limit(4);
    this.pos.add(this.vel);
    this.edges();
  }

  show() {
    noStroke();
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, this.size);
  }

  edges() {
    if (this.pos.x < 0 || this.pos.x > width) this.vel.x *= -1;
    if (this.pos.y < 0 || this.pos.y > height) this.vel.y *= -1;
  }
}
