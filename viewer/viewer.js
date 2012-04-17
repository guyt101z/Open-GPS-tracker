$(document).ready(function() {

	var runnerArray =	[
						{	"file":"b1",  "color":"red"		},
						{	"file":"b2",  "color":"blue"	},
						];

	// how often to get the track from the server, in seconds
	var updateInterval = 5;

	// map overlay
	var omapCoords = 	[
						{	"lat" : 63.828197, "lon" : 20.156369	},	// bottom left corner
						{	"lat" : 63.837033, "lon" : 20.182375	}	// top right corner
						];

	var imageBounds = new google.maps.LatLngBounds(
		new google.maps.LatLng(omapCoords[0].lat,omapCoords[0].lon), 	
		new google.maps.LatLng(omapCoords[1].lat,omapCoords[1].lon)		
	); 	

	var omap = new google.maps.GroundOverlay("maps/backen.gif", imageBounds);
	
	var map;

	var mapState = 1;
	var tailLength = 24;
	var bounds = new google.maps.LatLngBounds ();
	var markersArray = [];
	
	function startUp(){
		drawLine();
		drawIntervalId = setInterval(drawLine, updateInterval*1000);
		$('#startstop').removeClass('stopped').addClass('started');
		$('#startstop').text("Stop");
	}

	initialize();
	startUp();

	// initialize google maps
	function initialize(){

		console.log((omapCoords[0].lat+omapCoords[1].lat))
		
		var myOptions = {
			center: new google.maps.LatLng(
				(omapCoords[0].lat+omapCoords[1].lat)/2,
				(omapCoords[0].lon+omapCoords[1].lon)/2),
			zoom: 16,
			mapTypeId: google.maps.MapTypeId.HYBRID,
			streetViewControl: false,
			panControl: false,
		};

		map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

		omap.setMap(map);
	}

	// get track data, put it on the map
	function drawLine() {

		deleteOverlays();

		for (var x = runnerArray.length - 1; x >= 0; x--) {

			var color = runnerArray[x].color;
			var file = runnerArray[x].file;

			$.ajax({
				type: "GET",
				url: "serve.php?file="+file,
				dataType: "xml",
				async: false, // strange things happen without this
				success: function(xml) {
					
					var points = [];
					var index = 0;

					// finding all trackpoints, proccess them in reverse order
					$($(xml).find("trkpt").get().reverse()).each(function() {
						var lat = $(this).attr("lat");
						var lon = $(this).attr("lon");
						var p = new google.maps.LatLng(lat, lon);
						points.push(p);
						bounds.extend(p);

						index++;

						// break out of loop if enough points have been
						// added to draw a sufficiently long tail.
						if(index>tailLength){
							index = 0;
							return false;
						}
					});

					// circle
					var circle = new google.maps.Circle({
						strokeColor: "black",
						strokeOpacity: .5,
						strokeWeight: 3,
						fillColor: color,
						fillOpacity: .7,
						map: map,
						center: points[0], // last trackpoint (since we reversed it all)
						radius: 7,
						zIndex: 100
					});

					markersArray.push(circle);

					// polyline
					var poly = new google.maps.Polyline({
						path: points,
						strokeColor: color,
						strokeOpacity: .5,
						strokeWeight: 5
					});

					markersArray.push(poly);

					// put polygon on map
					for (i in markersArray) {
						markersArray[i].setMap(map);
					}
				}
			});
		}
	}

	function deleteOverlays() {
		if (markersArray) {
			for (i in markersArray) {
				markersArray[i].setMap(null);
			}
			markersArray.length = 0;
		}
	}
	
	function toggleMap(){
		if(mapState){
			omap.setMap(null)
			mapState = 0;
		}
		else{
			omap.setMap(map);
			mapState = 1;
		}
	}

	function toggleTimer(){
		if(drawIntervalId){
			clearInterval(drawIntervalId);
			drawIntervalId = null;
			$('#startstop').removeClass('started').addClass('stopped');
			$('#startstop').text("Start");
		}
		else{
			startUp();
		}
	}
	
	// show/hide o-map
	$('#togglemap').on('change', toggleMap);

	// start stop
	$('#startstop').on('click', toggleTimer);
	
	// changing tail length
	$('#trklength').change(function () {
		tailLength = $('#trklength').val();
		drawLine();
	});

	// // AJAX debugging
	// $(document).ajaxError(function(e, xhr, settings, exception) {
	// 	console.log('error in: ' + settings.url + ' \\n'+'error:\\n' + exception);
	// });
});
