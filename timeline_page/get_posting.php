<?php

	$userA = $_POST["userA"];
	$userB = $_POST["userB"];
	// $userA = 'chelseaisgood';
	// $userB = 'chelseaisgood';

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
	
	$array=null;
	mysqli_select_db($conn,'project');
	$sql = "call project.get_one_all_posting('".$userA."', '".$userB."');";
	$result = mysqli_query($conn,$sql);
	$row_num = mysqli_num_rows($result);
	for ($x=0; $x<$row_num; $x++) {
		$array[$x] = $result->fetch_array(MYSQLI_ASSOC);
	}
	echo json_encode($array);
	
	mysqli_close($conn);
?>
