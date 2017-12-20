

function preload() {
	player_img = loadImage("Assets/Temp_Player.png");
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	player = new Player();
	pistol = new Pistol();
	rectMode(CENTER);
	ellipseMode(RADIUS);
}

function draw() {
	background(150);


	player.show();
	player.update();

	pistol.show();
	pistol.update();

}
