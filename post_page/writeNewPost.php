<?php
	$create_name = $_POST["creator_name"];
	$title = $_POST["title"];
	$textfile = $_POST["textfile"];
	$image = $_POST["image"];
	$video = $_POST["video"];
	$post_view_priority = $_POST["post_view_priority"];
	$L_name = $_POST["L_name"];
	$city = $_POST["city"];
	$state = $_POST["state"];
	$longitude = $_POST["longitude"];
	$latitude = $_POST["latitude"];

	// $create_name = 'Yujia Zhai';
	// $title = 'rrrrrrrrrrrr!';
	// $textfile = 'tttttttttttttttt';
	// $image =  null;
	// $video = null;
	// $post_view_priority = 3;
	// $L_name = '';
	// $city = 'Brooklyn Kings County';
	// $state = 'NY';
	// $longitude = '-74.02165400001';
	// $latitude = '40.62634';
	
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
	// echo 'connection test';
	mysqli_select_db($conn,'project');
	$sql = "call project.new_posting('".$create_name."', 
										'".$title."',
										'".$textfile."',
										'".$image."',
										'".$video."',
										'".$post_view_priority."',
										'".$L_name."',
										'".$city."',
										'".$state."',
										'".$longitude."',
										'".$latitude."');";  // adapt to your local DB schema!!!
	$result = mysqli_query($conn,$sql); 
	 // echo "1";
	// print_r($result);
	//echo "<br>";
	$array = $result->fetch_array(MYSQLI_ASSOC);
	if($array['new_posting_result']) {
		echo $array['new_posting_result'];	
	}
	// echo "2";
	//print_r($array);
	//echo "<br>";
	//return $array;
	mysqli_close($conn);
?>