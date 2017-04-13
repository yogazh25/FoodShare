var scope_array = new Array("Invalid", "Friends","FOF","ALL");
var type_array = new Array("Invalid", "Profile","Postings");
var time_array = new Array("Invalid", "Today", "Last three days", "Last seven days","Last month", "Last year");
var viewer_id;
var isFinished = false;
var result;

function autoResize() {
	$("#SearchPeople_frame",parent.document).css("height",$("body").height() + "px");
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
})

function search(){
	//alert("searching");
	var keyword = document.getElementById("keyword").value;
	var scope_num = document.getElementById("scope").selectedIndex;
	var search_type_num = document.getElementById("search_type").selectedIndex;
	var start_point_num = document.getElementById("start_point").selectedIndex;
	var search_input_scope;
	var search_input_type;
	var search_input_startpoint;
	
	$("#resultContainer").empty();
	PersonCardView.refresh();
	autoResize();
	var isSecondTime = true;
	result =null;
	
	//alert(scope);
	if( (keyword=="") || (scope_num==0) || (search_type_num==0) || (start_point_num==0) ){
		if(keyword=="") {alert("Please specify the keyword!");}
		if(scope_num==0) {alert("Please specify the search scope!");}
		if(search_type_num==0) {alert("Please specify the search type!");}
		if(start_point_num==0) {alert("Please specify the search starttime!");}
		return
	}else{
		isFinished = false;
		isSecondTime = false;
		document.getElementById("Search Constraint").innerHTML = "XXXXXXXXXXXXXXXXXXXXXXX";
		search_input_scope = scope_array[scope_num];
		search_input_type = type_array[search_type_num];
		search_input_startpoint = time_array[start_point_num];
		//alert(search_input_scope);
		//alert(search_input_type);
		//alert(search_input_startpoint);
		if(search_input_type == "Postings"){
			//alert("Postings Successful!");
			//$("#resultContainer").append('<div class="showMore"><div class="showMoreText" onclick="showMore()">Show More</div></div>')
			// ask for posting lists
			$.ajax({
				url: "search_posting.php",
				type: "POST",
				dataType: "json", 
				async: false,
				data: "keyword=" + keyword
					+ "&search_username=" + viewer_id
					+ "&search_scope=" + scope_num
					+ "&search_starttime_type=" + search_input_startpoint,
				success: function(call) {
					result = call;
					//alert(result[0]["creator_name"]);
					//alert(result[1]["creator_name"]);
					//alert(result[2]["creator_name"]);
					/*
					for (var index in result) {
						alert(result[index]["creator_name"]);
					}
					*/
					
					// No matched results
					if (result == null) {
						isFinished = true;
						$('.theme-popover-mask').fadeIn(100);
						window.parent.myAlert("No Matched Results!");
						$('.messagePopButton').click(function() {
							$('.theme-popover-mask').fadeOut(500);
						});
						return;
					}
					$(".showMore").remove();
					
					if(result.length <=5){
						for (var index in result) {
							PersonCardView.newCard(result[index]);
						}
						autoResize();
						return;
					}else{
						for (var index=0;index<5;index++) {
							PersonCardView.newCard(result[index]);
						}
					}
					
					$(".abilityDetail").fadeIn(700, function(){
						//标签显示之后，初始化其tooltip功能
					  initToolTip();
					});
					
					$("#resultContainer").append('<div class="showMore" ><div class="showMoreText" onclick="showMore()">Show All</div></div>')
					
					autoResize();
					
				}
			})
		}
	}	
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
	

var color = 	['#e74c3c', '#f1c40f', '#2ecc71', '#e67e22', '#3498db', '#1abc9c', '#9b59b6', '#ecf0f1', '#34495e', '#95a5a6'];
var highlight = ['#c0392b', '#f39c12', '#27ae60', '#d35400', '#2980b9', '#16a085', '#8e44ad', '#bdc3c7', '#2c3e50', '#7f8c8d'];
	
	
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
		
		/*
		if (personInfo.gender == "男") 
			var genderImg = public_url+"/img/male.png";
		else if (personInfo.gender == "女") 
			var genderImg = public_url+"/img/female.png";
		else
			var genderImg = "";
		*/
		
		$("#row"+curRow).append("<div id='div1' class='tableBackgroundRight' style='width:510px; padding:10px 0 0px 10px;margin-bottom:30px' >\
									<div id='div2' class='' style='width:505px;padding:2px 2px 2px 2px'>\
										<h2><a style='display: inline-block;' href='http://localhost/Project/posting_page/postingTest.html?post_id="+postInfo.P_id+"' target='_blank'>"+postInfo.title+"</a></h2>\
										<h5><span class='glyphicon glyphicon-time'></span>  Post by <span id='post_owner2'><a parent.location.href='http://localhost/Project/user%20page/user.html?user="+postInfo.creator_name+"'>"+postInfo.creator_name+"</a></span>, <span id='post_time'>2016-04-01 10:28:00</span>\
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
		if(postInfo.textfile ==null){
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
		if(postInfo.image ==null){
			$('#image'+curRow).remove();
			}else{
				document.getElementById('image'+curRow).src= postInfo['image'].toString();
			}
		if(postInfo.video ==null){
			$('#media'+curRow).remove();
			}else{
				document.getElementById('media'+curRow).src= postInfo['video'].toString();
				document.getElementById('media'+curRow).load();
			}
// if(postInfo.L_id !=null){$('#location'+curRow).append(" @"+ postInfo.L_name+"");}
// $('#content'+curRow).append("<p>"+postInfo.textfile+"</p>");



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
		// 为新增的名片初始化按钮的提示框
		PersonCardView.initTooltip();
		
		// 逐渐增加行列。
		curRow += 1;
	}
};
