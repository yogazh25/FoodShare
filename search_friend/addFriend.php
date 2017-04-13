<?php
	$add_from_user = $_POST["add_from_user"];
	$add_to_user = $_POST["add_to_user"];

	 // $add_from_user = 'Harry Potter';
	 // $add_to_user = 'chelseaisgood';

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

	$sql = "call project.ifexists_friend_history('".$add_from_user."', '".$add_to_user."');"; 

	
	$result = mysqli_query($conn,$sql);
	$array = $result->fetch_array(MYSQLI_ASSOC);
	
	 // echo $array['exist_result'];
	if($array['exist_result'] == 0) {
		echo 'friend_history_not_exist';	   
	}
	
	mysqli_close($conn);

?>