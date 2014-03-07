function SubMenu(contents) {
	this.Images = new Array();
	this.Sounds = new Array();
	this.Buttons = new Array();
	this.SubMenus = new Array();	//These can go as deep as needed, though ideally there is only 1 SubMenu layer on Menu

	this.arrData = contents;

	this.integrateData();
}

SubMenu.prototype.integrateData = function () {
	//First check if there are any other submenus that need creation, then set up images and functionality
	var that = this;
	if (this.arrData['subMenus']) {
		$.each(this.arrData['subMenus'], function(index, value) {
			that.SubMenus[index] = new SubMenu(value);
		});
	}

	//then load the resources
	this.loadResources();
}

SubMenu.prototype.loadResources = function() {

}