var x = 0;
var y = 0;
var r = 50;

function setup() {
	createCanvas(1000, 1000);
	rectMode(CENTER);
	frameRate(5);
}

function draw() {
	background(150);

	// Ritar en Rektangel i mitten av skärmen
	ellipse(x, y, r);

	
	textSize(100);
	textAlign(CENTER);
	fill(random(255), random(255), random(255));
	text("Ska dra till myway", width/2, height/2);
}


function mousePressed() {
	x = mouseX;
	y = mouseY;
}
