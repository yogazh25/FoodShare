<?php
    $array ;
    if(empty($array)){
        echo "I am empty.";
    }else{
        echo "I am not empty";
    }
	echo '<br>';
    $array[0]['array']='I am array.';
    print_r($array);
	echo '<br>';
    $array[0]['array1']='I am array1.';
    print_r($array);
	echo '<br>';
	$array[1]['array']='I am array.';
    print_r($array);
	echo '<br>';
	$array[1]['array']='I am array.';
    print_r($array);
	echo '<br>';
	$cars = array
	  (
	  array("Volvo",22,18),
	  array("BMW",15,13),
	  array("Saab",5,2),
	  array("Land Rover",17,15)
	  );
	 print_r($cars); 
   
?>



 $array[1]['array1']='I am array1.';
    print_r($array);
	echo '<br>';
    unset($array['array1']);
    print_r($array);
	echo '<br>';