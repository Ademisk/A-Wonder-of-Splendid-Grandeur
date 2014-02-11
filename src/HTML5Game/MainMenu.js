//Handles the user experience on the Menu
function MainMenu(Players, Levels, fileName) {
	this.SubMenus = new Array();	//Different panels or pages of a menu 
	this.Buttons = new Array();		//Clickable elements of the menu

	this.Players = Players;
	this.Levels = Levels;

	this.typeOfMenu = -1;	//none

	this.initializeFromFile(fileName);
}

//Load the resources
MainMenu.prototype.initializeFromFile = function(fileName) {
	try {
		var menuFile = new File(fileName);
	}
	catch (ex) {
		alert(ex.message);
	}
	if (window.File && window.FileReader && window.FileList && window.Blob) {
		var fr = new FileReader();
		fr.onload = function() {
			var jsonData = fr.result;
			MainMenu.initializeFromJson(jsonData);
		}
		try {
			fr.readAsText(menuFile);
		}
		catch (ex) {
			alert(ex.message);
		}
	}

}

MainMenu.prototype.initializeFromJson = function(jsonData) {
	var str = JSON.parse(jsonData);
}

//Makes the menu functional
MainMenu.prototype.startMenu = function() {
	
}

