var MAIN_MENU_FILE = "./menus/MainMenuFile.js";

function MainLoader(canvas) {
	this.stage = new Stage($('#' + canvas).get(0));
	this.mainMenu;
	this.Players = new Array();
	this.Levels = new Array();
	this.initialize();
}


MainLoader.prototype.initialize = function() {
	this.loadLevels();
	this.loadPlayers();

	this.mainMenu = new MainMenu(this.Players, this.Levels, MAIN_MENU_FILE);
	this.mainMenu.startMenu(this.stage);
}


MainLoader.prototype.loadPlayers = function() {
	this.Players[0] = new Player();
}

MainLoader.prototype.loadLevels = function() {
	this.Levels[0] = new Level();
}