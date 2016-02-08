$('document').ready(function() {
	//background video
	var options = { videoId: 'l7kfgG0DUlA',wrapperZIndex: 999,width: $("header").width()};
	$('header').tubular(options);
	//down scroll
	$("#down").click(function(){
		var height = $("header").height(); 
		$('html,body').animate({"scrollTop": height},"slow"); 
	});

	// carousel
	$("#owl-example").owlCarousel({
		items : 4,
		lazyLoad : true,
		navigation : true,
		navigationText: ["",""],
		pagination: false
	});


	var slideout = new Slideout({
		'panel': document.getElementById('menu'),
		'menu': document.getElementById('panel'),
		'padding': 256,
		'tolerance': 70
	});

	$('.toggle-button').on('click', function() {
		slideout.toggle();
	});
});

