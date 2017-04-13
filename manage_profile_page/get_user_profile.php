<?php
	$user_id = $_POST["user_id"];
	//$user_id = 'Yujia Zhai';
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
	$sql = "call project.get_Userinfo('".$user_id."');";  // adapt to your local DB schema!!!
	$result = mysqli_query($conn,$sql);
	//print_r($result);
	//echo "<br>";
	$array = $result->fetch_array(MYSQLI_ASSOC);
	//print_r($array);
	//echo "<br>";
	//return $array;
	echo json_encode($array);
	
	mysqli_close($conn);
?>
