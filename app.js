// This is merely an anonymous immediate function that wraps our 
// program inside it's own variable scope so as not to pollute the 
// Global browser scope with references and variables that pertain
// only to our application

(function () {
	'use strict'; 
	// Strict mode is just a syntax and language feature restriction that helps 
	// keep your JavaScript code complaint with best practices and future-standards.

	// Creates a new "App" object that will add functionality onto
	// and construct and initialize when the DOM has loaded
	var App = function App () {};

	// Basic "init" function that we will call to kick everything off.
	// "prototype" is where you put functions that will be considered "class-level"
	// and will inherit down to classes that "extend" from them.
	// In JavaScript, inheritance is a bit strange, but we try to use prototypes
	// even if we're not going to use inheritance because they perform slightly better
	// in some runtimes such as Google's V8 JavaScript Engine
	App.prototype.init = function () {
		var _this = this;

		_this.initializeReferences();
		_this.initializeElements();
		_this.initializeRect();
		_this.initializeEventListeners();
	};

	// Here we get our native references to the interface elements
	App.prototype.initializeReferences = function () {
		var _this = this;

		_this.slider = document.getElementById('slider1');
		_this.canvas = document.getElementById('mainCanvas');
	};

	// Here we initialize the jQuery references to the elements
	// and set some initial values. We also initialize the canvas
	// as a Fabric canvas.
	App.prototype.initializeElements = function () {
		var _this = this;

		_this.slider = $(_this.slider).slider();
		_this.canvas.width = $('.work-area').width();
		_this.canvas = new fabric.Canvas(_this.canvas);
	};

	// This draws our rectangle in its starting location.
	App.prototype.initializeRect = function () {
		var _this = this;

		_this.rectangle = new fabric.Rect({
			left: _this.canvas.width - 20,
			width: 20,
			height: 20,
			fill: 'red'
		});

		_this.canvas.add(_this.rectangle);
	};

	// This attaches event listeners to our slider
	App.prototype.initializeEventListeners = function () {
		var _this = this;

		_this.slider.on('slide', function (event, ui) {
			_this.sliderMoved(event, ui);
		});
	};

	// This is the event listener for the slider
	App.prototype.sliderMoved = function (event, ui) {
		var _this = this;
		_this.moveRectangle(ui.value);
	};

	// This function moves the rectangle, it is invoked by the event listener for the slider (above)
	App.prototype.moveRectangle = function (value) {
		var _this = this;

		_this.rectangle.set({
			left: (_this.canvas.width - 20) - (value * (_this.canvas.width - 20) / 100)
		});
		_this.canvas.renderAll();
	};


	// This outer function is a call to jQuery's "ready" event that tells us
	// that the DOM has loaded and is ready to be manipulated.
	// We put our calls to initialize the application code inside this wrapper
	// to ensure that the DOM has fully loaded before we attempt initialization
	// of the app code. If we did not do this, then the code might execute before
	// the DOM was fully loaded. This would result in null-references because
	// our App would be trying to attach event listeners to interface objects
	// that are not actually loaded into existence yet.
	// The $ sign is the shortend reference to jQuery. It is the same as writing:
	// jQuery(function () {
	//	var app = new App();
	//	app.init();	
	// });
	
	$(function () {
		var app = new App();
		app.init();
	});

})();