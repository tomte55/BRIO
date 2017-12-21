function Bullet(x, y, angle) {

  this.pos = createVector(x, y);
  this.vel = p5.Vector.fromAngle(PI / 2 + angle);

  this.dead = false;

  this.update = function() {
    this.pos.x += -this.vel.x*10;
    this.pos.y += -this.vel.y*10;

    if (this.x > width || this.x < 0 || this.y > height || this.y < 0) {
      this.dead = true;
    }
  }

  this.show = function() {
    fill(255, 200, 0);
    strokeWeight(0);
    rect(this.pos.x, this.pos.y, 5, 5);
    strokeWeight(2);
    fill(255);
  }

}
