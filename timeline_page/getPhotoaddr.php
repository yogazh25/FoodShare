<?php
	$user_id = $_POST["user_id"];
	//$user_id = 'chelseaisgood';
	//$post_id = 2;
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
	$sql = "SELECT pic from user_profile where user_name = '".$user_id."';";
	$result = mysqli_query($conn,$sql);
	//print_r($result);
	//echo "<br>";
	$array = $result->fetch_array(MYSQLI_ASSOC);
	//print_r($array);
	//echo "<br>";
	//return $array;
	echo json_encode($array);
	
	mysqli_close($conn);
?>
