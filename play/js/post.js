var loc_able = 0;
var url;
var post_id;
var location_id;
var visible = true;
var isfriend;
var if_liked;
var username;
$(document).ready(function () {	
	var src = window.location.href; 
	var I = src.substr(src.indexOf("?post_id=") + 8).length; 
	var T = src.indexOf("?post_id="); 
	//alert(src); 
	if (0 >= T) return ""; 
	if (I == src.length) return -1; 
	post_id = src.substr(src.indexOf("?post_id=") + 9); 
	//alert(post_id); //也就是分析src字符串!!
	//var username;
	//alert(username);
	$.ajax(
	{           	
		url: "load.php",
		type: "POST",
		async:false,
		success: function (return_name) {
			return_name = return_name.replace(/^\s+|\s+$/g,"");
			username = return_name.toString();
			if(username.length <6){
				document.location = '../welcome page/index.html '; // session expired
			}
		}
	});
	var post_Ownername;
	var post_existed = true;
	$.ajax(
	{           	
		url: "getpostOwner.php",
		type: "POST",
		data: "post_id=" + post_id,
		async:false,
		success: function (return_Ownername) {
			return_Ownername = return_Ownername.replace(/^\s+|\s+$/g,"");
			post_Ownername = return_Ownername.toString();
			//alert (post_Ownername);
			if(return_Ownername.length <6){
				post_existed = false;
			}
		}
	});
	var isself = (username == post_Ownername)?true:false;
	//alert (isself);
	//alert (username);
	//alert (post_Ownername);
	//alert (post_existed);
	
	isfriend = true;
	//alert (visible);
	//alert (isfriend);
	if( post_existed && !isself ){
		$.ajax(
		{           	
			url:  "decideView.php",
			type: "POST",
			data: "username=" + username + "&post_id=" + post_id,
			async: false,
			success: function (view_visible) {
				view_visible = view_visible.replace(/^\s+|\s+$/g,"");
				post_visible = view_visible.toString();
				//alert (post_visible);
				if(post_visible.length == 5){
					visible = false;
				}
			}
		});
		$.ajax(
		{           	
			url:  "isfriend.php",
			type: "POST",
			data: "user1=" + username + "&user2=" + post_Ownername,
			async: false,
			success: function ( relation_result ) {
				relation_result = relation_result.replace(/^\s+|\s+$/g,"");
				relation = relation_result.toString();
				//alert (post_visible);
				if(relation.length == 5){
					isfriend = false;
				}
			}
		});
	}
	
	var post_info;
	$.ajax(
	{           	
		url:  "getPost.php",
		type: "POST",
		data: "post_id=" + post_id,
		dataType: "json", 
		async: false,
		success: function ( post_information ) {
			post_info = post_information;
			
			//var data = eval('('+post_info+')');
			
			//document.getElementById("post_time").innerHTML = post_info['P_time'];
			//alert(post_info[0]['P_id']);
		}
	});
	document.getElementById("title").innerHTML = post_info['title'];
	document.getElementById("post_owner").innerHTML = post_info['creator_name'];
	document.getElementById("post_owner2").innerHTML = post_info['creator_name'];
	document.getElementById("post_time").innerHTML = post_info['P_time'];
	document.getElementById("post_location").innerHTML = post_info['L_name'];//post_info['L_name'].toString()+post_info['city'].toString()+post_info['"state'].toString();
	if(isself || visible){
		//alert(1);
		document.getElementById("location_name").innerHTML = post_info['L_name'];
		document.getElementById("location_city").innerHTML = post_info['city'];
		document.getElementById("location_state").innerHTML = post_info['state'];
		document.getElementById("location_longitude").innerHTML = post_info['longitude'];
		document.getElementById("location_latitude").innerHTML = post_info['latitude'];
		document.getElementById("post_content").innerHTML = post_info['textfile'];
		//alert(2);
		//$("#container-fluid").css("display","block");
		document.getElementById("visi").style.display = "";
		
		var linke = document.getElementById("location_link").href; 
		//alert(linke);
		if( ( post_info['longitude'] != null ) && ( post_info['latitude'] != null) ){
			url = " http://localhost/Project/Map/googlemap2.html?";
			url = url +'longitude='+post_info['longitude']+'&latitude='+post_info['latitude'];
			//$('#location_link').attr('href','http://localhost/Project/Map/googlemap2.html?longitude=40.758899&latitude=-73.9873197');
			location_id = post_info['L_id'];
			loc_able = 1;
			//alert(loc_able);	
		}	
		changePostcolor( );
		getPost_likenum( post_id );
	}  
	else {
		document.getElementById("location_detail").innerHTML = "You are not allowed to see the location detail.";
	}
	
	if(post_info['L_id']!=null && visible)
	{
		//alert(1);
		getLocation_likenum(post_id, post_info['L_id']);
		changeLocationcolor( );
		//alert(8);
	}
	else{
		document.getElementById("like_placecount").style.display = "none";
		document.getElementById("like_placebutton").style.display = "none";
		document.getElementById("location_link").style.display = "none";
		document.getElementById("post_location").style.display = "none";
	}

	if(post_info['image']!=null && visible)
	{
		document.getElementById("post_image").src= post_info['image'].toString();
	}
	else{
		document.getElementById("post_image").style.display= "none";
	}
	
	if(post_info['video']!=null && visible)
	{
		document.getElementById("post_video").src= post_info['video'].toString();
		document.getElementById("media").load();
	}
	else{
		document.getElementById("media").style.display= "none";
	}

	
    
});

