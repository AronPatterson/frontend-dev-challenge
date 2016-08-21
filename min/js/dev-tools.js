// Developer Tools/Scripts
// Note: make sure to place the Dev Tools script after jQuery, but before Foundation
// This is so the code modifications load before Foundation converts them

// Normal Navigation Integration
$( '#mainNav > li:has(ul)' ).addClass( 'has-submenu' ); // if the main nav 1st level items has li with children, add "has-submenu"
$( '#mainNav li:has(ul)' ).addClass( 'submenu menu' ).attr( 'data-submenu' ); // add a "dropdown" class to the child ul
$( '#mainNav li' ).each(function() { // add an active class if on the current page
	var href = $( this ).find( 'a' ).attr( 'href' );
	if ( href === window.location.pathname ) {
		$( this ).find( 'a' ).addClass( 'active' );
		$( this ).parents( '.menu-item-has-children' ).children( 'a' ).addClass( 'active' );
	}
});

// Back to Top Button
$(document).ready(function(a) {
	var t = 300,
		n = 1200,
		d = 700,
		i = a( '.backToTopBtn' );
	a(window).scroll(function() {
		a(this).scrollTop() > t ? i.addClass( 'bttVisible' ) : i.removeClass( 'bttVisible bttFadeOut' ), a(this).scrollTop() > n && i.addClass( 'bttFadeOut' )
	}), i.on( 'click', function( t ) {
		t.preventDefault(), a( 'body,html' ).animate({
			scrollTop: 0
		}, d)
	})
});