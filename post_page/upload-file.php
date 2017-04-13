<?php
if ($_FILES["input_video"]["error"] > 0)
  {
  echo "Error: " . $_FILES["input_video"]["error"] . "<br />";
  }
else
  {
  //echo "File name: " . $_FILES["file"]["name"] . "<br />";
  //echo "File type: " . $_FILES["file"]["type"] . "<br />";
  //echo "File size: " . ($_FILES["file"]["size"] / 1024) . " Kb<br />"; 
  }
  /*
 if (file_exists("upload/" . $_FILES["file"]["name"]))
    {
      echo $_FILES["file"]["name"] . " File existed. ";
    }
else
    {*/
	   $dest="../Media/post media/" .date("ydms")."_".$_POST["user_name"]."_".$_FILES["input_video"]["name"];//设置文件名为日期加上文件名避免重复
      move_uploaded_file($_FILES["input_video"]["tmp_name"],
      $dest);
	 
      echo $dest;
   // }
 
?>