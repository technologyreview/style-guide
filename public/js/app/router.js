define(function (require) {

	"use strict";

	// load dependencies
	var $ = require('jquery'),
		$body = $('body'),
		Backbone = require('backbone'),
		LayoutView = require('app/views/layout'),
		layoutView = new LayoutView(),
		PageView = require('app/views/page'),
		pageView = new PageView();

	return Backbone.Router.extend({
		routes: {
			"": "page"
		},

		page: function () {

		}
	});

});