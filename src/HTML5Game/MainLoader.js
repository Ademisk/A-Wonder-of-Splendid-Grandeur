var MAIN_MENU_FILE = "./menus/MainMenuFile.js";

var KEY_LEFT = 37;
var KEY_UP = 38;
var KEY_RIGHT = 39;
var KEY_DOWN = 40;

function MainLoader(className, canvas) {
	this.className = className;
	this.inMainMenu = true;
	this.inGame = false;
	this.mainMenu;
	this.Players = new Array();
	this.CurPlayers = new Array();
	this.Levels = new Array();
	this.curLevel;
	this.initialize(canvas);
}


MainLoader.prototype.initialize = function(canvas) {
	this.mainMenu = new MainMenu('MainMenu', this.Players, this.Levels, MAIN_MENU_FILE);

	var that = this;
	this.stage = new Stage($('#' + canvas).get(0));

	//Initialize the FPS of a static Ticker, and set mainMenu/Levels/Players and stage to update each tick
	createjs.Ticker.setFPS(30);
	createjs.Ticker.addEventListener("tick", function() {
		if (that.inMainMenu) {
			that.mainMenu.update();
		}
		else if (that.inGame) {
			//Update the stage with the Level and Player(s) state
			that.curLevel.update(that.stage);

			$.each(that.CurPlayers, function(index, value) {
				value.update(that.stage);
			});
		}

		//Update stage last to draw the changes
		that.stage.update();
	});

	this.mainMenu.startMenu(this.stage);

	this.loadLevels();
	this.loadPlayers();

	this.initializeControls();
}


MainLoader.prototype.loadPlayers = function() {
	this.Players[0] = new Player();
}

MainLoader.prototype.loadLevels = function() {
	this.Levels[0] = new Level();
}

MainLoader.prototype.initializeControls = function() {
	var that = this;
	//Attach handler to move on keypress
	$('body').keydown(function(evt) {
		//We either direct input to the menu, or to the game (Level). From there, the game (Level) either uses it (menus, item select, conversations), or directs it to the Player (movement, skills).
		if (that.inMainMenu) {
			switch (evt.keyCode) {
				case KEY_LEFT:
					that.mainMenu.leftKey();
				break;
				case KEY_UP:
					that.mainMenu.upKey();
				break;
				case KEY_RIGHT:
					that.mainMenu.rightKey();
				break;
				case KEY_DOWN:
					that.mainMenu.downKey();
				break;
			}
		}
		else if (that.inGame) {
			switch (evt.keyCode) {
				case KEY_LEFT:
					that.curLevel.leftKey();
				break;
				case KEY_UP:
					that.curLevel.upKey();
				break;
				case KEY_RIGHT:
					that.curLevel.rightKey();
				break;
				case KEY_DOWN:
					that.curLevel.downKey();
				break;
			}
		}
		else {
			//World's End
		}


		if (37 == evt.keyCode) {
			bg.x -= 1;
			console.log('left');
		}
		else if (38 == evt.keyCode) {
			bg.y -= 1;
			console.log('up');
		}
		else if (39 == evt.keyCode) {
			bg.x += 1;
			console.log('right');
		}
		else if (40 == evt.keyCode) {
			bg.y += 1;
			console.log('down');
		}
	});
}