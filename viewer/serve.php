<?php
	header("Content-Type:text/xml");

	$file = $_GET['file'];

	echo "<trk>"; include("../tracks/$file.xml"); echo "</trk>";
?>