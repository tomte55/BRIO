function Player() {
  this.x = width/2;
  this.y = height/2;
  this.r = 15;

  this.moveSpeed = 5;
  this.fade = 0; // Stamina bar fade

  this.stamina = 100;
  this.health = 100;

  this.bearing = PI / 2;

  this.dead = false;

  this.update = function() {
    this.bearing = PI / 2 + atan2(mouseY-this.y, mouseX-this.x);

    // Sprint Function
    if (keyIsDown(16)) {
      if (this.stamina > 0) {
        this.moveSpeed = 10;
        if (this.stamina > 5) {
          this.stamina -= 2;
        } else {
          this.stamina -= 1;
        }
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
    if (keyIsDown(87)) {
      this.y -= this.moveSpeed;
    }

    // Walk down
    if (keyIsDown(83)) {
      this.y += this.moveSpeed;
    }

    // Walk right
    if (keyIsDown(68)) {
      this.x += this.moveSpeed;
    }

    // Walk left
    if (keyIsDown(65)) {
      this.x -= this.moveSpeed;
    }
  }

  this.show = function() {

    // Main player
    push();
    translate(this.x, this.y);
    rotate(this.bearing);
    if (debug) {
      ellipse(0, 0, this.r) // Sphere Collider
    }
    triangle(0, -15, 15, 15, -15, 15);

    if (pistol.equipped) {
      if (pistol.equipped) {
        fill(60, 150, 50);
      } else {
        fill(60, 90, 255);
      }
      strokeWeight(1);
      rect(0, 5, 5, 20); // Put weapon image here and put logic for primary or secondary
    }
    pop();

    // Ammo text
    push();
    fill(0);
    textAlign(CENTER);
    textSize(15);
    textFont(myFont)
    text(pistol.ammoClip + " / " + pistol.ammoPool, 208, height-6);
    pop();

    // Health bar
    strokeWeight(0)
    fill(255, 50, 50);
    rectMode(CORNER);
    rect(7, height-110, this.health*1.6, 55);

    // Stamina bar
    strokeWeight(0);
    fill(0, 180, 200);
    rectMode(CORNER);
    rect(7, height-55, this.stamina*1.6, 55);
    rectMode(CENTER);
    if (this.stamina < 100) {
      this.fade = 255;
    } else {
      if (this.fade != 0) {
        this.fade -= 5;
      }
    }

    // Draw pickup text and equip
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
    strokeWeight(2);
  }
}
