function SubMenu(instanceName, contents, stage) {
	this.instanceName = instanceName;
	this.width = 0;
	this.height = 0;

	this.Images = new Array();
	this.Sounds = new Array();
	this.Buttons = new Array();
	this.SubMenus = new Array();	//These can go as deep as needed, though ideally there is only 1 SubMenu layer on Menu

	this.refStage = stage;
	this.hasFocus = false;
	this.typeOfMenu = "";

	this.isHighlighted = false;		//Is the selector currently on this element? Then we should blink or something!
	this.intervalCounter = 0;		//curently based on frames elapsed, but should be converted to time elapsed
	this.blinkInterval = 5;			//Blink every 5 frames

	this.arrData = contents;

	this.initialize();
}

SubMenu.className = "SubMenu";

SubMenu.prototype.initialize = function () {
	//First check if there are any other submenus that need creation, then set up images and functionality
	var that = this;
	if (this.arrData['subMenus']) {
		$.each(this.arrData['subMenus'], function(index, value) {
			that.SubMenus[index] = new SubMenu(that.instanceName + SubMenu.className + index, value);
		});
	}

	//then load the resources
	this.setResources();
}

SubMenu.prototype.setResources = function() {
	var that = this;
	if (0 < this.arrData['Images'].length) {
		this.Images = this.arrData['Images'];

		$.each(this.Images, function(index, value) {
			var img = new Image();
			img.src = value.img;
			$(img).load(function() {
				var bg = new Bitmap(img)
				bg.name = that.instanceName + ' - ' + value.name;
				that.refStage.addChild(bg)
				bg.x = parseInt(value.xCoord);
				bg.y = parseInt(value.yCoord);
			});
		})
	}
	this.width = this.arrData['canvasW'];
	this.height = this.arrData['canvasH'];
}


//=====================================
// Interactive
//=====================================

SubMenu.prototype.update = function() {
	var that = this;

	if (this.isHighlighted) {
		this.animateSelect();
	}

	//Images
	$.each(this.Images, function(index, value) {
		that.refStage.getChildByName(that.instanceName + ' - ' + value.name);
	})
}

SubMenu.prototype.animateSelect = function() {
	this.intervalCounter++;
	if (this.intervalCounter == this.blinkInterval) {
		this.toggleSelectedObj();
		this.intervalCounter = 0;
	}
}

SubMenu.prototype.toggleSelectedObj = function() {
	//if ()
}

SubMenu.prototype.setHighlighted = function(isHighlighted) {
	this.isHighlighted = isHighlighted;
}


//=====================================
// Interactive
//=====================================

SubMenu.prototype.leftKey = function() {

}

SubMenu.prototype.upKey = function() {
	
}

SubMenu.prototype.rightKey = function() {
	
}

SubMenu.prototype.downKey = function() {
	
}