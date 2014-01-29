//Handles the user experience on the Menu
function MainMenu(Players, Levels) {
	this.Players = Players;
	this.Levels = Levels;

	this.initialize();

}

//Load the resources
MainMenu.prototype.initialize = function() {
	alert("MainMenu initialize");
}

//Makes the menu functional
MainMenu.prototype.startMenu = function() {
	alert("MainLoader startMenu");
}

