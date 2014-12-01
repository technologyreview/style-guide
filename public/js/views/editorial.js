/**
 * app/views/comments.js
 *
 * Handles functionality specific to the
 * comments template
 */

define(function (require) {

	"use strict";

	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		editorial = require('css!cssPath/editorial');

	return Backbone.View.extend({

		/**
		 * View Constructor
		 */
		initialize: function () {
			this.comments();
		},

		/**
		 * Comments
		 *
		 * Third-party commenting engine
		 */
		comments: function () {}

	});

});