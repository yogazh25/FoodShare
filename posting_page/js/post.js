var loc_able = 0;
var url;
var post_id;
var location_id;
var visible = true;
var isfriend;
var if_liked;
var username;

var comments_lists;
var reply_id;
var post_Ownername;
	
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
					$('.theme-popover-mask').fadeIn(100);
					window.parent.myAlert("You don't have enough priority to view this post!");
					$('.messagePopButton').click(function() {
						$('.theme-popover-mask').fadeOut(500);
		});
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
			//alert(post_info.image);
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
		get_all_comments();
		CommentView.init("CommentContainer");
		CommentView.refresh();
			
		if(comments_lists !=null){
			//alert(comments_lists);
			for (var index in comments_lists) {
				//alert(1);	
				CommentView.newCard(comments_lists[index]);
				//alert (index);
			}	
		}
		
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

	if(post_info['image']!=null && post_info['image']!='' && visible)
	{    
		document.getElementById("post_image").src= timestamp(post_info['image']);
	}
	else{
		//document.getElementById("post_image").style.display= "none";
		$("#post_image").remove();
	}
	
	if(post_info['video']!=null && post_info['video']!='' && visible)
	{
		document.getElementById("post_video").src= timestamp(post_info['video']);
		document.getElementById("media").load();
	}
	else{
		//document.getElementById("media").style.display= "none";
		$("#media").remove();
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

//Today=============================

function get_all_comments(){
	comments_lists = null;
	$.ajax(
	{           	
		url:  "get_all_post_comments.php",
		type: "POST",
		data: "post_id=" + post_id,
		dataType: "json", 
		async: false,
		success: function ( return_comments ) {
			comments_lists = return_comments;
			//alert(whether_success);
		}
	});
}


function initToolTip(){
	$('.tooltip').tooltipster({
		theme: 'tooltipster-noir'
	});
};


var CommentView = {
	container: null,
	curRow: 0,
	
	init: function(containerID) {
		container = $("#"+containerID);
		curRow = 0;
	},
	refresh: function() {
		curRow = 0;
	},
	/*
    initTooltip: function() {
		$("#row"+ curRow +" .glyphicon").tooltipster({
			theme: 'tooltipster-noir',
			position: 'right'
		});
	},*/
	newCard: function(result_lists) {
		//alert("newCard");
		if ($("#row"+curRow).length == 0) {
			container.append("<div class='row' id='row"+ curRow +"'></div>");
		}
		var photo_addr_result = null;
		$.ajax(
		{           	
			url:  "../common/get_user_photo.php",
			type: "POST",
			data: "photo_user=" + result_lists.from_user_name,
			async: false,
			success: function ( return_addr ) {
				//alert(return_addr);
				photo_addr_result= timestamp(return_addr);
				//alert(whether_success);
			}
		});
		
		$("#row"+curRow).append("<div id='resultContainer"+curRow+"' style='padding-bottom:50px; border:2px;' >\
									<div class='col-sm-2 text-center'>\
										<img id= 'image"+curRow+"' src='"+photo_addr_result+"' class='img-circle' height='65' width='65' alt='Avatar'>\
									</div>\
									<div class='col-sm-10' id = 'com"+curRow+"'>\
									<a href='../user page/user.html?user="+result_lists.from_user_name+"'><h4 style='display:inline'>"+result_lists.from_user_name+"</a> <small style='padding:0 10px 0 20px'>"+result_lists.comment_time+"</small></h4> <a href='../user page/user.html?user="+result_lists.to_user_name+"' id = 'to_user"+curRow+"'><h4 style='display:inline;color:lightred;'>@"+result_lists.to_user_name+"</h4></a>\
									<input id = 'replybtn"+curRow+"' type='button' style='display:inline;color:green;float:right;' onclick='reply_method(this.name, this.alt)' alt ='"+result_lists.from_user_name+"' name = 'com"+curRow+"' value = 'reply' ></input>\
									<p style='font-size:20px'>"+result_lists.comment_content+"</p>\
								</div>\
								<div>\
									<hr style='color:black'>\
									<hr>\
									<br>\
								</div>\
							</div>\
						</div>");
		
		
		
		if(post_Ownername == result_lists.from_user_name) {
    	 $("#"+"replybtn"+curRow).remove();
		}
		if(result_lists.from_user_name == result_lists.to_user_name) {
    	 $("#"+"to_user"+curRow).remove();
		}
		curRow += 1;
	}
};


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
	
function reply_method(c_id, c_name){
	if(reply_id !=null){
		$("#"+reply_id).remove();
	}
	//alert(c_id);
	//alert(c_name);
	
	$("#"+c_id).append("<form role='form' style='padding-bottom:50px' id= 'cbox'>\
									<div class='form-group'>\
										<textarea id='float_content' class='form-control' rows='3' required style='resize: vertical;'></textarea>\
									</div>\
									<span type='submit' class='btn btn-success' style='float:right' id ='" + c_name + "' onclick = 'float_submit(this.id)'>Reply</span>\
								</form>\
							</div>"
				);
	reply_id = 'cbox';
	//alert(2);
}

	
function float_submit(replyto_name){
	//alert(post_id);
	//alert(username);
	//alert(replyto_name);
	var sumbit_text = document.getElementById("float_content").value;
	if (sumbit_text == '') {
		$('.theme-popover-mask').fadeIn(100);
		window.myAlert("You must input something in the comment box!");
		$('.messagePopButton').click(function() {
			$('.theme-popover-mask').fadeOut(500);
		});
		return;
	}
	fun_submit_comment(post_id, username, replyto_name, sumbit_text);
}

function static_submit(){
	//alert(post_id);
	//alert(username);
	//alert(replyto_name);
	var static_sumbit_text = document.getElementById("static_comment").value;
	if (static_sumbit_text == '') {
		$('.theme-popover-mask').fadeIn(100);
		window.myAlert("You must input something in the comment box!");
		$('.messagePopButton').click(function() {
			$('.theme-popover-mask').fadeOut(500);
		});
		return;
	}
	fun_submit_comment(post_id, username, post_Ownername, static_sumbit_text);
}

function fun_submit_comment(C_P_id, C_from_user_name, C_to_user_name, C_comment_content){
	//alert(C_P_id);
		//alert(C_from_user_name);
			//alert(C_to_user_name);
				//alert(C_comment_content);
		$.ajax(
		{           	
			url:  "upload_post_comment.php",
			type: "POST",
			data: "P_id=" + C_P_id + "&from_user_name=" + C_from_user_name + "&to_user_name=" + C_to_user_name + "&comment_content=" + C_comment_content,
			async: false,
			success: function ( ) {
			$('.theme-popover-mask').fadeIn(100);
			window.myAlert("Commented!");
			$('.messagePopButton').click(function() {
				location = location;
				$('.theme-popover-mask').fadeOut(500);
			});
				//alert(whether_success);
			}
		});
				
		
				
}

$(document).ready(function(){
		//点击弹窗的ok按钮，弹窗消失
		$('.messagePopButton').click(function(){
			$('.messagePopOut').fadeOut(100);
		})
})
function myAlert(alertMessage){
	//alert(1);
	$('.messagePopText').text(alertMessage);
	$('.messagePopOut').fadeIn(500);
}