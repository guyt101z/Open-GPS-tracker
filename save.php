<?php

$f = fopen('coords.xml', 'a+');

fwrite($f, '<trkpt lat="'.$_POST['lat'].'" lon="'.$_POST['lon'].'"><time>'.$_POST['time'].'</time></trkpt>'."\n");

fclose($f);

?>