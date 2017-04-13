<?php
	$viewname = $_POST["username"];	
	$profile_owner = $_POST["profile_owner"];
	//$viewname = 'chelseaisgood';
	//$profile_owner = 'Terminator';
	//$viewname = 'Yujia Zhai';	
	//$post_id = 6;
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
	$sql = "call project.ifsee_profile('".$viewname."', '".$profile_owner."');";
	
	$result = mysqli_query($conn,$sql);
	$array = $result->fetch_array(MYSQLI_ASSOC);
	echo $array['see_enable'];
	
	mysqli_close($conn);
?>
