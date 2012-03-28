$(document).ready(function() {

	// initialize google maps
	initialize();

	var map;

	function initialize() {
		var myOptions = {
		center: new google.maps.LatLng(57.726103,12.9399748),
		zoom: 16,
		mapTypeId: google.maps.MapTypeId.SATELLITE
		};

		map = new google.maps.Map(document.getElementById("map_canvas"),
		myOptions);
	}

	// how often to get the track from the server, in seconds
	var updateInterval = 5;

	drawIntervalId = setInterval(drawLine, updateInterval*1000);

	// have we recieved the track-url via GET-parameter? see viewer.php line 28
	if(!trackUrl){
		alert("No runner chosen!");
		clearTimers();
	}
	else{
		// execute once to show track on page load
		drawLine();
	}

	var markersArray = [];

	function drawLine() {

		deleteOverlays();

		$.ajax({
			type: "GET",
			url: "serve.php?file="+trackUrl,
			dataType: "xml",
			success: function(xml) {
				var points = [];
				var bounds = new google.maps.LatLngBounds ();
				$(xml).find("trkpt").each(function() {
					var lat = $(this).attr("lat");
					var lon = $(this).attr("lon");
					var p = new google.maps.LatLng(lat, lon);
					points.push(p);
					bounds.extend(p);
				});

				var poly = new google.maps.Polyline({
					// use your own style here
					path: points,
					strokeColor: "lime",
					strokeOpacity: .7,
					strokeWeight: 5
				});

				markersArray.push(poly);

				showOverlays();

				function showOverlays() {
					if (markersArray) {
				    	for (i in markersArray) {
				    		markersArray[i].setMap(map);
				    	}
					}
				}
				
				// fit bounds to track
				map.fitBounds(bounds);
		  	}
		});
	}

	$("#stop").on("click", clearTimers);
	
	function clearTimers(){
		clearInterval(drawIntervalId);
	}

	function deleteOverlays() {
		if (markersArray) {
	    	for (i in markersArray) {
	    		markersArray[i].setMap(null);
	    	}
	    	markersArray.length = 0;
	  	}
	}

	// $(document).ajaxError(function(e, xhr, settings, exception) {
	// 	console.log('error in: ' + settings.url + ' \\n'+'error:\\n' + exception);
	// });

});