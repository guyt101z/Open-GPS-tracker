<!doctype html>
<html>
<head>
    <title>Open GPS-tracker map view</title>
    <script src="http://maps.googleapis.com/maps/api/js?key=AIzaSyDiI6evEGXaw9UKxvEQ0eUTx5erZVHmfdI&sensor=false"></script>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
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

<body>

<div id="map_canvas"></div>
<div id="stop">Stop</div>

</body>
</html>