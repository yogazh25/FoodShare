var scope_array = new Array("Invalid", "Friends","FOF","ALL");
var type_array = new Array("Invalid", "Profile","Postings");
var time_array = new Array("Invalid", "Today", "Last three days", "Last seven days","Last month", "Last year");
var viewer_id;
var owner_id;
var isFinished = false;
var result;

function autoResize() {
	$("#MainPage_frame",parent.document).css("height",$("body").height() + "px");
};

function initToolTip(){
	$('.tooltip').tooltipster({
		theme: 'tooltipster-noir'
	});
};

/**
 * documen ready initialization
 */
$(document).ready(function(){
	//alert(22222);
	PersonCardView.init("resultContainer");
	//PersonCardView.refresh();
	//autoResize();
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
			viewer_id = user_name;
			//alert(viewer_id);
		}
	});
	
	var src = window.parent.location.href;
	//alert (src);	
    var I = src.indexOf("?user=") + 6; 
    //alert(I);
    var T = src.indexOf("?user="); 
    
    if ( (0 >= T)||(I == src.length) ){
        document.location = '/Project/user page/user.html?user='+ user_name; // illigal operation
    }
    var endofid;
    if(src.indexOf("#") <=0 ){
        endofid = src.length;
        //alert(1);
    }
    else{
        endofid = src.indexOf("#");
        //alert(2);
    }
    //alert(endofid);
    owner_id = src.substr(src.indexOf("?user=") + 6, endofid-src.indexOf("?user=")-6 ); 
	document.getElementById("user_name_title").innerHTML = owner_id;
	
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
	
    if(owner_id == viewer_id) {
    	 document.getElementById("addFriend").value = "Welcome Home";
    	// $("#addFriend").remove();
    	 document.getElementById("addFriend").disabled = ' ';  // user_name cannot be edited.
    } else {
    	$.ajax({
                url: "if_friend.php", //请求验证页面 
                type: "POST", //请求方式
                data: "from_user_name=" + viewer_id.toString() + 
                      "&to_user_name=" + owner_id.toString(),
                success: function (call) {
                	if (call=="is_friend"){
                		document.getElementById("addFriend").value = "Friend Already";
	    				// $("#addFriend").remove();
	    				 document.getElementById("addFriend").disabled = ' ';
	    				} // else { alert (1);}
                     
                }
        });
    	
    }
	search();
});
	

function search(){
	//alert("searching");
	$("#resultContainer").empty();
	PersonCardView.refresh();
	autoResize();
	var isSecondTime = true;
	result =null;
	
	//alert(scope);
	
	isFinished = false;
	isSecondTime = false;
	//alert(search_input_scope);
	//alert(search_input_type);
	//alert(search_input_startpoint);
	//alert(viewer_id);
	//alert(owner_id);
	$.ajax({
		url: "get_posting.php",
		type: "POST",
		dataType: "json", 
		async: false,
		data: "userA=" + viewer_id
			+ "&userB=" + owner_id,
			success: function(call) {
			result = call;
	
			// No matched results
			if (result == null) {
				isFinished = true;
				$('.theme-popover-mask').fadeIn(100);
				window.parent.myAlert("The user may have no postings at all or hide all of them to you!");
				$('.messagePopButton').click(function() {
					$('.theme-popover-mask').fadeOut(500);
				});
				return;
			}
			//$(".showMore").remove();
			
			for (var index in result) {
				PersonCardView.newCard(result[index]);
				autoResize();
			}
				
			//$("#resultContainer").append('<div class="The End" ><div class="showMoreText" onclick="showMore()">Show All</div></div>')
			autoResize();
			
		}
	})
}

function showMore(){
	$(".showMore").remove();
					
	for (var index=5;index<result.length;index++) {
		PersonCardView.newCard(result[index]);
	}
	
	$(".abilityDetail").fadeIn(700, function(){
		//标签显示之后，初始化其tooltip功能
	  initToolTip();
	});
	
	autoResize();	
}
	
var PersonCardView = {
	container: null,
	curRow: 0,
	
	init: function(containerID) {
		container = $("#"+containerID);
		curRow = 0;
	},
	refresh: function() {
		curRow = 0;
	},
    initTooltip: function() {
		$("#row"+ curRow +" .glyphicon").tooltipster({
			theme: 'tooltipster-noir',
			position: 'right'
		});
	},
	newCard: function(postInfo) {
		
		//alert("newCard");
		if ($("#row"+curRow).length == 0) {
			container.append("<div class='row' id='row"+ curRow +"'></div>");
		} 
		
		$("#row"+curRow).append("<div id='div1' class='tableBackgroundRight' style='width:510px; padding:10px 0 0px 10px;margin-bottom:30px' >\
									<div id='div2' class='' style='width:505px;padding:2px 2px 2px 2px'>\
										<h2><a style='display: inline-block;' href='http://localhost/Project/posting_page/postingTest.html?post_id="+postInfo.P_id+"' target='_blank'>"+postInfo.title+"</a></h2>\
										<h5><span class='glyphicon glyphicon-time'></span>  Post by <span id='post_owner2'><a href='http://localhost/Project/user%20page/user.html?user="+postInfo.creator_name+"'>"+postInfo.creator_name+"</a></span>, <span id='post_time'>2016-04-01 10:28:00</span>\
												<span class='glyphicon glyphicon-map-marker' id ='location_val"+curRow+"'>\
													<button class='hintModal' style='background-color: transparent; border: 0;'><span id='post_location'>"+postInfo.L_name+"</span>\
												</button>\
										</h5>\
										<hr>\
										<p><span id='post_content"+curRow+"'>Here are all the words.</span></p>\
										<img id = 'image"+curRow+"' src='http://ss.bdimg.com/static/superman/img/logo/bd_logo1_31bdc765.png' style='width:480px'></img>\
										<video id='media"+curRow+"' style='display:block;width:480px;' controls>\
											<source id='post_video' src='../Media/post media/1/1.mp4' type='video/mp4'>\
										</video>\
									</div>\
								</div>\
							</div>");
		if(postInfo.textfile ==null||postInfo.textfile ==''){
			$('#post_content'+curRow).remove();
			}
			else {
				document.getElementById('post_content'+curRow).innerHTML= postInfo.textfile.toString();
			}
		if(postInfo.L_id ==null){
			$('#location_val'+curRow).remove();
			}else{
				document.getElementById('location_val'+curRow).innerHTML = postInfo.L_name.toString();
			}
		if(postInfo.image ==null || postInfo.image ==''){
			$('#image'+curRow).remove();
			}else{
				document.getElementById('image'+curRow).src= postInfo['image'].toString();
			}
		if(postInfo.video ==null||postInfo.video ==''){
			$('#media'+curRow).remove();
			}else{
				document.getElementById('media'+curRow).src= postInfo['video'].toString();
				document.getElementById('media'+curRow).load();
			}
// if(postInfo.L_id !=null){$('#location'+curRow).append(" @"+ postInfo.L_name+"");}
// $('#content'+curRow).append("<p>"+postInfo.textfile+"</p>");

		PersonCardView.initTooltip();
		
		// 逐渐增加行列。
		curRow += 1;
	}
};

// Yujia Zhai ---- onlick to send addFriend request
function addFriend() {
	// alert("addFriend function begin:");
	$.ajax({
                url: "addFriend.php", //请求验证页面 
                type: "POST", //请求方式
                data: "add_from_user=" + viewer_id.toString() + 
                      "&add_to_user=" + owner_id.toString(),
                success: function (addFriend_result) {
                		window.parent.myAlert ("Request has been sent！");
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
	