function fun_a(){
	if(loc_able){
		window.open(url);
	}	
}

function getLocation_likenum( post_id, location_id ){
	$.ajax(
	{           	
		url:  "getpostLocationlikenum.php",
		type: "POST",
		data: "location_id=" + location_id + "&post_id=" + post_id,
		async: false,
		success: function ( Location_likenum ) {
		document.getElementById("like_placecount").innerHTML = "Good Place("+Location_likenum.toString()+")";
		}
	});
}


function getPost_likenum( post_id ){
	$.ajax(
	{           	
		url:  "getPostlikenum.php",
		type: "POST",
		data: "post_id=" + post_id,
		async: false,
		success: function ( Post_likenum ) {
		document.getElementById("like_postcount").innerHTML = "Good Post("+Post_likenum.toString()+")";
		}
	});
}


function changeLocationcolor( ){
	$.ajax(
	{           	
		url:  "check_user_location_likeness.php",
		type: "POST",
		data: "viewer_name=" + username + "&post_id=" + post_id,
		async: false,
		success: function ( whether_like ) {
			if(whether_like.toString()=="1"){
				document.getElementById("like_placebutton").style.color = "red";
				document.getElementById("like_placecount").style.color = "red";
			}else{
				document.getElementById("like_placebutton").style.color = "black";
				document.getElementById("like_placecount").style.color = "black";
			}
		} 
	});
}

function changePostcolor( ){
	$.ajax(
	{           	
		url:  "check_user_post_likeness.php",
		type: "POST",
		data: "viewer_name=" + username + "&post_id=" + post_id,
		async: false,
		success: function ( whether_postlike ) {
			if(whether_postlike.toString()=="1"){
				document.getElementById("like_postbutton").style.color = "red";
				document.getElementById("like_postcount").style.color = "red";
			}else{
				document.getElementById("like_postbutton").style.color = "black";
				document.getElementById("like_postcount").style.color = "black";
			}
		} 
	});
}

function fun_location_like(){
	if(visible){
		$.ajax(
		{           	
			url:  "check_user_location_likeness.php",
			type: "POST",
			data: "viewer_name=" + username + "&post_id=" + post_id,
			async: false,
			success: function ( whether_like ) {
			//document.getElementById("like_placecount").innerHTML = "Good Place("+whether_like.toString()+")";
				//if(whether_like.toString()=="1"){
				//}
				//alert(whether_like);
				$.ajax(
				{           	
					url:  "change_user_location_likeness.php",
					type: "POST",
					data: "like_name=" + username + "&post_id=" + post_id + "&status=" + whether_like.toString(),
					async: false,
					success: function ( whether_success ) {
						//alert(whether_success);
					}
				});
			}
		});
		getLocation_likenum( post_id, location_id );
		changeLocationcolor( );
	}
}


function fun_post_like(){
	if(visible){
		$.ajax(
		{           	
			url:  "check_user_post_likeness.php",
			type: "POST",
			data: "viewer_name=" + username + "&post_id=" + post_id,
			async: false,
			success: function ( whether_likepost ) {
			//document.getElementById("like_placecount").innerHTML = "Good Place("+whether_like.toString()+")";
				//if(whether_like.toString()=="1"){
				//}
				//alert(whether_like);
				$.ajax(
				{           	
					url:  "change_user_post_likeness.php",
					type: "POST",
					data: "like_name=" + username + "&post_id=" + post_id + "&status=" + whether_likepost.toString(),
					async: false,
					success: function ( whether_success ) {
						//alert(whether_success);
					}
				});
			}
		});
		getPost_likenum( post_id );
		changePostcolor( );
	}
}