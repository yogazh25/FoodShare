var viewer_id;
var page_owner_id;
var isFinished = false;
var result;
var isstarted = true;

function autoResize() {
	$("#NoticePage_frame",parent.document).css("height",$("body").height() + "px");
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
		}
	});
	
	PersonCardView.init("resultContainer");
	loadAllNotices();
	
	
	function loadAllNotices(){
		$("#resultContainer").empty();
		//PersonCardView.refresh();
		autoResize();
		result =null;
		/*
		var keyword ="I";
		var scope_num = 3;
		var search_input_startpoint = "Today";*/
		//alert("pass it");
		// ask for posting lists
		$.ajax({
				url: "load_notice.php",
				type: "POST",
				dataType: "json", 
				async: false,
				data: "viewname=" + viewer_id,
				success: function(call) {
					//alert("return works");
					result = call;
					
					if(result == null){
						$('.theme-popover-mask').fadeIn(100);
						window.parent.myAlert("You have no new notisfications!");
						$('.messagePopButton').click(function() {
							$('.theme-popover-mask').fadeOut(500);
						});
						return;
					}
					
					for (var index in result) {
						PersonCardView.newCard(result[index]);
						//alert (index);
						autoResize();
					}
	
					autoResize();
				}
			})
			
	}



})


	
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
	newCard: function(personInfo) {
		//alert("newCard");
		if ($("#row"+curRow).length == 0) {
			container.append("<div class='row' id='row"+ curRow +"'></div>");
		}
		
		var tem_url;/*
		if(personInfo.pic!=null){
			//alert(result.pic.toString());
			tem_url = timestamp(personInfo.pic.toString());
			//alert(tem_url);
			//document.getElementById("currentphoto").src= tem_url.toString();
		}else{
			tem_url = timestamp("../face.png");
		}
		*/
		//alert(personInfo.people);
		$.ajax({
               url: "getPhotoaddr.php", //你处理上传文件的服务端
               type:"POST",
               data: "user_id=" + personInfo.people,
			   cache: false, 
			   async: false,
               dataType: 'JSON',
               success: function (result) {
					//alert(curRow);
					//alert(result.pic);
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
		
		//alert(tem_url);
		
		if (isstarted){
			$("#row"+curRow).append("	<div class='messagePopOut' style='display:none'>\
											<div class='messagePopText'>\
											</div>\
											<div class='messagePopButton'>\
												OK\
											</div>  \
										</div> \
										<div>");
			isstarted = false;
		}
		
		var bgcolor_table;
		switch(personInfo.new_item_type)
		{
		case 'update':
		  bgcolor_table = '#1597d4';
		  $("#row"+curRow).append("<div class='col-md-12' style='padding-bottom:20px'>\
									<div class='tableBackground1st'>\
										<div class='tableBackground2ed' style='background-color:"+ bgcolor_table +";'>\
										</div> \
										<div class='tableBackgroundRight'>\
											\
											<div >\
												<img class='picBox' class='img-circle img-responsive' src ='"+ tem_url.toString() +"'></img>\
											</div>\
											<div >\
												<span class='namebox'><a href='http://localhost/Project/user%20page/user.html?user="+personInfo.people+"' target='_blank' ><h2>" + personInfo.people + "</a></h2></span>\
											</div>\
											<div >\
												<span class='newtype'><h3>updates his/her profile!</h3></span>\
											</div>\
											<div class='timestmap'>\
												<h4><span>" + personInfo.new_item_time + "</span></h4>\
											</div>\
											<div class='usrAbilityContainer'>\
											</div>\
										</div>\
									</div>\
								</div>\
							</div>"
											   );		  
		  break;
		case 'be_friend':
		  bgcolor_table = '#800000';
		  $("#row"+curRow).append("<div class='col-md-12' style='padding-bottom:20px'>\
									<div class='tableBackground1st'>\
										<div class='tableBackground2ed' style='background-color:"+ bgcolor_table +";'>\
										</div> \
										<div class='tableBackgroundRight'>\
											\
											<div >\
												<img class='picBox' class='img-circle img-responsive' src ='"+ tem_url +"'></img>\
											</div>\
											<div >\
												<span class='namebox'><a href='http://localhost/Project/user%20page/user.html?user="+personInfo.people+"' target='_blank' ><h2>" + personInfo.people + "</a></h2></span>\
											</div>\
											<div >\
												<span class='newtype'><h3>Congratulations! <p><b>"+personInfo.people+"</b> has accpeted your friend request.</p></h3></span>\
											</div>\
											<div class='timestmap'>\
												<h4><span>" + personInfo.new_item_time + "</span></h4>\
											</div>\
										</div>\
									</div>\
								</div>\
							</div>"
		);
		  break;
		 case 'leave_message':
		  bgcolor_table = '#2E8B57';
		  $("#row"+curRow).append("<div class='col-md-12' style='padding-bottom:20px'>\
									<div class='tableBackground1st'>\
										<div class='tableBackground2ed' style='background-color:"+ bgcolor_table +";'>\
										</div> \
										<div class='tableBackgroundRight'>\
											\
											<div >\
												<img class='picBox' class='img-circle img-responsive' src ='"+ tem_url +"'></img>\
											</div>\
											<div >\
												<span class='namebox'><a href='http://localhost/Project/user%20page/user.html?user="+personInfo.people+"' target='_blank' ><h2>" + personInfo.people + "</a></h2></span>\
											</div>\
											<div >\
												<span class='newtype'><h3>leaves you a message:</h3></span>\
											</div>\
											<div class='detailbox' style='font-color:red'>\
												<span class='newtype'><h3>''"+personInfo.new_item_content+"''</h3></span>\
											</div>\
											<div class='timestmap'>\
												<h4><span>" + personInfo.new_item_time + "</span></h4>\
											</div>\
										</div>\
									</div>\
								</div>\
							</div>"
		);
		  break;
		case 'like_loca':
		  bgcolor_table = '#F5DEB3';
		  $("#row"+curRow).append("<div class='col-md-12' style='padding-bottom:20px'>\
									<div class='tableBackground1st'>\
										<div class='tableBackground2ed' style='background-color:"+ bgcolor_table +";'>\
										</div> \
										<div class='tableBackgroundRight'>\
											\
											<div >\
												<img class='picBox' class='img-circle img-responsive' src ='"+ tem_url +"'></img>\
											</div>\
											<div >\
												<span class='namebox'><a href='http://localhost/Project/user%20page/user.html?user="+personInfo.people+"' target='_blank' ><h2>" + personInfo.people + "</a></h2></span>\
											</div>\
											<div >\
												<span class='newtype'><h3>''"+'I love your place <b>'+personInfo.new_item_content+"</b> <p style='postions:relative;left:50px'>shared in your posting <a href='http://localhost/Project/posting_page/postingTest.html?post_id="+personInfo.link_addr+"' target='_blank'>"+personInfo.carrier_name+"</a>.''</p>"+"</h3></span>\
											</div>\
											<div class='timestmap'>\
												<h4><span>" + personInfo.new_item_time + "</span></h4>\
											</div>\
										</div>\
									</div>\
								</div>\
							</div>"
		);
		  break;
		case 'leave_comment':
		  bgcolor_table = '#FFD700';
		  var comment_cut = personInfo.new_item_content;
		  if(personInfo.new_item_content.length>30){
			 comment_cut = personInfo.new_item_content.substr(0,30)+"...";
		  }
		  $("#row"+curRow).append("<div class='col-md-12' style='padding-bottom:20px'>\
									<div class='tableBackground1st'>\
										<div class='tableBackground2ed' style='background-color:"+ bgcolor_table +";'>\
										</div> \
										<div class='tableBackgroundRight'>\
											\
											<div >\
												<img class='picBox' class='img-circle img-responsive' src ='"+ tem_url +"'></img>\
											</div>\
											<div >\
												<span class='namebox'><a href='http://localhost/Project/user%20page/user.html?user="+personInfo.people+"' target='_blank' ><h2>" + personInfo.people + "</a></h2></span>\
											</div>\
											<div >\
												<span class='newtype'><h3>"+"leaves a comment: <b>''"+comment_cut+"''</b> <p style='postions:relative;left:50px'>in your posting <a href='http://localhost/Project/posting_page/postingTest.html?post_id="+personInfo.link_addr+"' target='_blank'>"+personInfo.carrier_name+"</a>.</p>"+"</h3></span>\
											</div>\
											<div class='timestmap'>\
												<h4><span>" + personInfo.new_item_time + "</span></h4>\
											</div>\
										</div>\
									</div>\
								</div>\
							</div>"
		);
		  
		  break;
		case 'reply_comment':
		  bgcolor_table = '#EE82EE';
		  var comment_cut = personInfo.new_item_content;
		  if(personInfo.new_item_content.length>30){
			 comment_cut = personInfo.new_item_content.substr(0,30)+"...";
		  }
		  $("#row"+curRow).append("<div class='col-md-12' style='padding-bottom:20px'>\
									<div class='tableBackground1st'>\
										<div class='tableBackground2ed' style='background-color:"+ bgcolor_table +";'>\
										</div> \
										<div class='tableBackgroundRight'>\
											\
											<div >\
												<img class='picBox' class='img-circle img-responsive' src ='"+ tem_url +"'></img>\
											</div>\
											<div >\
												<span class='namebox'><a href='http://localhost/Project/user%20page/user.html?user="+personInfo.people+"' target='_blank' ><h2>" + personInfo.people + "</a></h2></span>\
											</div>\
											<div >\
												<span class='newtype'><h3>"+"replies to your comment: <b>''"+comment_cut+"''</b> <p style='postions:relative;left:50px'>in posting <a href='http://localhost/Project/posting_page/postingTest.html?post_id="+personInfo.link_addr+"' target='_blank'>"+personInfo.carrier_name+"</a>.</p>"+"</h3></span>\
											</div>\
											<div class='timestmap'>\
												<h4><span>" + personInfo.new_item_time + "</span></h4>\
											</div>\
										</div>\
									</div>\
								</div>\
							</div>"
		);
		  break;
		case 'like_post':
		  bgcolor_table = '#2F4F4F';
		  $("#row"+curRow).append("<div class='col-md-12' style='padding-bottom:20px'>\
									<div class='tableBackground1st'>\
										<div class='tableBackground2ed' style='background-color:"+ bgcolor_table +";'>\
										</div> \
										<div class='tableBackgroundRight'>\
											\
											<div >\
												<img class='picBox' class='img-circle img-responsive' src ='"+ tem_url +"'></img>\
											</div>\
											<div >\
												<span class='namebox'><a href='http://localhost/Project/user%20page/user.html?user="+personInfo.people+"' target='_blank' ><h2>" + personInfo.people + "</a></h2></span>\
											</div>\
											<div >\
												<span class='newtype'><h3>''"+"I love your post <a href='http://localhost/Project/posting_page/postingTest.html?post_id="+personInfo.link_addr+"' target='_blank' ><b>"+personInfo.new_item_content+"</b> </a>,<p style='postions:relative;left:50px'>hoping you can bring more sharing with us.''</p>"+"</h3></span>\
											</div>\
											<div class='timestmap'>\
												<h4><span>" + personInfo.new_item_time + "</span></h4>\
											</div>\
										</div>\
									</div>\
								</div>\
							</div>"
		);
		  break;
		case 'post':
		  bgcolor_table = '#4682B4';
		  $("#row"+curRow).append("<div class='col-md-12' style='padding-bottom:20px'>\
									<div class='tableBackground1st'>\
										<div class='tableBackground2ed' style='background-color:"+ bgcolor_table +";'>\
										</div> \
										<div class='tableBackgroundRight'>\
											\
											<div >\
												<img class='picBox' class='img-circle img-responsive' src ='"+ tem_url +"'></img>\
											</div>\
											<div >\
												<span class='namebox'><a href='http://localhost/Project/user%20page/user.html?user="+personInfo.people+"' target='_blank' ><h2>" + personInfo.people + "</a></h2></span>\
											</div>\
											<div >\
												<span class='newtype'><h3>"+"has a new post <a href='http://localhost/Project/posting_page/postingTest.html?post_id="+personInfo.link_addr+"' target='_blank' ><b>"+personInfo.new_item_content+"</b> </a>,<p style='postions:relative;left:50px'>and just can't wait no longer to share the joy with u! :)</p>"+"</h3></span>\
											</div>\
											<div class='timestmap'>\
												<h4><span>" + personInfo.new_item_time + "</span></h4>\
											</div>\
										</div>\
									</div>\
								</div>\
							</div>"
		);
		  
		  break;
		case 'request':
		  bgcolor_table = '#FF4500';
		   $("#row"+curRow).append("<div class='col-md-12' style='padding-bottom:20px'>\
									<div class='tableBackground1st'>\
										<div class='tableBackground2ed' style='background-color:"+ bgcolor_table +";'>\
										</div> \
										<div class='tableBackgroundRight'>\
											\
											<div >\
												<img class='picBox' class='img-circle img-responsive' src ='"+ tem_url +"'></img>\
											</div>\
											<div >\
												<span class='namebox'><a href='http://localhost/Project/user%20page/user.html?user="+personInfo.people+"' target='_blank' ><h2>" + personInfo.people + "</a></h2></span>\
											</div>\
											<div >\
												<span class='newtype'><h3>"+"has sent a friend request to you ! </h3></span>\
											</div>\
											<div class='timestmap'>\
												<h4><span>" + personInfo.new_item_time + "</span></h4>\
											</div>\
											<div class='buttonrightgroup1'>\
												<input type='button' class='btn btn-success' value='Accept' style='width:80px' id = 'accept_"+curRow+"' name = '"+ personInfo.people +"' onclick= 'acceptFriend(this.id, this.name)'>\
											</div>\
											<div class='buttonrightgroup2' id = 'proccessed_"+curRow+"'>\
												<input type='button' class='btn btn-danger' value=' Deny ' style='width:80px' id = 'deny_"+curRow+"' name = '"+ personInfo.people +"' onclick= 'denyFriend(this.id, this.name)'>\
											</div>\
										</div>\
									</div>\
								</div>\
							</div>"
		);
		  break;
		default:
		  bgcolor_table = '#A52A2A';
		  break;
		}
		/*
		if(personInfo.new_item_type != 'update' && personInfo.new_item_type !='leave_message'&& personInfo.new_item_type !='be_friend'&& personInfo.new_item_type !='like_loca'&& personInfo.new_item_type !='leave_comment'&& personInfo.new_item_type !='reply_comment'&& personInfo.new_item_type !='like_post'&& personInfo.new_item_type !='post'&& personInfo.new_item_type !='request') {
		$("#row"+curRow).append("<div class='col-md-12' style='padding-bottom:20px'>\
									<div class='tableBackground1st'>\
										<div class='tableBackground2ed' style='background-color:"+ bgcolor_table +";'>\
										</div> \
										<div class='tableBackgroundRight'>\
											\
											<div >\
												<img class='picBox' src ='"+ tem_url +"'></img>\
											</div>\
											<div >\
												<span class='namebox'><a href='http://localhost/Project/user%20page/user.html?user="+personInfo.people+"' target='_blank' ><h2>" + personInfo.people + "</a></h2></span>\
											</div>\
											<div >\
												<span class='newtype'><h3>"+personInfo.new_item_type+"</h3></span>\
											</div>\
											<div class='timestmap'>\
												<h4><span>" + personInfo.new_item_time + "</span></h4>\
											</div>\
											<div class='usrAbilityContainer'>\
												<input id='addFriend_"+ personInfo.new_item_time+"' style='position:absolute;float:right;right:100px;' class='btn' type='button' value='Add As Friend' onclick = 'addFriend(this.id)'></input>\
											</div>\
										</div>\
									</div>\
								</div>\
							</div>"
		); }*/
		//if(postInfo.L_id !=null){$('#location'+curRow).append(" @"+ postInfo.L_name+"");}
		//$('#content'+curRow).append("<p>"+postInfo.textfile+"</p>");

		// 为新增的名片初始化按钮的提示框
		PersonCardView.initTooltip();
		
		// 逐渐增加行列。
		curRow += 1;
	}
};
/*
function search_friends(){
	$("#resultContainer").empty();
	autoResize();
	var name_result = document.getElementById("name_keyword").value;
	// alert(name_result);
	for (var index in result) {
		// alert(result[index].user_name);
		// alert(name_result.toString().indexOf(result[index].user_name.toString()));
		// alert(result[index].user_name.indexOf(name_result));
		if(result[index].user_name.toLowerCase().indexOf(name_result.toLowerCase())>=0){
			// alert('yes');
			PersonCardView.newCard(result[index]);
		}
		// alert (index);
	}
	autoResize();
}

function addFriend(added_name){
	added_name = added_name.substring(10);
	$.ajax({
                url: "addFriend.php", //请求验证页面 
                type: "POST", //请求方式
                data: "add_from_user=" + viewer_id.toString() + 
                      "&add_to_user=" + added_name.toString(),
                success: function (addFriend_result) {
                	window.parent.myAlert("Friend Request has been sent!");
                }
			});
}
*/

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

	
function acceptFriend(accept_id, accept_name){
	//alert(accept_id);
	//alert(accept_name);
	var id_num = accept_id.substr(7,accept_id.length);
	//alert(id_num);
	$.ajax({
			url: "acceptFriend.php", //请求验证页面 
			type: "POST", //请求方式
			data: "accept_from_user=" + accept_name.toString() + 
				  "&accept_to_user=" + viewer_id.toString(),
			success: function (process_accept) {
				if(process_accept == "successful"){
					window.parent.myAlert("You have accepted this request!");
					remove_request(id_num, 'accepted');
				}else{
					window.parent.myAlert("This request may have been processed or expired!!");
					remove_request(id_num, 'expired');
				}
				
			}
		});
}


function denyFriend(deny_id, deny_name){
	//alert(deny_id);
	//alert(deny_name);
	var id_num = deny_id.substr(5,deny_id.length);
	//alert(id_num);
	$.ajax({
			url: "denyFriend.php", //请求验证页面 
			type: "POST", //请求方式
			data: "deny_from_user=" + deny_name.toString() + 
				  "&deny_to_user=" + viewer_id.toString(),
			success: function (process_deny) {
				if(process_deny == "successful"){
					window.parent.myAlert("You have denied this request!");
					remove_request(id_num, 'denied');
				}else{
					window.parent.myAlert("This request may have been processed or expired!!");
					remove_request(id_num, 'expired');
				}
			}
		});
}


function remove_request(row_id, type){
	$("#accept_"+row_id).remove();
	$("#deny_"+row_id).remove();
	$("#proccessed_"+row_id).append("<input type='button' class='btn btn-warning' value='"+ type +"' style='width:80px' id = 'processed_"+curRow+"'>\
							</div>"
		);
}

