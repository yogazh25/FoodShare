var scope_array = new Array("Invalid", "Friends","FOF","ALL");
var type_array = new Array("Invalid", "Profile","Postings");
var time_array = new Array("Invalid", "Today", "Last three days", "Last seven days","Last month", "Last year");
var viewer_id = 'chelseaisgood';
var isFinished = false;

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
})

function submit_search(){
	search();
}

function search(){
	alert("searching");
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
					var result = call;
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
					
					for (var index in result) {
						//alert(10);
						PersonCardView.newCard(result[index]);
					}
					
					$(".abilityDetail").fadeIn(700, function(){
						//标签显示之后，初始化其tooltip功能
					  initToolTip();
					});
					
					$("#resultContainer").append('<div class="showMore"><div class="showMoreText" onclick="showMore()">Show More</div></div>')
					
					autoResize();
					
				}
			})
		}
	}	
}

function showMore(){
		alert("isfinished:"+isFinished);
		if(isFinished){
			$('.theme-popover-mask').fadeIn(100);
		//		$('.messagePopout').css("bottom", "356px");
			window.parent.myAlert("No More Matched Results!");
			$('.messagePopButton').click(function() {
				$('.theme-popover-mask').fadeOut(500);
			});
			return;
		}
		offset += 5;
		search();
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
	newCard: function(personInfo) {
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
		
		$("#row"+curRow).append("<div>1</div>");
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
