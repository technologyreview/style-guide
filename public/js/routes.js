define(function (require) {

	"use strict";

	// load dependencies
	var $body = $('body'),
		Backbone = require('backbone'),
		LayoutView = require('views/layout'),
		layoutView = new LayoutView();

	return Backbone.Router.extend({
		routes: {
			'page': 'page',
		},

		initialize: function () {},

		page: function () {
			var PageView = require('views/page'),
				pageView = new PageView();
		}
	});

});