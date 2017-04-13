<?php
	$liker_name = $_POST["like_name"];
	$post_id = $_POST["post_id"];
	$status = $_POST["status"];
	//$viewname = "Juan Mata";
	//$post_id = 9;
	//$post_id = 0;
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
	if($status == "0"){
		$sql = "call project.user_like_location('".$liker_name."', '".$post_id."');";
	}else{
		$sql = "call project.revoke_like_location('".$liker_name."', '".$post_id."');";
	}
	
	$result = mysqli_query($conn,$sql);
	$array = $result->fetch_array(MYSQLI_ASSOC);
	if($status == "0"){
		echo $array['like_location_result'];
	}else{
		echo $array['revoke_like_location_result'];
	}	
	mysqli_close($conn);
?>
