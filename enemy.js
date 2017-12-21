function Enemy() {
  this.x = 700;
  this.y = 300;
  this.bearing = 0;



  this.show = function() {
    this.targetX = player.x;
    this.targetY = player.y;
    this.bearing = PI / 2 + atan2(player.y-this.y, player.x-this.x);
    // Main player
    push();
    stroke(0, 0, 255, 150);
    line(this.x, this.y, this.targetX, this.targetY);
    stroke(0);
    translate(this.x, this.y);
    rotate(this.bearing);
    if (debug) {
      ellipse(0, 0, this.r) // Sphere Collider
    }
    triangle(0, -15, 15, 15, -15, 15);
    pop();
  }

}
