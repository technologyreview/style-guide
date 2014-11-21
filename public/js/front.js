/**
 * Core JS
 *
 * May not be needed, but it's available incase
 */
"user strict";

(function ($) {

	// dropdown menu
	var $dropdown = $('[data-toggle="menu"]');
	if ($dropdown.length > 0) {
		$dropdown.on('click', function () {
			$('body').toggleClass('nav-closed');
		});
	}

	// hash menu
	var $hashMenu = $('[data-hash]');
	if ($hashMenu.length > 0) {

		// build links list
		var $hashMenuTarget = $($hashMenu.data('hash'));
		var context = {
			links: []
		};
		$('> h2', $hashMenuTarget).each(function () {
			var $this = $(this);
			context.links.push({
				label: $this.text(),
				href: '#' + $this.attr('id')
			});
		});

		// create menu from template
		var template = twig({
			id: "menu-hash",
			href: "/views/_menu-hash.twig",
			async: false
		});

		// populate template and add to DOM
		var linksHTML = twig({
			ref: "menu-hash"
		}).render(context);
		$hashMenu.append(linksHTML);

		// smooth scroll to section with offset
		var offset = $hashMenu.data('offset-top');
		$('a[href^="#"]', $hashMenu).on('click', function (e) {
			e.preventDefault();

			var target = this.hash,
				$target = $(target),
				activeHashLink = 'aside.secondary a[href="' + target + '"]',
				$currentHash = $(location.hash);

			// immediate active state
			$(activeHashLink).parent('li')
				.addClass('active')
				.siblings().removeClass('active');

			// calc transition speed and positioning
			var dimensions = {
				scrollHeight: $('html').height(),
				from: $currentHash.offset().top - offset,
				to: $target.offset().top - offset,
				baseTransition: 1500,
				init: function () {
					this.difference = (this.from > this.to) ? this.from - this.to : this.to - this.from;
					this.percentage = Math.round(this.difference / this.scrollHeight * 100) / 100;
					this.transitionDuration = Math.round(this.baseTransition * this.percentage);
					return this;
				}
			}.init();

			// scroll to new pos
			$('html, body').stop().animate({
				'scrollTop': dimensions.to
			}, dimensions.transitionDuration, 'swing', function () {
				window.location.hash = target;
			});
		});

		// active subnav states on hashchange
		$(window).hashchange(function () {
			var activeHashLink = 'aside.secondary a[href="' + location.hash + '"]';
			$(activeHashLink).parent('li').addClass('active');
		});

		// fire the event on pageload to check for an initial
		// page load that contains a hash
		$(window).hashchange();
	}

})(jQuery);