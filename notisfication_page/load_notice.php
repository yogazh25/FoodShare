<?php

	$viewname = $_POST["viewname"];
	
	//$viewname = 'chelseaisgood';
	
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
	
	$array_result=null;
	mysqli_select_db($conn,'project');
	$sql = "call project.check_new_items('".$viewname."');";
	$result_result = mysqli_query($conn,$sql);
	$row_num = mysqli_num_rows($result_result);
	if ($row_num==0){
		echo json_encode(null);
	}else{
		for ($x=0; $x<$row_num; $x++) {
		$array_result[$x] = $result_result->fetch_array(MYSQLI_ASSOC);
	}
		echo json_encode($array_result);
	}
	
	
	//print_r($result);
	//echo "<br>";
	//$array = $result->fetch_array(MYSQLI_ASSOC);
	//print_r($array);
	//echo "<br>";
	//return $array;
	//echo json_encode($array);
	mysqli_close($conn);
?>
