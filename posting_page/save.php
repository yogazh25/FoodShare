<?php

 //session_id(111);

 //��cookie�����session id��������Ϊ1����

 //����cookie�����PHPSESSID���������һ�˳��ͱ�ɾ��
 session_set_cookie_params(60*1);
 session_start();
 //echo "session_id=".session_id()."<br/>";
 //$_SESSION['name']=$_POST['username'];
 //$_SESSION['post_id']=$_POST['username'];
 $_SESSION['name']='chelseaisgood';
 $_SESSION['post_id']=1;
 //echo "hello<br/>";

?>