var debug = false;

// Arrays
bullets = [];
ammoBoxes = [];

function preload() {
	myFont = loadFont("Assets/Fonts/Pixel.ttf");

	hud = loadImage("Assets/IngameO.png");

	ak47 = loadImage("Assets/ak47.png");
	glock = loadImage("Assets/glock19.png");
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	player = new Player();
	pistol = new Pistol();
	enemy = new Enemy();
	rectMode(CENTER);
	ellipseMode(RADIUS);
	cursor(CROSS);

	ammoBoxes.push(new AmmoBox());
}

function draw() {
	background(150);

	for (var i = 0; i < ammoBoxes.length; i++) {
		ammoBoxes[i].show();
		if (dist(player.x, player.y, ammoBoxes[i].x, ammoBoxes[i].y) < player.r+ammoBoxes[i].r) {
			if (ammoBoxes[i].type == "secondary") {
				pistol.addAmmo();
			}
			ammoBoxes.splice(i, 1);
		}
	}
	enemy.show();

	player.show();
	player.update();


	pistol.show();
	pistol.update();

	if (keyIsDown(27)) {
		ammoBoxes.push(new AmmoBox());
	}

	for (var i = 0; i < bullets.length; i++) {
		bullets[i].update();
		bullets[i].show();

		if (bullets[i].dead) {
			bullets.splice(i, 1);
		}
	}

	// HUD
	image(hud, 0, 0, windowWidth, windowHeight);
	image(ak47, 175, height-110, ak47.width-1050, ak47.height-380);
	image(glock, 175, height-50, glock.width-1400, glock.height-950);
}


function mousePressed() {
	bullets.push(new Bullet(enemy.x, enemy.y, enemy.bearing, pistol.damage));
	if (pistol.equipped) {
		if (pistol.ammoClip > 0) {
			if (!pistol.reloading) {
				bullets.push(new Bullet(player.x, player.y, player.bearing, pistol.damage));
				pistol.ammoClip--;
			}
		}
		if (pistol.ammoClip == 0) {
			pistol.reload();
		}
	}
}
