/**
 * main.js
 *
 * Require.js configuration and setup, this defines dependencies,
 * shortcuts, and conditions using a URL router
 */

// paths and shims
require.config({
	baseUrl: 'js/libs',
	paths: {
		jquery: 'jquery/dist/jquery.min',
		browser: 'jquery.browser/dist/jquery.browser.min',
		hashchange: 'jquery.hashchange.min',
		router: 'requirejs-router/router.min',
		underscore: 'underscore/underscore-min',
		backbone: 'backbone/backbone',
		twig: 'twig.js/twig.min',
		templates: '../templates',
		app: '../app',
		modules: '../modules'
	},
	map: {
		'*': {
			'app/models/employee': 'app/models/memory/employee'
		}
	},
	shim: {
		browser: ["jquery"],
		hashchange: ["jquery"],
		backbone: {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		},
		underscore: {
			exports: '_'
		}
	}
});

require(['jquery', 'backbone', 'app/router'], function ($, Backbone, Router) {
	var router = new Router();
	Backbone.history.start();
});