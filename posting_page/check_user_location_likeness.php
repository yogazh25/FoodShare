<?php
	$viewname = $_POST["viewer_name"];
	$post_id = $_POST["post_id"];
	//$viewname = "Juan Mata";
	//$post_id = 9;
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
	$sql = "call project.check_user_location_likeness('".$viewname."', '".$post_id."');";
	
	$result = mysqli_query($conn,$sql);
	$array = $result->fetch_array(MYSQLI_ASSOC);
	echo $array['location_likeness_result'];
	
	mysqli_close($conn);
?>
