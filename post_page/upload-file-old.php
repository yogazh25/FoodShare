<?php
if ($_FILES["file"]["error"] > 0)
  {
  echo "Error: " . $_FILES["file"]["error"] . "<br />";
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
      move_uploaded_file($_FILES["file"]["tmp_name"],
      "upload/" . $_FILES["file"]["name"]);
      echo "File has been saved in: " . "upload/" . $_FILES["file"]["name"];
   // }
 
?>