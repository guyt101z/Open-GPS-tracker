$(document).ready(function() {

	// how often to get the track from the server, in seconds
	var updateInterval = 5;

	drawIntervalId = setInterval(drawLine, updateInterval*1000);

	// execute once to show track on page load
	drawLine();

	var markersArray = [];

	function drawLine() {

		deleteOverlays();

		$.ajax({
			type: "GET",
			url: "../serve.php",
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
		clearInterval(clearIntervalId);
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