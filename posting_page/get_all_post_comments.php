<?php
	$post_id = $_POST["post_id"];
	//$post_id = 4;
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
	$sql = "call project.get_all_post_comments('".$post_id."');";
	$result_result = mysqli_query($conn,$sql);
	$row_num = mysqli_num_rows($result_result);
	for ($x=0; $x<$row_num; $x++) {
		$array_result[$x] = $result_result->fetch_array(MYSQLI_ASSOC);
	}
	echo json_encode($array_result);
	
	mysqli_close($conn);
?>
