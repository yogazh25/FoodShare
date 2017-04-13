var view_name;
var owner_id;
$(document).ready(function () { 
    //view_name = 'Terminator';
    // var view_name = 'chelseaisgood';
	$.ajax(
	{           	
		url: "../load.php",
		type: "POST",
		async:false,
		success: function (return_name) {
			return_name = return_name.replace(/^\s+|\s+$/g,"");
			user_name = return_name.toString();
			//alert(username);
			if(user_name.length <6){
				//alert(username);
				document.location = '../welcome page/index.html '; // session expired
			}
			view_name = user_name;
			//alert(view_name);
		}
	});
	
    var src = window.parent.location.href;
    var I = src.indexOf("?user=") + 6; 
    var T = src.indexOf("?user="); 
    if ( (0 >= T)||(I == src.length) ){
        document.location = '/Project/user page/user.html?user='+ user_name; // illigal operation
    }
    var endofid;
    if(src.indexOf("#") <=0 ){
        endofid = src.length;
    }
    else{
        endofid = src.indexOf("#");
    }
    owner_id = src.substr(src.indexOf("?user=") + 6, endofid-src.indexOf("?user=")-6 ); 

	document.getElementById("user_name").innerHTML = owner_id;
	document.getElementById("user_name_title").innerHTML = owner_id;
    var profile_info;
	//Yujia 
    //owner_id = 'chelseaisgood';
    if(owner_id == view_name) {
    	 document.getElementById("addFriend").value = "Edit My Profile";
    	// $("#addFriend").remove();
    	 document.getElementById("addFriend").disabled = ' ';  // user_name cannot be edited.
    } else {
    	$.ajax({
                url: "if_friend.php", //请求验证页面 
                type: "POST", //请求方式
                data: "from_user_name=" + view_name.toString() + 
                      "&to_user_name=" + owner_id.toString(),
                success: function (call) {
                	if (call=="is_friend"){
                		document.getElementById("addFriend").value = "Already Friend";
	    				// $("#addFriend").remove();
	    				 document.getElementById("addFriend").disabled = ' ';
	    				} // else { alert (1);}
                     
                }
            });
    	
    }
	$.ajax({
		   url: "getPhotoaddr.php", //你处理上传文件的服务端
		   type:"POST",
		   data: "user_id=" + owner_id,
		   cache: false, 
		   async: false,
		   dataType: 'JSON',
		   success: function (result) {
				if(result.pic!=null){
					//alert(result.pic.toString());
					tem_url = timestamp(result.pic.toString());
					//alert(tem_url);
					//document.getElementById("currentphoto").src= tem_url.toString();
				}else{
					tem_url = timestamp("../face.png");
				}
		   }
        })
	document.getElementById("pic").src= tem_url;
	//alert(view_name);
	//alert(owner_id);
    //===========
	$.ajax({
		url: "check_user_see_profile.php",
		type: "POST",
		dataType: 'JSON',
		data: "username=" + view_name + "&profile_owner=" + owner_id,
		async: false,
		success: function(return_enable){
			//alert(return_enable);
			if(return_enable.toString()=="1"){
				
				$.ajax({
					url: "get_user_profile.php",
					type: "POST",
					dataType: 'JSON',
					data: "user_id=" + owner_id,
					async: true,
					success: function(return_profile){
						profile_info = return_profile;
						document.getElementById("user_name_title").innerHTML = profile_info['user_name'];
						document.getElementById("email").innerHTML = profile_info['email'];
						document.getElementById("lasttime_access").innerHTML = profile_info['lasttime_access'];
						document.getElementById("first_name").innerHTML = profile_info['first_name'];
						document.getElementById("last_name").innerHTML = profile_info['last_name'];
						document.getElementById("date_of_birth").innerHTML = profile_info['date_of_birth'];
						document.getElementById("residence").innerHTML = profile_info['residence'];
						document.getElementById("gender").innerHTML = profile_info['gender'];
					}
				});
			}else{
				window.parent.myAlert("The user has hide his personal information to you!");
			}
		}
    });
});


function addFriend() {
	// alert("addFriend function begin:");
	$.ajax({
                url: "addFriend.php", //请求验证页面 
                type: "POST", //请求方式
                data: "add_from_user=" + view_name.toString() + 
                      "&add_to_user=" + owner_id.toString(),
                success: function (addFriend_result) {
                		myAlert ("Request has been sent！");
                }
            });
}

function timestamp(url){
     //  var getTimestamp=Math.random();
       var getTimestamp=new Date().getTime();
      if(url.indexOf("?")>-1){
        url=url+"&timestamp="+getTimestamp
      }else{
        url=url+"?timestamp="+getTimestamp
      }
      return url;
    }
	
	