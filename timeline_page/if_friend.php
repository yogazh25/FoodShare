<?php
	$from_user_name = $_POST["from_user_name"];
	$to_user_name = $_POST["to_user_name"];

	// $from_user_name = 'Terminator';
	// $to_user_name = 'Titanic';

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

	$sql = "call project.if_friend('".$from_user_name."', '".$to_user_name."');"; 

	
	$result = mysqli_query($conn,$sql);
	$array = $result->fetch_array(MYSQLI_ASSOC);
	
	// echo $array['define_result'];
	if($array['define_result']) {
		echo 'is_friend';
		
	}else {
		echo 'not_friend';
	
	}
	
	mysqli_close($conn);

?>