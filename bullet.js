function Bullet(x, y, v1, v2) {

  this.x = x;
  this.y = y;

  this.vector = [v1, v2];

  this.dead = false;

  this.update = function() {
    this.x += this.vector[0];
    this.y += this.vector[1];

    if (this.x > width || this.x < 0 || this.y > height || this.y < 0) {
      this.dead = true;
    }
  }

  this.show = function() {
    fill(255, 200, 0);
    strokeWeight(0);
    rect(this.x, this.y, 5, 5);
    strokeWeight(2);
    fill(255);
  }

}
