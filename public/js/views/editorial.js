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

			console.log(Livefyre);

			// config
			var convConfig = {
				network: server.networkName,
				siteId: server.siteId,
				articleId: server.articleId,
				collectionMeta: server.collectionMetaToken,
				selectors: 'section.body > h2, section.body > h3, section.body > p, section.body > ol, section.body > ul',
				numSidenotesEl: 'span.comment-count',
				threadContainerEl: 'div.discussion'
				//checksum: '58873e02bb3ed6f94212b2f369888e96',
			};

			// app integration
			Livefyre.require(['fyre.conv#3', 'sidenotes#1', 'auth'], function (Conv, Sidenotes, auth) {
				try {

					// app: comments
					new Conv({
						network: server.networkName
					}, [convConfig], function (commentsWidget) {
						console.log(commentsWidget);
					}());

					// app: sidenotes
					var sidenotes = new Sidenotes(convConfig, function (sidenotesWidget) {
						if (sidenotesWidget)
							console.log(sidenotesWidget);
					}());

					// authentication
					auth.delegate({
						login: function (cb) {
							cb(null, {
								livefyre: server.userAuthToken
							});
						},
						logout: function (cb) {
							cb(null);
						},
						viewProfile: function (author) {
							console.log(author);
						},
						editProfile: function (author) {
							console.log(author);
						}
					});

				} catch (err) {
					console.error(err.message);
				}
			});
		}

	});

});