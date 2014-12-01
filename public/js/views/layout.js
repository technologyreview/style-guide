/**
 * app/views/layout.js
 *
 * Handles functionality specific to the layout
 * used on every page (header/footer/etc)
 */
define(function (require) {

	"use strict";

	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone');

	return Backbone.View.extend({

		/**
		 * View Constructor
		 */
		initialize: function () {
			this.dropdown();
		},

		/**
		 * Dropdown menus
		 *
		 * Dropdown menu module originally created for a responsive menu
		 */
		dropdown: function () {
			var $dropdown = $('[data-toggle="menu"]');
			if ($dropdown.length > 0) {
				$dropdown.on('click', function () {
					$('body').toggleClass('nav-closed');
				});
			}
		}

	});

});