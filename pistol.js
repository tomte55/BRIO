function Pistol() {
  this.pos = createVector(player.pos.x, player.pos.y);
  this.size = 1;

  this.ammoPool = 50;
  this.ammoClip = 10;
  this.maxClip = 10;

  this.damage = 10;

  this.equipped = true;

  this.reloading = false;

  this.update = function() {
    if (debug.ammo) {
      this.ammoClip = 10; // Infinite ammo
    }

    if (this.reloading) {
      if (this.ammoPool > 0) {
        if (this.ammoClip < this.maxClip) {
          this.ammoClip += 1;
          this.ammoPool -= 1;
        } else {
          this.reloading = false;
        }
      }
    }
  }

  this.show = function() {
    if (debug.collider) {
      noFill();
      ellipse(this.pos.x, this.pos.y, 15); // Collider sphere
    }

    push();
    fill(60, 150, 50);
    strokeWeight(1);
    if (!this.equipped) {
      rect(this.pos.x, this.pos.y, 20*this.size, 5*this.size); // Show weapon when on ground
    }
    strokeWeight(2);
    fill(255);
  }

  this.reload = function() {
    this.reloading = true;
  }

  this.addAmmo = function() {
    this.ammoPool += 10;
  }
}
