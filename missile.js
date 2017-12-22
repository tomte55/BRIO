function Missile(x, y, angle, damage) {
  this.pos = createVector(x, y);
  this.vel = p5.Vector.fromAngle(PI / 2 + angle);
  this.r = 8;

  this.damage = damage;
  this.dead = false;
  this.health = 50;

  this.update = function() {
    this.pos.x += -this.vel.x*5;
    this.pos.y += -this.vel.y*5;

    this.vel = p5.Vector.fromAngle(PI / 2 + this.targetAngle);

    this.targetAngle = PI / 2 + atan2(player.y-this.pos.y, player.x-this.pos.x);

    if (this.x > width || this.x < 0 || this.y > height || this.y < 0) {
      this.dead = true;
    }
  }

  this.show = function() {
    push();
    stroke(255, 0, 0, 50);
    line(this.pos.x, this.pos.y, player.x, player.y);
    translate(this.pos.x, this.pos.y);
    rotate(this.targetAngle);
    stroke(0);
    fill(255);
    if (debug) {
      ellipse(0, 0, this.r);
    }
    rect(0, 0, 5, 15);
    pop();
  }
}
