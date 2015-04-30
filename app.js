(function () {
	'use strict';

	var App = function App () {};

	App.prototype.init = function () {
		var _this = this;

		_this.initializeReferences();
		_this.initializeElements();
		_this.initializeRect();
		_this.initializeEventListeners();
	};

	App.prototype.initializeReferences = function () {
		var _this = this;

		_this.slider = document.getElementById('slider1');
		_this.canvas = document.getElementById('mainCanvas');
	};

	App.prototype.initializeElements = function () {
		var _this = this;

		_this.slider = $(_this.slider).slider();
		_this.canvas.width = $('.work-area').width();
		_this.canvas = new fabric.Canvas(_this.canvas);
	};

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

	App.prototype.initializeEventListeners = function () {
		var _this = this;

		_this.slider.on('slide', function (event, ui) {
			_this.sliderMoved(event, ui);
		});
	};

	App.prototype.sliderMoved = function (event, ui) {
		var _this = this;
		_this.moveRectangle(ui.value);
	};

	App.prototype.moveRectangle = function (value) {
		var _this = this;

		_this.rectangle.set({
			left: (_this.canvas.width - 20) - (value * (_this.canvas.width - 20) / 100)
		});
		_this.canvas.renderAll();
	};

	$(function () {
		var app = new App();
		app.init();
	});

})();