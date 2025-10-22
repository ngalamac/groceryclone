//X BUTTON RESIZE

jQuery(document).ready(function () {

	var e = jQuery("#switcher").outerHeight();
	jQuery("#iframe").attr("height", jQuery(window).height() + "px");
	jQuery('#hide-demo-bar').click(function () {
		jQuery("#iframe").attr("height", jQuery(window).height() - e + "px");

		jQuery('body').toggleClass('switcher-hidden');
		jQuery('#switcher').toggleClass('fbar-hidden-switcher');
		jQuery('#hide-demo-bar').toggleClass('fbar-hidden-btn');
		jQuery('#iframe').toggleClass('fbar-top-iframe');

		if (jQuery('body').hasClass('switcher-hidden')) {
			jQuery("#iframe").attr("height", jQuery(window).height() + "px");
		} else {
			jQuery("#iframe").attr("height", jQuery(window).height() - e + "px");
		}
	});
	jQuery(window).resize(function () {
		if (jQuery('body').hasClass('switcher-hidden')) {
			jQuery("#iframe").attr("height", jQuery(window).height() + "px");
		} else {
			jQuery("#iframe").attr("height", jQuery(window).height() - e + "px");
		}
	}).resize();
	jQuery("#header-bar").hide();
	clicked = "desktop";
	var t = {
		desktop: "100%",
		tabletlandscape: 1023,
		tabletportrait: 767,
		mobilelandscape: 480,
		mobileportrait: 375,
		placebo: 0
	};
	jQuery(".responsive a").on("click", function () {
		var e = jQuery(this);
		
		console.log('navigator.userAgent', navigator.userAgent);
		for (device in t) {
			console.log(device);
			console.log(t[device]);
			if (e.hasClass(device)) {
				clicked = device;
				
				

				jQuery("#iframe").width(t[device]);
				//if (navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("Chrome") && !navigator.userAgent.includes("Edge")) {
					//jQuery("#iframe").width('100%');
				//}

				if (clicked == device) {
					jQuery(".responsive a").removeClass("active");
					e.addClass("active")
				}
			}
		}
		return false
	});
  /*  jQuery('.responsive_buttons_demo a').click(function () {
		analytics.track('Tried responsive', {
			theme: themeisle.product.name
		});
	});
*/
	jQuery('#clickthemefromdemo').click(function (e) {
		e.preventDefault();

	  //  analytics.track('Clicked on download from demo', {
	  //      theme: themeisle.product.name
		//});
		location.href = jQuery(this).attr("href");
		return false;
	});

	jQuery('#admindemolink a').click(function (e) {
		e.preventDefault();
		jQuery('.demo-admin-modal').show();

	  //  analytics.track('Clicked on admin demo', {
		//    theme: themeisle.product.name
	  //  });
		location.href = jQuery(this).attr("href");
		return false;
	});

	jQuery('.close-demo-admin-modal').click(function (e) {
		e.preventDefault();
		jQuery('.demo-admin-modal').hide();
	});

	if (window.location.hash) {
		var hash = window.location.hash;
		if (hash !== 'undefined') {
			if (hash === '#admindemo') {
				jQuery('.demo-admin-modal').show();
			}
		}
	}

	jQuery('#admin-demo-form').submit(function (e) {
		e.preventDefault();
		var email = btoa( jQuery('.demo-admin-modal .email-input').val() );
		var demoUrl = jQuery('#iframe').attr('src');
		var lastChar = demoUrl.substr(-1); // Selects the last character
		if (lastChar != 'https://www.vwthemes.net/') {         // If the last character is not a slash
			url = url + '/';            // Append a slash to it.
		}
		demoUrl += "wp-json/demo/register";
		jQuery.ajax({
			type: "POST",
			url: demoUrl,
			data: {email: email},
			beforeSend: function () {
				jQuery('#admin-demo-form, .instructable').fadeOut(function () {
					jQuery('.loader').fadeIn();
				});
			},
			success: function (r) {
				setTimeout(function () {
					location.href = r.url;
				},
				500)
			}
		});

	});
});
