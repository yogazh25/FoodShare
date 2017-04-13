<?php
	$userA = $_POST["userA"];
	$userB = $_POST["userB"];
	$lasttime = $_POST["lasttime"];

	//$viewname = "Juan Mata";
	// $userA = 'John_Terry';
	// $userB = 'chelseaisgood';
	//$lasttime = '2016-05-07 23:37:10';

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
	
	$sql = "call project.get_new_chat('".$userA."', '".$userB."', '".$lasttime."');";
	
	$result_result = mysqli_query($conn,$sql);
	$row_num = mysqli_num_rows($result_result);
	if($row_num ==0){
		echo json_encode(null);
	}else{
		for ($x=0; $x<$row_num; $x++) {
			$array_result[$x] = $result_result->fetch_array(MYSQLI_ASSOC);
		}
		echo json_encode($array_result);
	}
	// echo '2016-05-07 23:37:10';
	
	mysqli_close($conn);
?>