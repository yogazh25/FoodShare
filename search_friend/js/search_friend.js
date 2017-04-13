var viewer_id;
var page_owner_id;
var isFinished = false;
var result;
var isstarted = true;

function autoResize() {
	$("#SearchFriend_frame",parent.document).css("height",$("body").height() + "px");
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
			//alert(viewer_id);
		}
	});
	
    var src = window.parent.location.href;
	//alert (src);	
    var I = src.indexOf("?user=") + 6; 
    //alert(I);
    var T = src.indexOf("?user="); 
    //Yujia 
    //T = 'chelseaisgood';

    //===========
    //alert(T);
    //alert(src.length);
    //alert(src); 
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
    page_owner_id = src.substr(src.indexOf("?user=") + 6, endofid-src.indexOf("?user=")-6 ); 
	//alert(page_owner_id);
	PersonCardView.init("resultContainer");
	loadAllfriends();
	
	
	function loadAllfriends(){
		//alert("loading");
		$("#resultContainer").empty();
		//PersonCardView.refresh();
		autoResize();
		result =null;
		var keyword ="I";
		var scope_num = 3;
		var search_input_startpoint = "Today";
		//alert("pass it");
		// ask for posting lists
		$.ajax({
				url: "search_friends.php",
				type: "POST",
				dataType: "json", 
				async: false,
				data: "viewname=" + viewer_id
					+ "&checkname=" + page_owner_id,
				success: function(call) {
					//alert("return works");
					result = call;
					
					if(result == null){
						$('.theme-popover-mask').fadeIn(100);
						window.parent.myAlert("This user may have no friend or hide all his friend relations!");
						$('.messagePopButton').click(function() {
							$('.theme-popover-mask').fadeOut(500);
						});
						return;
					}
					
					for (var index in result) {
						PersonCardView.newCard(result[index]);
						//alert (index);
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
		var tem_url;
		if(personInfo.pic!=null){
			//alert(result.pic.toString());
			tem_url = timestamp(personInfo.pic.toString());
			//alert(tem_url);
			//document.getElementById("currentphoto").src= tem_url.toString();
		}else{
			tem_url = timestamp("../face.png");
		}
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
		
		$("#row"+curRow).append("<div class='col-md-12' style='padding-bottom:20px'>\
									<div class='tableBackground1st'>\
										<div class='tableBackground2ed'>\
											<i class='glyphicon glyphicon-plus' title='点此查看该用户微信二维码'></i> \
											<i class='glyphicon glyphicon-envelope' id='Notification" + curRow + "' data-toggle='modal' data-target='#noteModal' title='向该用户发送站内消息'></i> \
										</div> \
										<div class='tableBackgroundRight'>\
											\
											<div class='picBox'>\
												<img src ='"+ tem_url +"'></img>\
											</div>\
											<div class='detailContent'>\
												<h1><span><a href='http://localhost/Project/user%20page/user.html?user="+personInfo.user_name+"' target='_blank' >" + personInfo.user_name + "</a></span></h1>\
											</div>\
											<div class='usrAbilityContainer'>\
												<input id='addFriend_"+ personInfo.user_name+"' style='position:relative;' class='btn' type='button' value='Add As Friend' onclick = 'addFriend(this.id)'></input>\
											</div>\
										</div>\
									</div>\
								</div>\
							</div>"
											   );
											   
											   
		if(viewer_id == personInfo.user_name) {
    	 document.getElementById("addFriend_"+personInfo.user_name).value = "Edit My Profile";
    	 $("#"+"addFriend_"+personInfo.user_name).remove();
    	 //document.getElementById("addFriend_"+personInfo.user_name).disabled = ' ';  // user_name cannot be edited.
		} else {
			$.ajax({
					url: "if_friend.php", //请求验证页面 
					type: "POST", //请求方式
					data: "from_user_name=" + viewer_id.toString() + 
						  "&to_user_name=" + personInfo.user_name.toString(),
					success: function (call) {
						if (call=="is_friend"){
							document.getElementById("addFriend_"+personInfo.user_name).value = "Already Friend";
							// $("#addFriend").remove();
							 document.getElementById("addFriend_"+personInfo.user_name).disabled = ' ';
							} // else { alert (1);}
					}
				});
    	
		}

		//if(postInfo.L_id !=null){$('#location'+curRow).append(" @"+ postInfo.L_name+"");}
		//$('#content'+curRow).append("<p>"+postInfo.textfile+"</p>");

		// 为新增的名片初始化按钮的提示框
		PersonCardView.initTooltip();
		
		// 逐渐增加行列。
		curRow += 1;
	}
};

function search_friends(){
	$("#resultContainer").empty();
	autoResize();
	var name_result = document.getElementById("name_keyword").value;
	//alert(name_result);
	for (var index in result) {
		//alert(result[index].user_name);
		//alert(name_result.toString().indexOf(result[index].user_name.toString()));
		//alert(result[index].user_name.indexOf(name_result));
		if(result[index].user_name.toLowerCase().indexOf(name_result.toLowerCase())>=0){
			//alert('yes');
			PersonCardView.newCard(result[index]);
		}
		//alert (index);
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

//$('#content'+curRow).append("<span><img id='post_image' style='display:block;width:100%;' src='http://localhost/Project/Media/post%20media/1/favourite.jpg ' alt='some_text'></span><br> ");
		//显示个人名片领域与颜色对照表
		//生成personal_main.html里的div标签
		/*
		var idx = 0;
		var field_num = 0;
		for (field_name in personInfo.field) {
			$("#abilityColorTable" + personInfo.user_id + "").append("<div id='" + personInfo.user_id + "' class='box-word'></div>");
			$(".box-word:last").append("<div class='box' style='background:" + color[idx] + "'></div>");
			$(".box-word:last").append("<div class='word' style='color:" + color[idx] + "'>" + field_name + "</div>");
			field_num++;
			idx = (idx + 1) % 10;
		}
		*/
		/*
		if (field_num == 0) {
			$("#abilityDetail" + personInfo.user_id).append("<span class='abilityNone'>暂未添加能力</span>");
		}
		/*
		/*
		//显示个人名片上的能力图
		for (field_name in personInfo.field){
			field_num++;
			for (index in  personInfo.field[field_name]) {
				var selfComment = personInfo.field[field_name][index].selfComment;
				var abilityName= personInfo.field[field_name][index].abilityName;
				var curColor = $('#abilityColorTable' + personInfo.user_id + ' .word:contains('+field_name+')').css("color");
				$("#abilityDetail" + personInfo.user_id + "").append("<p class='tooltip' style='z-index:1040; background-color:"+ curColor +"'title='"+ selfComment +"'>"+ abilityName +"</p>");
			}
		}
		
		//判断是否显示联系方式
		if (personInfo.hidden_privacy == 'H') {
			$('#row'+ curRow +' .contactContent').addClass('defaultContactContent');
			$('#row'+ curRow +' .defaultContactContent').removeClass('contactContent');
			$('#row'+ curRow +' .defaultContactContent').html("该用户设置了不显示联系方式");
			$('#row'+ curRow +' .contactContent').empty();
		}
		 */
	/*
$(document).ready(function(){
		//点击弹窗的ok按钮，弹窗消失
		$('.messagePopButton').click(function(){
			$('.messagePopOut').fadeOut(100);
		})
})
function myAlert(alertMessage){
	$('.messagePopText').text(alertMessage);
	$('.messagePopOut').fadeIn(500);
}

*/
