function setup() {
	createCanvas(500, 500);
	player = new Player();
	rectMode(CENTER);
}

function draw() {
	background(150);

	player.show();
	player.update();
}
