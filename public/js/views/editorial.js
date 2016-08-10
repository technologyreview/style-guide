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
		livefyre = require('livefyre');

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
		comments: function () {

			// we need a token passed from server-side
			if (!server || !server.collectionMetaToken)
				return;

			// app integration
			Livefyre.require(['fyre.conv#3', 'sidenotes#1', 'auth'], function (Conv, Sidenotes, auth) {
				try {

					// 
					// app: sidenotes
					// http://answers.livefyre.com/developers/app-integrations/sidenotes/
					// 
					var sidenotes = new Sidenotes({
						network: server.networkName,
						siteId: server.siteId,
						articleId: server.articleId,
						collectionMeta: server.collectionMetaToken,
						selectors: 'section.body > h2, section.body > h3, section.body > p, section.body > ol, section.body > ul',
						numSidenotesEl: 'span.comment-count'
					});

					// authentication
					auth.authenticate({
						livefyre: server.userAuthToken
					});

				}

				// errors
				catch (err) {
					console.error(err.message);
				}
			});
		}

	});

});