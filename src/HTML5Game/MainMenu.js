//MainMenu
//
//Loads menu data and delegates to submenus their respective data
//Handles user interactions
//
//Navigation: Basic concept is that only 1 element can have focus at a time, and each element must be selected to allow scrolling through the inner elements

//=====================================
// Initialization
//=====================================

function MainMenu(instanceName, Players, Levels, fileName, stage) {
	this.instanceName = instanceName;
	//this.scrollIndex = -1;
	//this.Scrollables = new Array();	//All scrollable items with keyboard - Submenus and Buttons

	this.SubMenus = new Array();	//Different panels or pages of a menu 
	this.Buttons = new Array();		//Clickable elements of the menu
	this.Images = new Array();		//Visual items. Includes the background

	this.arrData = new Array();		//Data parsed from a JSON file
	this.Players = Players;
	this.Levels = Levels;

	this.refStage = stage;
	//this.hasFocus = false;			//Is this element currently selected (like a button or a submenu. Doesn't really apply to MainMenu, but it's here for conformity)
	this.typeOfMenu = "";

	//this.isHighlighted = false;		//Is the selector currently on this element? Then we should blink or something!
	//this.intervalCounter = 0;		//curently based on frames elapsed, but should be converted to time elapsed
	//this.blinkInterval = 5;			//Blink every 5 frames

	this.backgroundImg = "";

	this.LEFT_GAME_X = -50;
	this.CENTER_GAME_X = 400;
	this.RIGHT_GAME_X = 850;
	this.GAME_Y = 150;
	this.highlightedIndex = 0;
	this.GameSelectionPanels = {};

	this.initializeResources();

	//this.initializeFromFile(fileName);
	//this.initializeScrollables();
}

MainMenu.className = "MainMenu";

MainMenu.prototype.initializeResources = function() {
	this.backgroundImg = "img/MainMenuBG.png";

	this.GameSelectionPanels[0] = "img/PanelRed.png";
	this.GameSelectionPanels[1] = "img/PanelBlue.png";
	this.GameSelectionPanels[2] = "img/PanelGreen.png";
	this.GameSelectionPanels[3] = "img/PanelPurple.png";
}

// //Load the resources
// MainMenu.prototype.initializeFromFile = function(fileName) {
// 	var contents = this.openAndReadFile(fileName);
// }

// MainMenu.prototype.openAndReadFile = function(fileName) {
// 	var that = this;
// 	$.ajax({
// 		type:'GET',
// 		url:fileName,
// 		dataType:'json',
// 		async:false,
// 		success: function(arrReader) {
// 			that.parseFileContents(arrReader);
// 			//that.initializeSubMenus();
// 		},
// 		error: function(arrReader) {
// 			alert(arrReader);	//file failed to be opened/read
// 		}
// 	});
// }

// MainMenu.prototype.parseFileContents = function(contents) {
// 	this.arrData = JSON.parse(JSON.stringify(contents.Menu));
// 	this.typeOfMenu = this.arrData['typeOfMenu'];
// 	if ("Main Menu" == this.typeOfMenu) {
// 		this.hasFocus = true;
// 	}
// 	this.width = this.arrData['width'];
// 	this.height = this.arrData['height'];
// 	this.Images['background'] = this.arrData['images'][0];
// }

// MainMenu.prototype.initializeSubMenus = function() {
// 	var that = this;
// 	$.each(this.arrData['subMenus'], function(index, value) {
// 		that.SubMenus[index] = new SubMenu(that.instanceName + SubMenu.className + index, value, that.refStage);
// 	});
// }

// MainMenu.prototype.initializeScrollables = function() {
// 	that = this;
// 	this.Scrollables = jQuery.merge(that.SubMenus, that.Buttons);
// 	this.scrollIndex = 0;
// }

//=====================================
// Interactive
//=====================================

//Launches the menu by attaching all objects to the stage
MainMenu.prototype.startMenu = function() {
	var that = this;

	//background
	var img = new Image();
	img.src = this.backgroundImg;
	$(img).load(function() {
		var bg = new Bitmap(img)
		that.refStage.addChild(bg)
	});

	//loop through all the images and add them to the stage
	//set the first 3 images to be the centered in the initial position
	$.each(this.GameSelectionPanels, function(index, value) {
		var img = new Image();
		img.src = value;
		$(img).load(function() {
			var bg = new Bitmap(img);
			bg.name = "GamePanel - " + index;
			that.refStage.addChild(bg);
			that.GameSelectionPanels[index] = bg;
			if (0 == index) {
				bg.x = that.CENTER_GAME_X;
				bg.y = that.GAME_Y;
			}
			else if (1 == index) {
				bg.x = that.RIGHT_GAME_X;
				bg.y = that.GAME_Y;
			}
			else if (Object.keys(that.GameSelectionPanels).length - 1 == index) {	//set the last game to loop around as first on the left
				bg.x = that.LEFT_GAME_X;
				bg.y = that.GAME_Y;
			}
			else {
				bg.x = CANVAS_WIDTH;
				bg.y = CANVAS_HEIGHT;
			}
		});	
	});
}

