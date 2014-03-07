//MainMenu
//
//Loads menu data and delegates to submenus their respective data
//Handles user interactions

//=====================================
// Initialization
//=====================================
function MainMenu(Players, Levels, fileName) {
	this.SubMenus = new Array();	//Different panels or pages of a menu 
	this.Buttons = new Array();		//Clickable elements of the menu

	this.arrData = new Array();		//Data parsed from a JSON file
	this.Players = Players;
	this.Levels = Levels;

	this.typeOfMenu = "None";	//none

	this.initializeFromFile(fileName);
}

//Load the resources
MainMenu.prototype.initializeFromFile = function(fileName) {
	var contents = this.openAndReadFile(fileName);
}

MainMenu.prototype.openAndReadFile = function(fileName) {
	var that = this;
	$.ajax({
		type:'GET',
		url:fileName,
		dataType:'json',
		async:false,
		success: function(arrReader) {
			that.parseFileContents(arrReader);
			that.initializeSubMenus();
		},
		error: function(arrReader) {
			alert(arrReader);	//file failed to be opened/read
		}
	});
}

MainMenu.prototype.parseFileContents = function(contents) {
	this.arrData = JSON.parse(JSON.stringify(contents.Menu));
	this.typeOfMenu = this.arrData['typeOfMenu'];
	this.width = this.arrData['width'];
	this.height = this.arrData['height'];
	this.background = this.arrData['images'][0];
}

MainMenu.prototype.initializeSubMenus = function() {
	var that = this;
	$.each(this.arrData['subMenus'], function(index, value) {
		that.SubMenus[index] = new SubMenu(value);
	});
}

//=====================================
// Visual
//=====================================

//Launches the menu
MainMenu.prototype.startMenu = function(stage) {
	var that = this;
	var img = new Image();
	img.src = this.background.img;
	$(img).load(function() {
		var bg = new Bitmap(img)
		stage.addChild(bg)
		bg.x = parseInt(that.background.xCoord);
		bg.y = parseInt(that.background.yCoord);
		stage.update();
	});
}

//=====================================
// Interactive
//=====================================