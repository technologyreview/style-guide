/**
 * app/views/error.js
 *
 * Handles functionality specific to the error (400/50X)
 * page template
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
			console.log('app/view/error.js');
		}

	});

});