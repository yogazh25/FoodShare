/**
 * 搜人界面名片库
 */
// 定义颜色 原色数组 和 高亮数组
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
		alert("newCard");
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
