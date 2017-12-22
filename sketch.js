var debug = false;

// Arrays
bullets = [];
missiles = [];
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

	if (!player.dead) {
		player.show();
		player.update();
	} else {
		textSize(50);
		fill(0);
		text("Dead!", width/2, height/3);
		fill(255);
		textSize(12);
	}

	if (player.health <= 0) {
		player.dead = true;
	}

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

	for (var i = 0; i < missiles.length; i++) {
		missiles[i].show();
		missiles[i].update();

		for (var j = 0; j < bullets.length; j++) {
			if (dist(bullets[j].pos.x, bullets[j].pos.y, missiles[i].pos.x, missiles[i].pos.y) < bullets[j].r+missiles[i].r) {
				missiles[i].health -= bullets[j].damage;
				bullets[j].dead = true;
			}
		}

		if (missiles[i].health <= 0) {
			missiles[i].dead = true;
			ammoBoxes.push(new AmmoBox());
			ammoBoxes.push(new AmmoBox());
		}

		if (dist(missiles[i].pos.x, missiles[i].pos.y, player.x, player.y) < player.r+missiles[i].r) {
			player.health -= missiles[i].damage;
			missiles[i].dead = true;
		}

		if (missiles[i].dead) {
			missiles.splice(i, 1);
		}
	}

	// HUD
	image(hud, 0, 0, windowWidth, windowHeight);
	image(ak47, 175, height-110, ak47.width-1050, ak47.height-380);
	image(glock, 175, height-50, glock.width-1400, glock.height-950);
}

function keyTyped() {
	if (key === ' ') {
		missiles.push(new Missile(enemy.x, enemy.y, enemy.bearing, pistol.damage));
	}
	return false;
}

function mousePressed() {

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
