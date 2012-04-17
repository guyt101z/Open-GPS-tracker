<!doctype html>
<html>
<head>
<title>Open GPS-tracker map view</title>
<script src="http://maps.googleapis.com/maps/api/js?key=YOUR API KEY&sensor=false"></script>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
<script src="viewer.js"></script>
<!--[if lt IE 9]>
<script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
<![endif]-->
<link rel="stylesheet" href="viewer.css">
</head>

<body>

<div id="map_canvas"></div>

<div id="settings">
	<div id="startstop" class="started">Stop</div>
	<p>
		<input type="checkbox" id="togglemap" name="togglemap" checked="checked"><label for="togglemap">Show O-map</label>
	</p>
	<!-- <input type="checkbox" id="fitmap" name="fitmap" checked="checked"><label for="fitmap">Fit track(s)</label> -->
	<p>Tail:<select name="trklength" id="trklength">
		<option value="24">2 min</option>
		<option value="60">5 min</option>
		<option value="99999">All</option>
	</select></p>
</div>

</body>
</html>