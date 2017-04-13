<?php
	$accept_from_user = $_POST["accept_from_user"];
	$accept_to_user = $_POST["accept_to_user"];

	//$accept_from_user = 'Sirius_Black';
	//$accept_to_user = 'chelseaisgood';

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

	$sql = "call project.update_friend_accept('".$accept_from_user."', '".$accept_to_user."');"; 

	
	$result = mysqli_query($conn,$sql);
	$array = $result->fetch_array(MYSQLI_ASSOC);
	
	 // echo $array['exist_result'];
	if($array['accept_friend_result']) {
		echo 'successful';	   
	}else{
		echo 'fail';	  
	}
	
	mysqli_close($conn);

?>