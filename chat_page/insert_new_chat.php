<?php
	$userA = $_POST["userA"];
	$userB = $_POST["userB"];
	$newChat = $_POST["newChat"];

	
	// $userA = 'John_Terry';
	// $userB = 'chelseaisgood';
	// $newChat = 'HelloTest';

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
	
	$sql = "insert into bulletin_comments values(current_timestamp(),'".$userA."', '".$userB."', '".$newChat."');";
	
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
	
	
	mysqli_close($conn);
?>
