<?php

 //session_id(111);

 //��cookie�����session id��������Ϊ30����

 //����cookie�����PHPSESSID���������һ�˳��ͱ�ɾ��
 session_set_cookie_params(60*30);
 session_start();
 //echo "session_id=".session_id()."<br/>";
 $_SESSION['name']='Yujia_Zhai';
 //$_SESSION['post_id']=$_POST['username'];
 //$_SESSION['name']='chelseaisgood';
 //$_SESSION['post_id']=1;

?>