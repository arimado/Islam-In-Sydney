console.log('script-works'); 

var iframeReady = false; 
var iframeLaunched = 0;
var map; 
var mapid = document.getElementById('map'); 
var currentPlayer;
var googleOverlayOn = false; 
var markers = []; 

console.log(iframeReady);

function loadMap() {


	var mapOptions = {
		zoom: 11,
		center: new google.maps.LatLng(-33.8486493, 151.1293891),
		zoomControl: false,
		scaleControl: true,
		mapTypeId: google.maps.MapTypeId.SATELLITE
	}; 

	map = new google.maps.Map(mapid, mapOptions);

	for(var i = 0; i < markerPositions.length; i++) {
		var currentLat = markerPositions[i].lat; 
		var currentLng = markerPositions[i].lng; 
		var currentTitle = markerPositions[i].title;
		var currentVideoId = markerPositions[i].videoId;
		addMarker(currentLat, currentLng, currentTitle, currentVideoId);

		console.log('marker added');

	}

	loadListners(); 

	addInfoWindow(addMarker());
	
} 


function loadListners() {
	console.log(markers);
	for(var i = 0; i < markers.length + 1; i++) {
		console.log('listner loop'); 
		// google.maps.event.addListener(markers[i], 'click', function(){
		// 	console.log('hello' + i); 
		// 		createVideo2(markers[i]); 
		// })
	}
} 

$('.sliderBox').click(function(){
	var boxid = $(this).attr('boxid');
	console.log(markers[boxid]); 
	createVideo2(markers[boxid]); 
});



function createVideo2(currentMarker) {

	console.log(currentMarker);

	var oldMarkerId; 

	stopVideo(); 


	$('#overlay').fadeIn(function(){
		$('.overlayTitle').html(currentMarker.title);
		$('.overlayTitle').fadeIn(function(){

		if(iframeReady) {

		currentPlayer = null; 
		currentPlayer = new YT.Player('overlayVideo', {
			height: '390',
			width: '640',
			videoId: currentMarker.metadata.videoId
		});
		console.log('currentPlayer updated');
		$('#overlayVideo').fadeIn(); 

		}


		$('#videoWrapper').fitVids();
		resizeOverlay(); 
		resizeOverlay(); 
		 

		 
		}); 
	}); 

	
	$('.video').fitVids();
	googleOverlayOn = true; 

	oldMarkerId = currentMarker.metadata.videoId; 


}



function stopVideo() {
	
		if(googleOverlayOn) {
			currentPlayer.stopVideo();
			$('#overlay').fadeOut(function(){
				$('#videoWrapper').html('<div id="overlayVideo" class="video"></div>');
				resizeOverlay();
			});
		} 
		
		googleOverlayOn = false; 

}




function addMarker(lat, lng, title, videoId) {

	var number; 

	var marker = new google.maps.Marker({
		position: new google.maps.LatLng(lat, lng),
		map: map,
		icon: {
			url: 'assets/map/marker.png',
			size: new google.maps.Size(60, 70),
			origin: new google.maps.Point(0,0)
		}, 
		clickable: true, 
		title: title

	}); 

	marker.metadata = {videoId: videoId};
	marker.setMap(map); 

	markers.push(marker); 


	//MARKER CLICK EVENT
	google.maps.event.addListener(marker, 'click', function() {   
			createVideo(); 
	});

	//MAP CLICK EVENT
	google.maps.event.addListener(map, 'click', function() {     
	console.log('map clicked!');          
	  	stopVideo(); 
	});

	// $(this).click(function(){
	// 	console.log(this);

	// });

	function createVideo() {

		$('#overlay').fadeIn(function(){
			$('#videoWrapper').fitVids();
			resizeOverlay(); 
			resizeOverlay(); 
		}); 

		if(iframeReady) {
			currentPlayer = null; 
			currentPlayer = new YT.Player('overlayVideo', {
				height: '390',
				width: '640',
				videoId: marker.metadata.videoId
			});
			console.log('currentPlayer updated');
		}
		$('.overlayTitle').html(marker.title); 
		
		googleOverlayOn = true; 
	}

	function stopVideo() {

		if(googleOverlayOn) {
			currentPlayer.stopVideo();
			$('#overlay').fadeOut(function(){
				$('#videoWrapper').html('<div id="overlayVideo" class="video"></div>');
				resizeOverlay();
			});
		} else {
			currentPlayer.stopVideo();
		}



		
		googleOverlayOn = false; 


	}


	return marker;
} 

function addInfoWindow(marker) {
	var infoWindow = new google.maps.InfoWindow() 
} 


// LOAD everything 

google.maps.event.addDomListener(window, 'load', loadMap()); 


function onYouTubeIframeAPIReady() {
	iframeReady = true; 
}


$(document).ready(function(){

	$('#slider').slick({
		
			  dots: true,
			  infinite: false,
			  speed: 300,
			  slidesToShow: 3,
			  slidesToScroll: 2,
			  responsive: [
			    {
			      breakpoint: 1024,
			      settings: {
			        slidesToShow: 3,
			        slidesToScroll: 3,
			        infinite: true,
			        dots: true
			      }
			    },
			    {
			      breakpoint: 600,
			      settings: {
			        slidesToShow: 2,
			        slidesToScroll: 2
			      }
			    },
			    {
			      breakpoint: 480,
			      settings: {
			        slidesToShow: 1,
			        slidesToScroll: 1
			      }
			    }
			    // You can unslick at a given breakpoint now by adding:
			    // settings: "unslick"
			    // instead of a settings object
			  ]
		
	}); 

	// $('#overlay').fadeIn(); 
	// $('.overlayTitle').html("Muhammad 'Nof' Naufal"); 
	// $('#videoWrapper').fitVids();
	// googleOverlayOn = true; 



	


	$( window ).resize(function() {
		resizeOverlay();
	});

	 $('.closeX').click(function(){
	 	stopVideo();
	 });

	 $('#overlaySocial ul li img').hover(function(){

	 	var state = $(this).attr('state');
	 	var name = $(this).attr('name'); 
	 	var newStateString = '';

	 	if(state === "off") {
	 		newStateString = name + '-hover.png';
	 		state = "on";
	 	} else {
	 		newStateString = name + '.png'; 
	 		state = "off";
	 	}


	 	$(this).attr('state', state);
	 	$(this).attr('src', newStateString);
	 		
	 	console.log(newStateString);

	 });



});


function resizeOverlay() {
	var topElementHeight = $('#topElementHeight').height();
	var iframeHeight = $('#overlayVideo').height(); 
	var socialHeight = $('#overlaySocial').height();
	$('#overlay').height(iframeHeight + topElementHeight + overlaySocial); 
	var height = topElementHeight + iframeHeight + 400;
	$('#map').height(height);
}










































