function Fire(x, y, r1=5, r2=10, angle) {
  this.pos = createVector(x, y);
  this.vel = p5.Vector.fromAngle(PI / 2 + angle)
  this.pos.x = x+random(-5, 5);
  this.pos.y = y+random(-5, 5);

  this.radius = random(r1, r2);

  this.fade = 255;
  this.g = random(100, 200); // Green color
  this.r = 255; // Red color

  this.dead = false;

  this.update = function() {
    this.pos.x += this.vel.x/2;
    this.pos.y += this.vel.y/2;
  }

  this.show = function() {
    push();
    translate(this.pos.x, this.pos.y);
    strokeWeight(0);
    fill(this.r, this.g, 0, this.fade);
    ellipse(0, 0, this.radius); // Actuall fire particle

    this.fade -= 3;
    this.r -= 3;
    this.g -= 3;
    this.radius += 0.3;
    pop();
  }
}
