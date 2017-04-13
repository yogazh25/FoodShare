<?php
	$deny_from_user = $_POST["deny_from_user"];
	$deny_to_user = $_POST["deny_to_user"];

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

	$sql = "call project.update_friend_deny('".$deny_from_user."', '".$deny_to_user."');"; 

	
	$result = mysqli_query($conn,$sql);
	$array = $result->fetch_array(MYSQLI_ASSOC);
	
	 // echo $array['exist_result'];
	if($array['deny_friend_result']) {
		echo 'successful';	   
	}else{
		echo 'fail';
	}
	mysqli_close($conn);

?>