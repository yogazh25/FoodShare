<?php
	$user_name = $_POST["user_name"];
	$first_name = $_POST["first_name"];
	$last_name = $_POST["last_name"];
	$gender = $_POST["gender"];
	$date_of_birth = $_POST["date_of_birth"];
	$residence = $_POST["residence"];
	$biography = $_POST["biography"];
	$profile_view_priority = $_POST["profile_view_priority"];

	// $user_name = 'Titanic';
	// $first_name = 'Yujia';
	// $last_name = 'Zhai';
	// $gender = 'Female';
	// $date_of_birth = '1990-09-08';
	// $residence = 'CL';
	// $biography = 'Biodfasd';
	// $profile_view_priority = '1';


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
	$sql = "call project.update_profile('".$user_name."', 
										'".$first_name."',
										'".$last_name."',
										'".$date_of_birth."',
										'".$residence."',
										'".$gender."',
										'".$biography."',
										'".$profile_view_priority."');";  // adapt to your local DB schema!!!
	$result = mysqli_query($conn,$sql); 
	// echo "1";
	// print_r($result);
	//echo "<br>";
	//$array = $result->fetch_array(MYSQLI_ASSOC);
	// echo "2";
	//print_r($array);
	//echo "<br>";
	//return $array;
	echo 'successful';
	
	mysqli_close($conn);
?>