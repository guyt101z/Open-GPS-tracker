$(document).ready(function() {

	// how often to get the tracks from the server, in seconds
	var updateInterval = 5;

	// map overlay
	var omapCoords = [
		{	"lat" : 63.828197, "lon" : 20.156369	},	// bottom left corner
		{	"lat" : 63.837033, "lon" : 20.182375	}	// top right corner
	];

	var imageBounds = new google.maps.LatLngBounds(
		new google.maps.LatLng(omapCoords[0].lat, omapCoords[0].lon), 	
		new google.maps.LatLng(omapCoords[1].lat, omapCoords[1].lon)		
	); 	

	var omap = new google.maps.GroundOverlay("maps/backen.gif", imageBounds);
	var map;
	var mapState = 1;
	var bounds = new google.maps.LatLngBounds ();
	var markersArray = [];
	var circleArray = [];

	initialize();
	startUp();

	function startUp() {
		init();
		drawIntervalId = setInterval(init, updateInterval*1000);
		$('#startstop').removeClass('stopped').addClass('started');
		$('#startstop').text("Stop");
	}

	// initialize google maps
	function initialize() {

		var mapOptions = {
			center: new google.maps.LatLng(
				(omapCoords[0].lat+omapCoords[1].lat)/2,
				(omapCoords[0].lon+omapCoords[1].lon)/2),
			zoom: 16,
			mapTypeId: google.maps.MapTypeId.SATELLITE,
			streetViewControl: false,
			panControl: false,
		};

		map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

		omap.setMap(map);
	}

	function init() {
		// if markersArray is empty we will populate it with all data from server.
		if(!markersArray.length){
			getData("all");
		}
		// if it's already populated, we just need to add the latest point.
		else{
			getData("latest");
		}
	}

	// get track data, put it in array
	function getData(state) {
		$.ajax({
			type: "GET",
			url: 'gettracks.php?state='+state,
			dataType: 'json',
			// async: false, 
			success: function(data) {
				if(state === "latest") {
					processNewData(data);
				}
				else {
					processAllData(data);
				}
			}
		});
	}

	function processAllData(data) {
		$('#meta').prepend(data.compname);

		for (var i = data.runners.length - 1; i >= 0; i--) {

			var randColor = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
			$('#runners').append('<li id='+data.runners[i].runnerid+'>'+data.runners[i].runnerid+'</li>');
			$('#'+data.runners[i].runnerid).css('color', randColor);

			var points = [];
			var latArr = data.runners[i].lat.split(",");
			var lonArr = data.runners[i].lon.split(",");

			// get dem points
			for (var j = lonArr.length - 1; j >= 0; j--) {
				var p = new google.maps.LatLng(latArr[j], lonArr[j]);
				points.push(p);
			}

			// create polyline from points
			var poly = new google.maps.Polyline({
				path: points,
				strokeColor: randColor,
				strokeOpacity: 1,
				strokeWeight: 5
			});

			markersArray.unshift(poly);

			var circle = new google.maps.Circle({
				strokeColor: 'black',
				strokeOpacity: 1,
				strokeWeight: 3,
				fillColor: randColor,
				fillOpacity: .7,
				map: map,
				center: points[points.length-1], // last point
				radius: 7,
				zIndex: 100
			});
			
			circleArray.unshift(circle);
		}
		draw();
	}

	function processNewData(data) {

		for (var i = data.runners.length - 1; i >= 0; i--) {
			var lat = data.runners[i].lat;
			var lon = data.runners[i].lon;

			var newPoint = new google.maps.LatLng(lat, lon);

			var target = markersArray[i].latLngs.b[0].b;
			var circle = circleArray[i];

			// if the new point is not new, i.e. already in array, dont add it
			if(target[target.length-1].$a !== newPoint.$a && target[target.length-1].ab !== newPoint.ab) {
				target.push(newPoint);
				circle.center = newPoint;
			}
		}
		draw();
	}

	function draw() {
		deleteOverlays();

		// put polygons and circles on map
		for (i in markersArray) {
			markersArray[i].setMap(map);
		}
		for (i in circleArray) {
			circleArray[i].setMap(map);
		}
	}

	function deleteOverlays() {
		console.log("deleting");
		for (i in markersArray) {
			markersArray[i].setMap(null);
		}
		for (i in circleArray) {
			circleArray[i].setMap(null);
		}
	}

	function toggleMap() {
		if(mapState){
			omap.setMap(null)
			mapState = 0;
		}
		else{
			omap.setMap(map);
			mapState = 1;
		}
	}

	function toggleTimer() {
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
	
	// AJAX debugging
	$(document).ajaxError(function(e, xhr, settings, exception) {
		console.log('error in: ' + settings.url + ' \\n'+'error:\\n' + exception);
	});
});