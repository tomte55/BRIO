function Player() {
  this.pos = createVector(width/2, height/2);
  this.r = 20;

  this.moveSpeed = 5;

  this.stamina = 100;
  this.health = 100;

  this.bearing = PI / 2;

  this.dead = false;

  this.update = function() {
    this.bearing = PI / 2 + atan2(mouseY-this.pos.y, mouseX-this.pos.x); // Angle towards mouse position

    if (debug.stamina) {
      this.stamina = 100; // Infinite stamina
    }
    if (debug.health) {
      this.health = 100; // Infinite health
    }

    // Sprint Function
    if (keyIsDown(16)) {
      if (this.stamina > 0) {
        this.moveSpeed = 10; // Set sprint speed
        if (this.stamina > 5) {
          this.stamina -= 1; // Drain stamina
        }
      } else {
        this.moveSpeed = 5; // Set speed back to walk speed if stamina drained
      }
    } else {
      this.moveSpeed = 5; // Set speed back to walk speed when not holding sprint button
      if (this.stamina < 100) {
        this.stamina += 1; // Refill stamina
      }
    }

    // Walk up
    if (keyIsDown(87)) {
      this.pos.y -= this.moveSpeed;
    }

    // Walk down
    if (keyIsDown(83)) {
      this.pos.y += this.moveSpeed;
    }

    // Walk right
    if (keyIsDown(68)) {
      this.pos.x += this.moveSpeed;
    }

    // Walk left
    if (keyIsDown(65)) {
      this.pos.x -= this.moveSpeed;
    }
  }

  this.show = function() {


    // Main player
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.bearing);
    if (debug.collider) {
      noFill();
      ellipse(0, 0, this.r) // Sphere Collider
    }
    fill(255);
    triangle(0, -15, 15, 15, -15, 15); // Actaull player

    if (pistol.equipped) {
      if (pistol.equipped) {
        fill(60, 150, 50);
      } else {
        fill(60, 90, 255);
      }
      strokeWeight(1);
      rect(0, 5, 5, 20); // Weapon
    }
    pop();

    // Ammo text
    push();
    fill(0);
    textAlign(CENTER);
    textSize(15);
    textFont(myFont)
    text(pistol.ammoClip + " / " + pistol.ammoPool, 208, height-6); // Print out ammo
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

    // Draw pickup text and equip
    if (dist(this.pos.x, this.pos.y, pistol.pos.x, pistol.pos.y) < 15+this.r) {
      textAlign(CENTER);
      if (!pistol.equipped) {
        fill(0);
        text("Press F", this.pos.x, this.pos.y+35); // If player is near the gun show pickup text
      }
      fill(255);
      if (keyIsDown(70)) {
        pistol.equipped = true;
      }
    }
    strokeWeight(2);
  }
}
