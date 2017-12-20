function Pistol() {

  this.x = 300;
  this.y = 500;
  this.size = 1;

  this.equipped = false;

  this.update = function() {
    if (this.equipped) {
      this.x = player.x+15;
      this.y = player.y+10;
    }
  }

  this.show = function() {
    // fill(0, 0, 0, 100);
    // ellipse(this.x, this.y, 15);
    fill(0);
    rect(this.x, this.y, 20*this.size, 5*this.size);
    fill(255);
  }
}
