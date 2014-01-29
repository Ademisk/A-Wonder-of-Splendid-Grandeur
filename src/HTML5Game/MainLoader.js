function MainLoader() {
	this.mainMenu;
	this.Players = new Array();
	this.Levels = new Array();
	this.initialize();
}


MainLoader.prototype.initialize = function() {
	try {
		this.loadLevels();
	}
	catch (e) {
		alert(e.message);
	}
	this.loadPlayers();

	this.mainMenu = new MainMenu(this.Players, this.Levels);
	this.mainMenu.startMenu();
}


MainLoader.prototype.loadPlayers = function() {
	this.Players[0] = new Player();
}

MainLoader.prototype.loadLevels = function() {
	this.Levels[0] = new Level();
}