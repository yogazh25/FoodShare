<?php

	$keyword = $_POST["keyword"];
	$search_username = $_POST["search_username"];
	$search_scope = $_POST["search_scope"];
	$search_starttime_type = $_POST["search_starttime_type"];
	
	/*
	$keyword = 'I';
	$search_username = 'chelseaisgood';
	$search_scope = 3;
	$search_starttime_type = 'Last year';
	*/
	
	//( 'I', 'chelseaisgood', 3, 'Last year' );
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
	
	$array=null;
	mysqli_select_db($conn,'project');
	$sql = "call project.search_posting_keyword('".$keyword."', '".$search_username."', '".$search_scope."', '".$search_starttime_type."');";
	$result = mysqli_query($conn,$sql);
	$row_num = mysqli_num_rows($result);
	for ($x=0; $x<$row_num; $x++) {
		$array[$x] = $result->fetch_array(MYSQLI_ASSOC);
	}
	echo json_encode($array);
	
	//print_r($result);
	//echo "<br>";
	//$array = $result->fetch_array(MYSQLI_ASSOC);
	//print_r($array);
	//echo "<br>";
	//return $array;
	//echo json_encode($array);
	
	mysqli_close($conn);
?>
