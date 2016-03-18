// This is your first fully working tabris.js app. Feel free to hack around ;)
// Every keystroke will be saved and is immediatly available on your device.

// Create a top-level "Page" that contains our UI
var page = tabris.create("Page", {
  title: "Merhaba, Dünya!",
  topLevel: true
});

// Create a push button and add it to the page
var button = tabris.create("Button", {
  text: "Native Widgets",
  layoutData: {centerX: 0, top: 10}
}).appendTo(page);

// Create a text view and add it too
var textView = tabris.create("TextView", {
  font: "24px",
  layoutData: {centerX: 0, top: [button, 10]}
}).appendTo(page);

// Change the text view's text when the button is pressed
button.on("select", function() {
  textView.set("text", "Harbi süpermiş!");
});

tabris.create("Button", {
  layoutData: {centerX: 0, top: [textView, 10]},
  text: "Find words starting with 'mobile'"
}).on("select", function() {
  var xhr = new tabris.XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === xhr.DONE) {
      tabris.create("TextView", {
        layoutData: {left: 10, right: 10, top: "prev() 10"},
        text: JSON.parse(xhr.responseText)[1].join(", ")
      }).appendTo(page);
    }
  };
  xhr.open("GET", "http://en.wiktionary.org/w/api.php?action=opensearch&search=mobile&limit=100");
  xhr.send();
}).appendTo(page);

page.open();
