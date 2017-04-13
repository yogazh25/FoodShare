<?php

 //session_id(111);

 //改cookie保存的session id生命周期为30分钟

 //这样cookie保存的PHPSESSID不会浏览器一退出就被删除
 session_set_cookie_params(60*30);
 session_start();
 //echo "session_id=".session_id()."<br/>";
 $_SESSION['name']='Yujia_Zhai';
 //$_SESSION['post_id']=$_POST['username'];
 //$_SESSION['name']='chelseaisgood';
 //$_SESSION['post_id']=1;

?>