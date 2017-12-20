function Player() {
  this.x = width/2;
  this.y = height/2;
  this.r = 25;

  this.moveSpeed = 5;
  this.stamina = 100;

  this.update = function() {

    if (keyIsDown(16)) {
      if (this.stamina > 0) {
        this.moveSpeed = 10;
        this.stamina -= 2;
      } else {
        this.moveSpeed = 5;
      }
    } else {
      this.moveSpeed = 5;
      if (this.stamina < 100) {
        this.stamina += 1;
      }
    }

    // Walk up
    if (keyIsDown(87)) { this.y -= this.moveSpeed; }

    // Walk down
    if (keyIsDown(83)) { this.y += this.moveSpeed; }

    // Walk right
    if (keyIsDown(68)) { this.x += this.moveSpeed; }

    // Walk left
    if (keyIsDown(65)) { this.x -= this.moveSpeed; } }

    this.show = function() {
      ellipse(this.x, this.y, this.r);
      fill(0, 180, 255);
      rect(width/2, 900, this.stamina*8, 30);
      if (dist(this.x, this.y, pistol.x, pistol.y) < 15+this.r) {
        textAlign(CENTER);
        if (!pistol.equipped) {
          fill(0);
          text("Press F", this.x, this.y+35);
        }
        fill(255);
        if (keyIsDown(70)) {
          pistol.equipped = true;
        }
      }
    }
  }
