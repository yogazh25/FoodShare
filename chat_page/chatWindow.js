var viewer_id;
var page_owner_id;
var isFinished = false;
var result;
var isstarted = true;

var last_chat_time;
var myVar = setInterval(get_new_chat, 10000);


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
	/*
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

	*/
	PersonCardView.init("chatUsers");
	loadAllfriends();
	
	
	function loadAllfriends(){
		//alert("loading");
		$("#chatUsers").empty();
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
					+ "&checkname=" + viewer_id,
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
		$.ajax({
               url: "getPhotoaddr.php", //你处理上传文件的服务端
               type:"POST",
               data: "user_id=" + personInfo.user_name,
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
		
		$("#row"+curRow).append("<div class='contact'>\
									  <img src='"+ tem_url +"' alt='' class='contact__photo' />\
									  <span class='contact__name' id ='"+ personInfo.user_name +"' onclick='showChatWindow(this.id);''>" + personInfo.user_name + "</span>\
								</div>\
							</div>" );
		// increase row by row;
		curRow += 1;
	}
};

function search_friends(){
	$("#chatUsers").empty();
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
/*=================================Search Friend END=======================================================*/
/*=================================Click Friend to chat BEGIN==============================================*/
function showChatWindow(other_user_name) {
	changeHeader(other_user_name);
	loadAllHistory();
}
function changeHeader(change_name){
	 document.getElementById("to_chat_user_name").innerHTML = change_name;
}

function loadAllHistory(){   /*========================Load History Begin==========================*/
	$("#chatting").empty();
	//PersonCardView.refresh();
	autoResize();
	result =null;
	var keyword ="I";
	var scope_num = 3;
	var chat_name = document.getElementById("to_chat_user_name").innerHTML;
	//alert("pass it");
	// ask for posting lists
	$.ajax({
            url: "get_all_chats.php", //请求验证页面 
            type: "POST", //请求方式
            dataType: "json", 
            data: "userA=" + viewer_id + 
                  "&userB=" + chat_name,
			success: function(call) {
				// alert("return works");
				result = call;
				
				if(result == null){
					$('.theme-popover-mask').fadeIn(100);
					window.parent.myAlert("No chatting History");
					$('.messagePopButton').click(function() {
						$('.theme-popover-mask').fadeOut(500);
					});
					return;
				}
				historyView.init("chatting");
				historyView.refresh();

				for (var index in result) {
					// alert(1);
					historyView.newCard(result[index]);
					//alert (index);
				}
				autoResize();
			}
		})

}

var historyView = {
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
	newCard: function(chatInfo) {

		//alert("newCard");
		if ($("#rowHis"+curRow).length == 0) {
			container.append("<div class='rowHis' id='rowHis"+ curRow +"'></div>");
		}
		var tem_url;
		$.ajax({
               url: "getPhotoaddr.php", //你处理上传文件的服务端
               type:"POST",
               data: "user_id=" + chatInfo.from_user_name,
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
		
		if (isstarted){
			$("#rowHis"+curRow).append("	<div class='messagePopOut' style='display:none'>\
											<div class='messagePopText'>\
											</div>\
											<div class='messagePopButton'>\
												OK\
											</div>  \
										</div> \
										<div>");
			isstarted = false;
		}
		var msgType;
		if(chatInfo.from_user_name == viewer_id){
			msgType = 'myMsg';
			$("#rowHis"+curRow).append("<div class='"+ msgType +"' id='chatbox_"+ curRow+"'>\
									<span class='contact_content' id='Mine' ><text style = 'fontsize:22px'>"+chatInfo.comment_content+"</text></span>\
			   		    			<img src='"+tem_url+"' alt='' class='contact__photo' />\
			   		    		</div>\
							</div>");

		}else{
			msgType = 'notMyMsg';
			$("#rowHis"+curRow).append("<div class='"+ msgType +"' id='chatbox_"+ curRow+"'>\
			   		    			<img src='"+tem_url+"' alt='' class='contact__photo' />\
			   		    			<span class='contact_content' id='notMine'>"+chatInfo.comment_content+"</span>\
			   		    		</div>\
							</div>");
		}
		last_chat_time = chatInfo.comment_time;
		console.log(last_chat_time);
		// 逐渐增加行列。
		// var alertCom = chatInfo.comment_content;
		// alert(alertCom)；

		curRow += 1;
	}
};/*========================Load History End==========================*/

/*=================================Click Friend to chat END==============================================*/
/*=================================Press 'Enter' to send BEGIN===========================================*/
document.onkeydown=function(e){
	var msgContent = document.getElementById("chat_input").value;
	if(e.keyCode == 13 && e.ctrlKey){
		document.getElementById("chat_input").value += "\n";
	}else if(e.keyCode == 13){
	// Avoid line-feed when 
 		e.preventDefault();
	// Sending Action
		if(document.getElementById("chat_input").value != ''){
// alert(document.getElementById("chat_input").value);
			// var myNewMsg = [{
			// 	"comment_content": msgContent,
			// 	"from_user_name": viewer_id,
			// 	"to_user_name": document.getElementById("to_chat_user_name").innerHTML
			// }];

			// var toJsonMsg = JSON.stringify(myNewMsg);
			var success = [{"from_user_name":viewer_id,
							"to_user_name":document.getElementById("to_chat_user_name").innerHTML,
							"comment_content":msgContent}];
			historyView.newCard(success[0]);	
			$.ajax({
	            url: "insert_new_chat.php", //请求验证页面 
	            type: "POST", //请求方式
	            dataType: "json", 
	            data: "userA=" + viewer_id + 
	                  "&userB=" + document.getElementById("to_chat_user_name").innerHTML +
	                  "&newChat=" + msgContent,

				success: function(call) {
					// alert("insert new chat begin");
					result = call;				
				}
			})

			document.getElementById("chat_input").value = '';
		} else {
			// console.log("no");
			alert("message cannot be null");
			document.getElementById("chat_input").value = '';
		}	
	}
}
/*=================================Press 'Enter' to send END===========================================*/

function get_new_chat(){
	console.log("success");

	console.log(last_chat_time);
	console.log("success");
	if (document.getElementById("to_chat_user_name").innerHTML != "Chatting Page!"){
		$.ajax({
	            url: "request_new_chat.php", //请求验证页面 
	            type: "POST", //请求方式
	            dataType: "json", 
	            data: //"userA=" + document.getElementById("to_chat_user_name").innerHTML + 
	                  //"&userB=" + viewer_id +
	                  "userA=" +viewer_id+ 
	                  "&userB=" + document.getElementById("to_chat_user_name").innerHTML +
	                  "&lasttime=" + last_chat_time,

				success: function(callNew) {

				console.log(callNew);
				console.log("======");

					var resultNew = callNew;
					if(resultNew == null){
						$('.theme-popover-mask').fadeIn(100);
						//window.parent.myAlert("No chatting History");
						$('.messagePopButton').click(function() {
							$('.theme-popover-mask').fadeOut(500);
						});
						return;
					}
					for (var index in resultNew) {
					// alert(1);
					historyView.newCard(resultNew[index]);
					last_chat_time = resultNew[index].comment_time;
					console.log(last_chat_time);
					//alert (index);
					}
					resultNew = null;

				}
		})
	}
		
}




