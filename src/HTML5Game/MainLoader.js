var MAIN_MENU_FILE = "./menus/MainMenuFile.js";

function MainLoader(className, canvas) {
	this.KeysDown = new Array();
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
	var that = this;
	this.stage = new Stage($('#' + canvas).get(0));

	this.mainMenu = new MainMenu(MainMenu.className, this.Players, this.Levels, MAIN_MENU_FILE, this.stage);

	//Initialize the FPS of a static Ticker, and set mainMenu/Levels/Players and stage to update each tick
	createjs.Ticker.setFPS(30);
	createjs.Ticker.addEventListener("tick", function() {
		that.update();
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

MainLoader.prototype.update = function() {
	var that = this;
	jQuery.each(this.KeysDown, function(index, value) {
		if (that.inMainMenu && value) {
			that.mainMenu.handleKey(index);
		}
		else if (that.inGame && value) {
			// switch (index) {
			// 	case KEY_LEFT:
			// 		that.curLevel.leftKey();
			// 	break;
			// 	case KEY_UP:
			// 		that.curLevel.upKey();
			// 	break;
			// 	case KEY_RIGHT:
			// 		that.curLevel.rightKey();
			// 	break;
			// 	case KEY_DOWN:
			// 		that.curLevel.downKey();
			// 	break;
			// 	case KEY_ENTER:
			// 		that.curLevel.enterKey();
			// 	break;
			// 	case KEY_ESC:
			// 		that.curLevel.escKey();
			// 	break;
			// 	case KEY_BACKSPACE:
			// 		that.curLevel.backspaceKey();
			// 	break;

			// }
		}
		else {
			//World's End
		}
	});
}

MainLoader.prototype.initializeControls = function() {
	var that = this;
	//Attach handler to move on keypress
	$('body').keydown(function(evt) {
		that.KeysDown[evt.keyCode] = true;
	});

	$('body').keyup(function(evt) {
		that.KeysDown[evt.keyCode] = false;
	});
}