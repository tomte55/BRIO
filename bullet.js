function Bullet(x, y, angle, damage) {
  this.pos = createVector(x, y);
  this.vel = p5.Vector.fromAngle(PI / 2 + angle);
  this.r = 5;

  this.damage = damage;

  this.dead = false;

  this.update = function() {
    this.pos.x += -this.vel.x*10;
    this.pos.y += -this.vel.y*10;

    if (this.x > width || this.x < 0 || this.y > height || this.y < 0) {
      this.dead = true; // Remove bullet if outside window
    }
  }

  this.show = function() {
    push();
    if (debug.collider) {
      noFill();
      ellipse(this.pos.x, this.pos.y, this.r); // Sphere collider
    }
    fill(255, 200, 0);
    strokeWeight(0);
    rect(this.pos.x, this.pos.y, 5, 5); // Actuall bullet
    pop();
  }
}
