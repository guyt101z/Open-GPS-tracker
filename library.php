<?php

require_once 'config.php';

function db_connect() {
	global $link;

	$link = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Can not acces MySQL-server.');
	
	mysqli_set_charset($link, 'utf8');

	mysqli_select_db($link, DB_NAME) or die('Can not access database.');
}

?>