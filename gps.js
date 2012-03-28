$(document).ready(function() {

	// how often should we send location data? in seconds
	var sendInterval = 5;

	var runnerId;
	while (!runnerId){
		runnerId = prompt("Enter your runner ID:", "");
	}
	var intervalId;
	var watchId;
	var index = 0;
	
	var formData = new Object();

	$("#status p").text("Not tracking");
	$('#start').on("click", startTrack);
	$('#stop').on("click", stopTrack);

	function startTrack(){
		if(navigator.geolocation){
			watchId = navigator.geolocation.watchPosition(geo_success, errorHandler,
			{enableHighAccuracy:true, maximumAge:30000, timeout:27000});
		}
		else{
			alert("Sorry, device does not support geolocation! Update your browser.");
		}
	}

	function stopTrack(){
		clearInterval(intervalId);
		navigator.geolocation.clearWatch(watchId);
		index = 0;
		$("#status p").text("Not tracking").removeClass("active").addClass("stopped");
		$("#start").removeAttr("disabled");
		$("#stop").attr("disabled", "disabled");
	}
	
	function geo_success(position){

		$("#status p").text("Tracking active").removeClass("stopped").addClass("active");
		$("#start").attr("disabled", "disabled");
		$("#stop").removeAttr("disabled");
		
		lat = position.coords.latitude;
		lon = position.coords.longitude;

		formData.lat=lat;
		formData.lon=lon;
				
		if(index===0){
			intervalId = setInterval(postData, sendInterval*1000);
		}

		index++;
	}

	function addTime(){
		// insert time in formData-object
		var d = new Date();
		var d_utc = ISODateString(d);
		formData.time=d_utc;
		
		// date to ISO 8601,
		// developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Date#Example.3a_ISO_8601_formatted_dates
		function ISODateString(d){
			function pad(n){return n<10 ? '0'+n : n}
			return d.getUTCFullYear()+'-'
			+ pad(d.getUTCMonth()+1)+'-'
			+ pad(d.getUTCDate())+'T'
			+ pad(d.getUTCHours())+':'
			+ pad(d.getUTCMinutes())+':'
			+ pad(d.getUTCSeconds())+'Z'
		}
	}

	function postData(){
		addTime();
		
		$.ajax({
			type:	'POST',
			url:	'save.php?file='+runnerId,
			data:	formData,
			async:	false,
		});
	}

	function errorHandler(err){ 
		if(err.code == 1) {
			alert("Error: Access was denied");
		}
		else if(err.code == 2) {
			alert("Error: Position is unavailable");
		}
	}
});