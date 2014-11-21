/**
 * Core JS
 *
 * May not be needed, but it's available incase
 */

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
				$target = $(target);

			$('html, body').stop().animate({
				'scrollTop': $target.offset().top - offset
			}, 900, 'swing', function () {
				window.location.hash = target;
			});
		});

		// active subnav states on hashchange
		$(window).hashchange(function () {
			console.log('location.hash', location.hash);
			var activeHashLink = 'aside.secondary a[href="' + location.hash + '"]';
			console.log(activeHashLink);
			$(activeHashLink).parent('li').addClass('active');
		});

		// fire the event on pageload to check for an initial
		// page load that contains a hash
		$(window).hashchange();
	}

})(jQuery);