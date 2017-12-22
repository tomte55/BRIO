function Pistol() {
  this.x = player.x;
  this.y = player.y;
  this.size = 1;

  this.ammoPool = 50;
  this.ammoClip = 10;
  this.maxClip = 10;

  this.damage = 10;

  this.equipped = false;

  this.reloading = false;

  this.update = function() {
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
    // fill(0, 0, 0, 100);
    // ellipse(this.x, this.y, 15);
    push();
    fill(60, 150, 50);
    strokeWeight(1);
    if (!this.equipped) {
      rect(this.x, this.y, 20*this.size, 5*this.size);
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
