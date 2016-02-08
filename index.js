var contextMenu = require("sdk/context-menu");
var tabs = require("sdk/tabs");
var prefs = require("sdk/simple-prefs").prefs;
var self = require("sdk/self");
var myIconURL = self.data.url("icon-64.png");


var menuItem = contextMenu.Item({
  label: "Translate",
  image: self.data.url("icon-16.png"),
  context: contextMenu.SelectionContext(),
  contentScript: 'self.on("click", function () {' +
                 '  var text = window.getSelection().toString();' +
                 '  self.postMessage(text);' +
                 '});',
	accessKey: "t",
  onMessage: function (selectionText) {
    selectionText = selectionText.trim()
    selectionText = encodeURI(selectionText);
    var index = tabs.activeTab.index;
  	tabs.open({
  		url: "https://translate.google.com/?q=#auto/" + prefs["sLang"] + "/" + selectionText,
			onOpen: function (tab) {
      	tab.index = index+1;
      }
  	});
  }
});
