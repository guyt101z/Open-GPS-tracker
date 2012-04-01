<!doctype html>
<html>
<head>
<title>Open GPS-tracker map view</title>
<script src="http://maps.googleapis.com/maps/api/js?key=YOUR API KEY HERE&sensor=false"></script>
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
	<input type="checkbox" id="togglemap" name="togglemap" checked="checked"><label for="togglemap">Show O-map</label>
	<input type="checkbox" id="fitmap" name="fitmap" checked="checked"><label for="fitmap">Fit track(s)</label>
</div>

</body>
</html>