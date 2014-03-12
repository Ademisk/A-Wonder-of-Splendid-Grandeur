//MainMenu
//
//Loads menu data and delegates to submenus their respective data
//Handles user interactions

//=====================================
// Initialization
//=====================================

function MainMenu(className, Players, Levels, fileName) {
	this.className = className;

	this.SubMenus = new Array();	//Different panels or pages of a menu 
	this.Buttons = new Array();		//Clickable elements of the menu
	this.Images = {};				//Visual items. Includes the background

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
	this.Images['background'] = this.arrData['images'][0];
}

MainMenu.prototype.initializeSubMenus = function() {
	var that = this;
	$.each(this.arrData['subMenus'], function(index, value) {
		that.SubMenus[index] = new SubMenu(that.className + '_SubMenu_' + index, value);
	});
}

//=====================================
// Interactive
//=====================================

//Launches the menu by attaching all objects to the stage
MainMenu.prototype.startMenu = function(stage) {
	this.refStage = stage;
	var that = this;

	//background
	var img = new Image();
	img.src = this.Images['background'].img;
	$(img).load(function() {
		var bg = new Bitmap(img)
		bg.name = that.className + ' - background';
		that.refStage.addChild(bg)
		bg.x = parseInt(that.Images['background'].xCoord);
		bg.y = parseInt(that.Images['background'].yCoord);
	});
}

MainMenu.prototype.update = function() {
	var that = this;

	//Images
	$.each(this.Images, function(index, value) {
		that.refStage.getChildByName(that.className + ' - ' + value.img);
	})

	//Submenus
	$.each(this.SubMenus, function(index, value) {
		value.update(that.refStage);
	})

	//Levels and Players ONLY updated from the MainLoader
}

//=====================================
// Interactive
//=====================================

MainMenu.prototype.leftKey = function() {
	this.refStage.children[0].x -= 1;
}

MainMenu.prototype.upKey = function() {
	this.refStage.children[0].y -= 1;
}

MainMenu.prototype.rightKey = function() {
	this.refStage.children[0].x += 1;	
}

MainMenu.prototype.downKey = function() {
	this.refStage.children[0].y += 1;	
}