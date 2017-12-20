var x = 100;
var y = 100;
var r = 100;

var dragging = false

function setup() {
	createCanvas(500, 500);
	ellipseMode(RADIUS);
}

function draw() {
	background(150);

	// Ritar en Rektangel i mitten av skärmen
	ellipse(x, y, r,);
}
	function mousePressed() {
		if (dist(mouseX, mouseY, x, y) < r) {
			dragging = true
			offsetX = x - mouseX;
			offsetY = y - mouseY;
		}
	}

function mouseDragged() {
	if (dragging) {
		x = mouseX + offsetX;
		y = mouseY + offsetY;
	}
}

function mouseReleased() {
	dragging = false
}
