<?php
	$post_id = $_POST["post_id"];
	//$post_id = 0;
	$servername = "localhost";
	$username = "root";
	$password = "";
	$my_db = 'project';
	// Create connection
	$conn = mysqli_connect($servername, $username, $password, $my_db);
	 // Check connection
	if (!$conn) {
		die("Connection failed: " . mysqli_connect_error());
	} 
	
	mysqli_select_db($conn,'project');
	$sql = "call project.get_post_owner('".$post_id."');";
	
	$result = mysqli_query($conn,$sql);
	$array = $result->fetch_array(MYSQLI_ASSOC);
	echo $array['creator_name'];
	
	mysqli_close($conn);
?>
