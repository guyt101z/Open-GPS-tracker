<?php require_once '../library.php' ?>
<!doctype html>
<html>
<head>
<title>Open GPS-tracker map view</title>
<script src="http://maps.googleapis.com/maps/api/js?key=<?php echo GMAPS_APIKEY ?>&sensor=false"></script>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
<script src="viewer.js"></script>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,user-scalable=no" />
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
		<input type="checkbox" id="togglemap" name="togglemap" checked="checked"><label for="togglemap">Show o-map</label>
	</p>
	<div id="meta">
		<ul id="runners"></ul>
	</div>
</div>
</body>
</html>