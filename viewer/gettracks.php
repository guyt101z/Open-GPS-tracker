<?php
header('Content-Type:application/json');

require_once '../library.php';

db_connect();

$link = '';

$output = array(
	'compname' => COMP_NAME
);

if(isset($_GET['state'])){

	// getting only the latest point from every runner in the database
	if($_GET['state'] == 'latest') {
		db_connect();

		$query = 	'SELECT runnerid, lat, lon
					FROM tracks
					WHERE pointid = ANY (SELECT MAX(pointid) FROM tracks GROUP BY runnerid)
					ORDER BY runnerid';

		$result = mysqli_query($link, $query);

		$runners = array();

		while($r = mysqli_fetch_assoc($result)) {
	    	$runners[] = $r;
		}

		$output['data'] = "latest";
		$output['runners'] = $runners;
		
		echo json_encode($output);
	}

	// getting all lat/lon-data from the database
	elseif($_GET['state'] == 'all') {
		db_connect();

		$query = 	"SELECT runnerid,
					GROUP_CONCAT(lat ORDER BY pointid DESC SEPARATOR ',') AS lat,
					GROUP_CONCAT(lon ORDER BY pointid DESC SEPARATOR ',') AS lon
					FROM tracks
					GROUP BY runnerid
					ORDER BY runnerid";

		$result = mysqli_query($link, $query);

		$runners = array();

		while($r = mysqli_fetch_assoc($result)) {
	    	$runners[] = $r;
		}

		$output['data'] = "all";
		$output['runners'] = $runners;

		echo json_encode($output);
	}
}
else{
	echo 'Error';
}

?>