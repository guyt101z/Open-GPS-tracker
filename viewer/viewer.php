<!doctype html>
<html>
<head>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
    <style type="text/css">
        html { height: 100% }
        body { height: 100%; margin: 0; padding: 0 }
        #map_canvas { height: 100% }
    </style>
    <script type="text/javascript"
      src="http://maps.googleapis.com/maps/api/js?key=YOUR API KEY&sensor=false">
    </script>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
    <script type="text/javascript">
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
    </script>
    <script>
    <?php
        if(isset($_GET['runner'])){
        echo "var trackUrl = \"".$_GET['runner']."\";";
        }
        else{
        echo "var trackUrl = 0";
        }
    ?>

    </script>
    <script src="viewer.js"></script>
    <!--[if lt IE 9]>
    <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
    <link rel="stylesheet" href="viewer.css">
</head>

<body onload="initialize()">

<div id="map_canvas" style="width:100%; height:100%"></div>
<div id="stop">Stop</div>

</body>
</html>