MainMenu.prototype.update = function() {
	var that = this;

	// if (this.isHighlighted) {
	// 	this.animateSelect();
	// }

	// //Images
	// $.each(this.Images, function(index, value) {
	// 	that.refStage.getChildByName(that.instanceName + ' - ' + value.name);
	// 	//do stuff
	// })

	// //Submenus
	// $.each(this.SubMenus, function(index, value) {
	// 	value.update(that.refStage);
	// })

	//Levels and Players ONLY updated from the MainLoader
}

// MainMenu.prototype.animateSelect = function() {
// 	if (this.intervalCounter == this.blinkInterval) {
// 		this.toggleSelectedImage();
// 	}
// }

MainMenu.prototype.toggleSelectedImage = function() {
	//if 
}

//=====================================
// Interactive
//=====================================

MainMenu.prototype.setFocus = function(hasFocus) {
	this.hasFocus = hasFocus;
}

MainMenu.prototype.handleKey = function(index) {
	switch (index) {
		case KEY_LEFT:
			this.rotateLeft();
		break;
		case KEY_UP:
			//yOffset -= 1;
		break;
		case KEY_RIGHT:
			this.rotateRight();
		break;
		case KEY_DOWN:
			//yOffset += 1;
		break;
		case KEY_ENTER:
			//set focus to current element
		break;
		case KEY_ESC:
			//unset focus
		break;
		case KEY_BACKSPACE:
			//unset focus/erase
		break;
	}
}

//move the 3rd on-screen panels left, moving the leftmost offscreen, and bringing in a new one from the right
MainMenu.prototype.rotateLeft = function() {
	var gameCount = Object.keys(this.GameSelectionPanels).length;
	var index = this.highlightedIndex;

	//off screen left
	this.GameSelectionPanels[(gameCount + (index - 1)) % gameCount].x = CANVAS_WIDTH;
	this.GameSelectionPanels[(gameCount + (index - 1)) % gameCount].y = CANVAS_HEIGHT;

	//shift left - original index
	this.GameSelectionPanels[index].x = this.LEFT_GAME_X;

	//this will become the new index
	this.GameSelectionPanels[(gameCount + (index + 1)) % gameCount].x = this.CENTER_GAME_X;

	//on screen from right
	this.GameSelectionPanels[(gameCount + (index + 2)) % gameCount].x = this.RIGHT_GAME_X;
	this.GameSelectionPanels[(gameCount + (index + 2)) % gameCount].y = this.GAME_Y;

	//set new index
	this.highlightedIndex = (gameCount + (index + 1)) % gameCount;
}

MainMenu.prototype.rotateRight = function() {
	var gameCount = Object.keys(this.GameSelectionPanels).length;
	var index = this.highlightedIndex;

	//off screen right
	this.GameSelectionPanels[(gameCount + (index + 1)) % gameCount].x = CANVAS_WIDTH;
	this.GameSelectionPanels[(gameCount + (index + 1)) % gameCount].y = CANVAS_HEIGHT;

	//shift right - original index
	this.GameSelectionPanels[index].x = this.RIGHT_GAME_X;

	//this will become the new index
	this.GameSelectionPanels[(gameCount + (index - 1)) % gameCount].x = this.CENTER_GAME_X;

	//on screen from left
	this.GameSelectionPanels[(gameCount + (index - 2)) % gameCount].x = this.LEFT_GAME_X;
	this.GameSelectionPanels[(gameCount + (index - 2)) % gameCount].y = this.GAME_Y;

	//set new index
	this.highlightedIndex = (gameCount + (index - 1)) % gameCount;
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

MainMenu.prototype.enterKey = function() {
	//this.refStage.children[0].x -= 1;
}

MainMenu.prototype.escKey = function() {
	//this.refStage.children[0].x -= 1;
}

MainMenu.prototype.backspaceKey = function() {
	//this.refStage.children[0].x -= 1;
}