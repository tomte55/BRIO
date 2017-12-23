function Fire(x, y, r1=5, r2=10) {
  this.pos = createVector(x, y);
  this.pos.x = x+random(-5, 5);
  this.pos.y = y+random(-5, 5);

  this.radius = random(r1, r2);

  this.fade = 255;
  this.g = random(100, 200);
  this.r = 255;

  this.show = function() {
    push();
    translate(this.pos.x, this.pos.y);
    strokeWeight(0);
    fill(this.r, this.g, 0, this.fade);
    ellipse(0, 0, this.radius);
    this.fade -= 3;

    this.r -= 3;
    this.g -= 3;
    this.radius += 0.1;
    pop();
  }
}
