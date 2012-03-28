<?php

$runnerId = $_GET['file'];

$f = fopen('tracks/'.$runnerId.'.xml', 'a+');

fwrite($f, '<trkpt lat="'.$_POST['lat'].'" lon="'.$_POST['lon'].'"><time>'.$_POST['time'].'</time></trkpt>'."\n");

fclose($f);

?>