
<?php

 //session_id(111);

 //��cookie�����session id��������Ϊ1����

 //����cookie�����PHPSESSID���������һ�˳��ͱ�ɾ��

 session_set_cookie_params(60*1);

 session_start();

 //print_r($_SESSION);
 if(isset($_SESSION['name'])){
	$username = $_SESSION['name'];
	echo $username; 
 }else {
	 echo "false";
 }
 
 
// print_r($_COOKIE);

?>