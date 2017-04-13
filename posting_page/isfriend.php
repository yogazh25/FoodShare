<?php
	$user1_id = $_POST["user1"];
	$user2_id = $_POST["user2"];
	//$user1_id = 'chelseaisgood';
	//$user2_id = 'John Terry';
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
	$sql = "call project.if_friend('".$user1_id."', '".$user2_id."');";
	
	$result = mysqli_query($conn,$sql);
	$array = $result->fetch_array(MYSQLI_ASSOC);
	echo $array['define_result'];
	
	mysqli_close($conn);
?>
