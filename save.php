<?php

require_once 'library.php';

db_connect();

$runnerId = mysqli_real_escape_string($link, $_GET['file']);
$lat = mysqli_real_escape_string($link, $_POST['lat']);
$lon = mysqli_real_escape_string($link, $_POST['lon']);
$time = mysqli_real_escape_string($link, $_POST['time']);

$query = mysqli_query($link, "INSERT INTO tracks SET runnerid='$runnerId', lat='$lat', lon='$lon', time='$time'");

?>