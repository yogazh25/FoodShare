<?php
	$old_pwd = $_POST["password"];
	$new_pwd = $_POST["newpassword1"];
	$edit_pwd_name = $_POST["user_name"];

	// echo $old_pwd;
	// echo $new_pwd;
	// echo $edit_pwd_name;
	// echo 111;


	// $new_pwd = '1234567';
	// $old_pwd = 'aabbccdd';
	// $user_name = 'chelseaisgood';

	$servername = "localhost";
	$username = "root";
	$password = "";
	$my_db = 'project';
	// Create connection
	$conn = mysqli_connect($servername, $username, $password, $my_db);
	 // Check connection
	if (!$conn) {
		die("Connection failed: " . mysqli_connect_error());
	} 
	
	mysqli_select_db($conn,'project');

	$sql = "call project.update_pwd('".$new_pwd."', 
									'".$old_pwd."',
									'".$edit_pwd_name."');"; 

	
	$result = mysqli_query($conn,$sql);
	$array = $result->fetch_array(MYSQLI_ASSOC);
	if($array['change_pwd_result']) {
		echo 'success';
		// echo $old_pwd;
		// echo $new_pwd;
		// echo $edit_pwd_name;
	}else {
		echo 'password_error';
	}
	
	mysqli_close($conn);

?>