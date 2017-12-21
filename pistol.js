function Pistol() {

  this.x = 300;
  this.y = 500;
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
        }
      }
    }
  }

  this.show = function() {
    // fill(0, 0, 0, 100);
    // ellipse(this.x, this.y, 15);
    fill(0);
    if (!this.equipped) {
      rect(this.x, this.y, 20*this.size, 5*this.size);
    }
    fill(255);
  }

  this.reload = function() {
    this.reloading = true;
  }
}
