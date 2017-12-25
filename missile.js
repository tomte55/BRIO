function Missile(x, y, angle, damage) {
  this.pos = createVector(x, y);
  this.vel = p5.Vector.fromAngle(PI / 2 + angle);
  this.r = 8;

  this.damage = damage;
  this.dead = false;
  this.health = 50;
  this.speed = 6;

  this.lifeLength = 0;

  this.update = function() {
    if (this.lifeLength > 30) { // Make it wait some time before flying
      this.pos.x += -this.vel.x*this.speed;
      this.pos.y += -this.vel.y*this.speed;
      this.released = true;
    }

    if (!player.dead) {
      this.vel = p5.Vector.fromAngle(PI / 2 + this.targetAngle); // Set velocity towards player
    }

    this.targetAngle = PI / 2 + atan2(player.pos.y-this.pos.y, player.pos.x-this.pos.x); // Set angle in the opposite direction of travel to fire particles

    if (this.pos.x < 0 || this.pos.x > width ||this.pos.y < 0 || this.pos.y > height) {
      this.explode();
    }
    fires.push(new Fire(this.pos.x, this.pos.y, 5, 10, this.targetAngle)); // Spawn fire particles
    this.lifeLength ++;
  }

  this.show = function() {
    push();
    stroke(255, 0, 0, 50);
    if (!player.dead) {
      line(this.pos.x, this.pos.y, player.pos.x, player.pos.y); // Laser that point to player
    }
    translate(this.pos.x, this.pos.y);
    rotate(this.targetAngle);
    stroke(0);
    fill(255);
    rect(0, 0, 5, 15); // Actuall missile
    if (debug.collider) {
      noFill();
      ellipse(0, 0, this.r); // Collider sphere
    }
    pop();
  }

  this.explode = function() {
    explosions.push(new Explosion(this.pos.x, this.pos.y)); // Spawn explosion effect
    this.dead = true; // And kill the missile
  }
}
