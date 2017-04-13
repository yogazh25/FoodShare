<?php
	$C_P_id = $_POST["P_id"];
	$C_from_user_name = $_POST["from_user_name"];
	$C_to_user_name = $_POST["to_user_name"];
	$C_comment_content = $_POST["comment_content"];
	//$user1_id = 'chelseaisgood';
	//$user2_id = 'John Terry';
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
	$sql = "call project.upload_post_comment('".$C_P_id."', '".$C_from_user_name."', '".$C_to_user_name."', '".$C_comment_content."');";
	
	$result = mysqli_query($conn,$sql);
	$array = $result->fetch_array(MYSQLI_ASSOC);
	echo $array['define_result'];
	
	mysqli_close($conn);
?>
