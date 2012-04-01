$(document).ready(function() {

	var runnerArray = 	[						
						{ 	"file" : "b1",  "color" : "red",	},
						{ 	"file" : "b2",  "color" : "blue",	},
						];

	// how often to get the track from the server, in seconds
	var updateInterval = 30;

	// map overlay
	var imageBounds = new google.maps.LatLngBounds(
		new google.maps.LatLng(63.828197,20.156369), 	// south west corner
		new google.maps.LatLng(63.837033,20.182375)); 	// north east corner

	var omap = new google.maps.GroundOverlay("maps/backen.gif", imageBounds);
	var map;
	var mapState = 1;
	var bounds = new google.maps.LatLngBounds ();
	var markersArray = [];

	function startUp(){
		initialize();
		drawLine();
		drawIntervalId = setInterval(drawLine, updateInterval*1000);
		map.fitBounds(bounds);
	}

	startUp();

	// initialize google maps
	function initialize(){		
		
		var myOptions = {
			center: new google.maps.LatLng(57.726103,12.9399748),
			zoom: 15,
			mapTypeId: google.maps.MapTypeId.SATELLITE,
			streetViewControl: false,
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
					
					$(xml).find("trkpt").each(function() {
						var lat = $(this).attr("lat");
						var lon = $(this).attr("lon");
						var p = new google.maps.LatLng(lat, lon);
						points.push(p);
						bounds.extend(p);
					});

					var poly = new google.maps.Polyline({
						path: points,
						strokeColor: color,
						strokeOpacity: .7,
						strokeWeight: 5
					});

					markersArray.push(poly);
					
					// put polygon on map
					if (markersArray) {
						for (j in markersArray) {
							markersArray[j].setMap(map);
						}
					}
					else {
						alert("Error!");
					}							
					
					// fit bounds to track
					// if ($('#fitmap').is(':checked')) {	       
					// 	map.fitBounds(bounds);
					// }
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

	function clearTimers(){
		clearInterval(drawIntervalId);
	}
	
	$('#togglemap').on('click', toggleMap);
	$('#startstop').on('click', clearTimers);

	// // AJAX debugging
	// $(document).ajaxError(function(e, xhr, settings, exception) {
	// 	console.log('error in: ' + settings.url + ' \\n'+'error:\\n' + exception);
	// });
});