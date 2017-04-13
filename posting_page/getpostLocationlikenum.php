<?php
	$location_id = $_POST["location_id"];
	$post_id = $_POST["post_id"];
	//$location_id = 1;
	//$post_id = 3;
	//$post_id = 0;
	$servername = "localhost";
	$username = "root";
	$password = "root";
	$my_db = 'project';
	// Create connection
	$conn = mysqli_connect($servername, $username, $password, $my_db);
	 // Check connection
	if (!$conn) {
		die("Connection failed: " . mysqli_connect_error());
	} 
	
	mysqli_select_db($conn,'project');
	$sql = "call project.check_post_location_likeness('".$location_id."', '".$post_id."');";
	
	$result = mysqli_query($conn,$sql);
	$array = $result->fetch_array(MYSQLI_ASSOC);
	echo $array['loc_like_num'];
	
	mysqli_close($conn);
?>
