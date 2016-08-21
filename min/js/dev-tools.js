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
	var t = 300, // px height on page where it starts to show up
		n = 1200, // px height where it'll fade out
		d = 700, // 
		i = a( '.backToTopBtn' ); // attaches it to the correct class
	a(window).scroll(function() { // if you scroll, it checks to see your document height
		a(this).scrollTop() > t ? i.addClass( 'bttVisible' ) : i.removeClass( 'bttVisible bttFadeOut' ), a(this).scrollTop() > n && i.addClass( 'bttFadeOut' )
	}), i.on( 'click', function( t ) { // when you click it, it animates the scroll up instead of the jarring instantaneous acnhor effect
		t.preventDefault(), a( 'body,html' ).animate({
			scrollTop: 0
		}, d)
	})
});

// Load JSON Content
$.getJSON( "data.json", function( data ) {
	var items = [];
	$.each( data, function( key, val ) {
		items.push( "<li id='" + key + "'>" + val + "</li>" );
	});

	$( "<ul/>", {
		"class": "my-new-list",
		html: items.join( "" )
	}).appendTo( "body" );
});

//start ajax request
$.ajax({
    url: "data.json",
    //force to handle it as text
    dataType: "text",
    success: function(data) {
        
        //data downloaded so we call parseJSON function 
        //and pass downloaded data
        var json = $.parseJSON(data);
        //now json variable contains data in json format
        //let's display a few items
        $('#results').html('Plugin name: ' + json.name + '<br />Author: ' + json.author.name);
    }
});