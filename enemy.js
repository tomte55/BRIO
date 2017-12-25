function Enemy() {
  this.x = random(width);
  this.y = random(height);
  this.bearing = 0;
  this.r = 20;

  this.health = 100;
  this.dead = false;

  this.update = function() {
    // Ai

  }

  this.show = function() {
    this.targetX = player.x;
    this.targetY = player.y;
    this.bearing = PI / 2 + atan2(player.y-this.y, player.x-this.x);
    // Main player
    push();
    stroke(0);
    translate(this.x, this.y);
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
