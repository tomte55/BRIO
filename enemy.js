function Enemy() {
  this.pos = createVector(random(width), random(height));
  this.bearing = 0;
  this.r = 20;

  this.health = 100;
  this.dead = false;

  this.update = function() {
    // Ai
    this.targetX = player.pos.x;
    this.targetY = player.pos.y;
    this.bearing = PI / 2 + atan2(player.pos.y-this.pos.y, player.pos.x-this.pos.x);
  }

  this.show = function() {
    // Main player
    push();
    stroke(0);
    translate(this.pos.x, this.pos.y);
    rotate(this.bearing);
    if (debug.collider) {
      noFill();
      ellipse(0, 0, this.r) // Sphere Collider
    }
    fill(this.health, this.health, this.health);
    triangle(0, -15, 15, 15, -15, 15); // Actuall enemy
    pop();
  }
}
