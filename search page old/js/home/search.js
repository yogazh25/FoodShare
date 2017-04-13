/**
 * This js is for the using of searchPeople Page
 */

var allAcademy;
var allSelectedAbility = new Array();
var selectedUser = new Array();
var RecipientIndex;
var RecipientId;

function autoResize() {
	$("#SearchPeople_frame",parent.document).css("height",$("body").height() + "px");
};

function initToolTip(){
	$('.tooltip').tooltipster({
		theme: 'tooltipster-noir'
	});
};

function showHotAbility(){
	// ���̨�������е���������������ʾ
	$.ajax({url: app_url + "/Custom/SearchPeople/getHotAbility",
		type: "GET",
        success: function(result) {
        	var directionCnt = 0;
        	for (directionCnt in result){
        		$(".abilitySearchBox #L3").append('<div class="searchTag abilityTag">'+result[directionCnt]+'</div>');
        	}
        	result.slice(0,result.length);
        }
	});
}

function showHotDirectionAndAbility(){
	$.ajax({url: app_url + "/Custom/SearchPeople/getHotDirection",
		type: "GET",
        success: function(result) {
        	var directionCnt = 0;
        	for (directionCnt in result){
        		$(".abilitySearchBox #L2").append('<div class="searchTag directionTag">'+result[directionCnt]+'</div>');
        	}        	
        	showHotAbility();
        	result.slice(0,result.length);
        }
	});
}

/***
 * ��selector��ѡ��һ��tag����TagActive״̬
 * @param selector ѡ��ĳһ��selector����ֻ�ܵ�ѡTagActive״̬
 * @param parentSelector selector�ĸ��ڵ�selector
 */
function allowSingalChoose(selector, parentSelector){
	$(parentSelector).on("click", selector, function() {
		//�����е�selectorֻ��һ��ѡ��
		if($(this).hasClass('TagActive')){
			$(this).removeClass('TagActive');
		}
		else{
			$(selector).each(function(){
				$(this).removeClass('TagActive');
			});
			$(this).addClass('TagActive');
		}
		
	});
}

/***
 * ��selector��ѡ��һ��tag����TagActive״̬
 * @param selector ѡ��ĳһ��selector����ֻ�ܵ�ѡTagActive״̬
 * @param parentSelector selector�ĸ��ڵ�selector
 */
function allowMultiChoose(selector, parentSelector){
	$(parentSelector).on("click", selector, function() {
		//�����е�selectorֻ��һ��ѡ��
		if($(this).hasClass('TagActive')){
			$(this).removeClass('TagActive');
		}
		else{
			$(this).addClass('TagActive');
		}
	});
}

/**
 * ��ʼ�����еĵ���¼�������ʹ����Jquery�� On��̬�󶨷����������������¼ӱ�ǩ�����°���Щ��ǩ���¼�
 */
function initClickEvent() {
	// ������Щ����ı�ǩ���Ա���ѡ
	allowSingalChoose(".majorTag", ".majorTags");
	allowSingalChoose(".directionTag", ".directionTags");
	allowSingalChoose(".departmentTag", ".departmentTags");
	allowSingalChoose(".academyTag", ".academyTags");
	allowSingalChoose(".fieldTag", ".fieldTags");
	
	// ������Щ����ı�ǩ���Ա���ѡ
	allowMultiChoose(".abilityTag", ".abilityTags");
	
	// ���ѧԺ����ʾϵ��
	$(".academyTags").on("click", ".academyTag", function(){
		$.ajax({
			url:app_url + "/Custom/SearchPeople/getDepartment",
			type:"GET",
			data:"aimedAcademy="+$(this).text(),
			success:function(result){
				loadDepartment(result);
			}
		});	
	})
	
	//���ϵ����ʾרҵ
	$(".departmentTags").on("click", ".departmentTag", function(){
		$.ajax({
			url:app_url + "/Custom/SearchPeople/getMajor",
			type:"GET",
			data:"aimedDepartment="+$(this).text(),
			success:function(result){
				loadMajor(result);
			}
		});
	})
	
	// ���רҵ���������������
	$(".majorTags").on("click", ".majorTag", function(){
		var clickOne = $(this);
		$(".selectedConditionRow").append('<div class="selectedTags fromMajors">'+$(this).text()+'��</div>');
	});
	
	// �������
	$(".fieldTags").on("click", ".fieldTag", function(){	
		// �����ѡ��filed��������ѡ��field��Ӧ�ķ��������
		if($(this).hasClass("TagActive")){
			var selectedFieldName = $(this).html();
			$.ajax({
				url:app_url + "/Custom/SearchPeople/getSelectedDirectionAndAbility",
				type:"GET",
				data:"selectedFieldName=" + selectedFieldName,
				success:function(result){
					$(".abilitySearchBox #L2").empty();	
					$(".abilitySearchBox #L3").empty();	
					var directionCnt = 0;
					var abilityCnt = 0;
		        	for (directionCnt in result[0]){
		        		$(".abilitySearchBox #L2").append('<div class="searchTag directionTag">'+result[0][directionCnt]+'</div>');
		        	}
		        	for (abilityCnt in result[1]){
		        		$(".abilitySearchBox #L3").append('<div class="searchTag abilityTag">'+result[1][abilityCnt]+'</div>');
		        	}
				}
			});
		}
		else{
			$(".abilitySearchBox #L2").empty();	
			$(".abilitySearchBox #L3").empty();	
			$(".abilitySearchBox #L2").append('<div class="titleTag">���ŷ���</div>');
			$(".abilitySearchBox #L3").append('<div class="titleTag">����������</div>');
			showHotDirectionAndAbility();
		}
	})
	
	// �������
	$('.directionTags').on("click", ".directionTag", function(){
		if($(this).hasClass('TagActive')){

			var selectedDirectionName = $(this).html();
			$.ajax({
				url:app_url + "/Custom/SearchPeople/getSelectedAbility",
				type:"GET",
				data:"selectedDirectionName=" + selectedDirectionName,
				success:function(result){
					$(".abilitySearchBox #L3").empty();	
					
					//�������direction Tag�Ѿ���ѡ���������Ѿ���allSelectedDirection�У�
					//if (jQuery.inArray(selectedDirectionName, allSelectedAbility)!=-1){
					if (jQuery.inArray(selectedDirectionName, allSelectedDirection)!=-1){
						//��ability������ӡ��������XXX��������",��allDirectionVal����Ϊ��direction,�����TagActive
						$(".abilitySearchBox #L3").append('<div class="TagActive searchTag abilityTag allDirectionActive" allDirectionVal='+selectedDirectionName+'>�������'+selectedDirectionName+'��������</div>');
					}
					else{
						//��ability������ӡ��������XXX��������",��allDirectionVal����Ϊ��direction
						$(".abilitySearchBox #L3").append('<div class="searchTag abilityTag allDirectionActive" allDirectionVal='+selectedDirectionName+'>�������'+selectedDirectionName+'��������</div>');
					}
					
					var abilityCnt = 0;
					for (abilityCnt in result){
						//������ӵ�ability�Ѿ���allSelectedAbility����
						if(jQuery.inArray(result[abilityCnt], allSelectedAbility)!=-1){
							$(".abilitySearchBox #L3").append('<div class="searchTag abilityTag TagActive">'+result[abilityCnt]+'</div>');
						}
						else{
							$(".abilitySearchBox #L3").append('<div class="searchTag abilityTag">'+result[abilityCnt]+'</div>');
						}
					}
				}
			});
		}
		else {
			$(".abilitySearchBox #L3").empty();
			$(".abilitySearchBox #L3").append('<div class="titleTag">����������</div>');
			showHotAbility();
		}	
	})
	
	//�������
	$(".abilityTags").on("click", ".abilityTag", function(){
		//������ability Tag
		if($(this).hasClass('TagActive')){
			//�����ѡ�������ȫ��direction����
			if($(this).hasClass('allDirectionActive')){
				//ѡ�������ȫ��direction����������directionд��allSelectedDirection����
				//allSelectedAbility.push($(this).attr("allDirectionVal"));	
				allSelectedDirection.push($(this).attr("allDirectionVal"));	
				
				//��ƽ���ķǡ�ѡ��ȫ������tagȡ������״̬
				$(this).siblings(":not(.allDirectionActive)").removeClass("TagActive");
				
				
				//����ѡ������������ɾ�������ڴ�direction��ability
				$(this).siblings(":not(.allDirectionActive)").each(function(){
					if($.inArray($(this).html(),allSelectedAbility)!=-1){	
						//ʹƽ����ѡ����������ability��allSelectedAbility������ɾ��
						allSelectedAbility.splice($.inArray($(this).html(),allSelectedAbility),1);
						//ȥ��allSelectedAbility�Ŀ���
						allSelectedAbility = DelNullInArray(allSelectedAbility);
					}
				})
			}
			
			//�����ѡ���˷����ȫ��direction����
			else{
				//ʹƽ����ѡ����������direction���ڷǼ���״̬
				$(this).siblings(".allDirectionActive").removeClass("TagActive");
				
				
				//var DirPosInArray = $.inArray($(this).siblings(".allDirectionActive").attr("alldirectionval"),allSelectedAbility)
				var DirPosInArray = $.inArray($(this).siblings(".allDirectionActive").attr("alldirectionval"),allSelectedDirection)
				
				if (DirPosInArray!=-1)
				{
					//ʹƽ����ѡ����������direction��allSelectedDirection������ɾ��
					allSelectedDirection.splice(DirPosInArray,1);
				}
				
				//ȥ��selectedDirection�Ŀ���
				allSelectedDirection = DelNullInArray(allSelectedDirection);
				
//				//��ѡ�е����������allSelectedAbility����
				allSelectedAbility.push($(this).html());
//				alert(allSelectedAbility);
			}
			
			$("#resultContainer").empty();
		}
		//��ȡ������ability Tag
		else{
			//�����ѡ�������ȫ��direction����
			if($(this).hasClass('allDirectionActive')){
				//��ѡ�е�Direction��allSelectedDirectionɾ��
				if($.inArray($(this).attr("allDirectionVal"),allSelectedDirection)!=-1){
					allSelectedDirection.splice($.inArray($(this).attr("allDirectionVal"),allSelectedDirection),1);
				}
				//ȥ��selectedDirection�Ŀ���
				allSelectedDirection = DelNullInArray(allSelectedDirection);	
			}
			//�����ѡ���˷����ȫ��direction����
			else{
				
				if($.inArray($(this).html(),allSelectedAbility)!= -1){
					//��ѡ�е�ability��allSelectedAbilityɾ��
					allSelectedAbility.splice($.inArray($(this).html(),allSelectedAbility),1);
					//ȥ��selectedDirection�Ŀ���
					allSelectedAbility = DelNullInArray(allSelectedAbility);
				}
			}
			
		}
		
		addAllDirection();
		addAllAbility();
	})
	
	// �����ѡ������.fromAcadem��tagȡ������
	$(".selectedConditionRow").on("click", ".fromAcademy", function(){
//		var selectedTagsText = $(this).text();
		$(this).remove();
		
		// �ʶ������Զ����¼��¼�������query
		$(".selectedConditionRow").trigger("ManifyChanged");
		
//		//���majorTags�д��������ɾ����Tag,ɾ����majortag�е�TagActive��
//		$("#majorTags").children().each(function(){
//			if (($(this).text()+'��') == selectedTagsText){
//				$(this).removeClass("TagActive");
//			}
//		});	
	});
	
	// �����ѡ������.fromAbility��tagȡ������
	$(".selectedConditionRow").on("click", ".fromAbility", function(){
		var s=$(this).html();
		s=s.substring(0,s.length-1);
		
		$(".abilitySearchBox #L3").children().each(function(){
			if(($(this).text()==s)||($(this).attr("alldirectionval")==s)){
				$(this).removeClass("TagActive");
			}			
		})
		
		if($.inArray(s,allSelectedAbility)!= -1){
			//��ѡ�е�ability��allSelectedAbilityɾ��
			allSelectedAbility.splice($.inArray(s,allSelectedAbility),1);
			//ȥ��selectedDirection�Ŀ���
			allSelectedAbility = DelNullInArray(allSelectedAbility);
		}
		
		$(this).remove();
		
		// ʵ�����Ǵ���query�¼�
		// ��ΪDOMNodeRemoved���ڽڵ㳹���Ƴ�ǰ�����ģ������޷�������������������̨��
		// �ʶ�����Inserted�¼���ǿ��query
		$(".selectedConditionRow").trigger("ManifyChanged");
	});
	
	
	// �����ѡ������.fromDirection��tagȡ������
	$(".selectedConditionRow").on("click", ".fromDirection", function(){
		var s=$(this).html();
		s=s.substring(0,s.length-1);
		
		$(".abilitySearchBox #L3").children().each(function(){
			if(($(this).text()==s)||($(this).attr("alldirectionval")==s)){
				$(this).removeClass("TagActive");
			}			
		})
		
		if($.inArray(s,allSelectedDirection)!= -1){
			//��ѡ�е�ability��allSelectedDirectionɾ��
			allSelectedDirection.splice($.inArray(s,allSelectedDirection),1);
			//ȥ��selectedDirection�Ŀ���
			allSelectedDirection = DelNullInArray(allSelectedDirection);
		}
		
		$(this).remove();
		
		// ʵ�����Ǵ���query�¼�
		// ��ΪDOMNodeRemoved���ڽڵ㳹���Ƴ�ǰ�����ģ������޷�������������������̨��
		// �ʶ�����Inserted�¼���ǿ��query
		$(".selectedConditionRow").trigger("ManifyChanged");
	});
	
	
	// �����ѡɸѡ�����������ı��������tag
	$(".selectedConditionRow").on("click",".fromSearchResult",function() {  
		var selectedTagsText = $(this).text();				
		var has = false;
		$("#searchResultContent").children().each(function(){
			if (selectedTagsText == ($(this).text() +'��')) {
				has = true;
			}
		});
		
		$(this).remove();
		// ʵ�����Ǵ���query�¼�
		// ��ΪDOMNodeRemoved���ڽڵ㳹���Ƴ�ǰ�����ģ������޷�������������������̨��
		// �ʶ�����Inserted�¼���ǿ��query
		$(".selectedConditionRow").trigger("ManifyChanged");
		
		if (!has) {
			var abilityName = selectedTagsText.replace(/��$/,"");
			$("#searchResultContent").append("<p class='resultTag'>"+ abilityName + "</p>");
		}		
	});  
	
	// ����ı�������Ľ��tag
	$("#searchResultContent").on("click",".resultTag",function() { 
		var resultTagText = $(this).text();
		var has = false;
		
		$(".selectedConditionRow").children().each(function(){
			if ($(this).text() == (resultTagText+'��')) {
				has = true;
			}
		});
		 if (!has) {
			 $(".selectedConditionRow").append('<div class="selectedTags fromSearchResult">'+$(this).text()+'��</div>');
		 }
		 $(this).remove();
		 $(".selectedConditionRow").trigger("ManifyChanged");
	});
	
	
	$("#searchResult").on("click", ".searchResultClose", function(){
		$("#searchResult").fadeOut(200);
	});
	//����վ���ű����Ͱ�ť���¼�
	$("#noteModal").on("click","#sendConfirm",function(){
		var note_content = $("#user_note_detail").val();
		if((note_content).length == 0){
			window.parent.myAlert("�������ݲ���Ϊ��");
		}
		else{
			$.ajax({
				url: model_url + "/sendNotification", //������֤ҳ�� 
			    type: "POST", //����ʽ
			    data:"RecipientId=" + RecipientId + "&NoteContent=" + note_content,
			    success: function (result){
			    	switch (result){
			    	case "success":
			    		window.parent.myAlert("���ͳɹ�!");
			    		break;
			    	case "forbidden":
			    		window.parent.myAlert("�������Ѿ�����û����͹���Ϣ���������ٷ���");
			    		break;
		    		default:
		    			break;
			    	}
			    }
			});
		}
	})
	
}

function loadMajor(result) {
	$("#majorTags").empty();	
	var majorCnt = 0;
	for (majorCnt in result){
		
		//�˱���˵���Ƿ�major��ǩ�Ѿ������selectedTag
		var majorHasAdded = false;
		
		//����ÿ��selectedTag������Ŀǰ�����majortag�Ƿ����
		$(".selectedConditionRow").children().each(function(){
			if ($(this).text() == (result[majorCnt]+'��'))
				majorHasAdded = true;
		});
		
		//��majortagδ��selectedTag��
		if (majorHasAdded == false){
			$("#majorTags").append('<div class="searchTag majorTag">'+result[majorCnt]+'</div>');
		}
		//��majortag����selectedTag��
		else{
			$("#majorTags").append('<div class="searchTag majorTag TagActive">'+result[majorCnt]+'</div>');
		}
	}
}

function loadDepartment(result) {
	//alert('get departmentData');
	$("#departmentTags").empty();	
	$("#majorTags").empty();
	var departmentCnt = 0;
	for (departmentCnt in result){
		$("#departmentTags").append('<div class="searchTag departmentTag">'+result[departmentCnt]+'</div>');
	}
}

function loadAcademy(result) {
	allAcademy = result;
	$("#academyTags").empty();	
	var academyCnt = 0;
	for (academyCnt in result){
		if (academyCnt == 0) continue;
		$("#academyTags").append('<div class="searchTag academyTag">'+result[academyCnt]+'</div>');
		$(".academySearchSelect").append('<option class="searchTag academyTag"value="'+result[academyCnt]+'">'+result[academyCnt]+'</option>');
	}
	initJquerySelect(".academySearchSelect");
}

function handleSearchResult(call) {	
	if (null !== call) {
		$("#searchResultContent").html("");
		$("#searchResultContent").append("<p class='searchResultTitle'>ɸѡ�����½�����������ɸѡ</p>");
		$("#searchResultContent").append("<p class='searchResultDivide'></p>");
		for (var index in call) {	
			$("#searchResultContent").append("<p class='resultTag'>"+ call[index] + "</p>");
		}
	} else {
		$("#searchResultContent").html("");
		$("#searchResultContent").append("<p class='searchResultNull'>δ�ҵ��������<br>������������</p>");
	}
	$("#searchResult").fadeIn(1000);
}

var offset = 0;
var isFinished = false;
var oldAbilities = '';
var oldDirections = '';
var oldAcademies = '';

/**
 * ��ʽ��ѯ�û���ÿ��5����
 */
function queryNow() {
	var abilities='', directions='', academies='';

	$(".selectedTags").each(function(){
		
		var source = $(this).attr("class");
		
		// ȥ�ַ�����λ����֪����ǩ����������
		source = source.substring(13, source.length);
		
		switch (source) {
			case 'fromSearchResult':
			case 'fromAbility':
				if (abilities != "") {
					abilities += ",";
				}
				// �滻���һ��xΪ��
				abilities += $(this).text().replace(/��$/, "");
				break;
			case 'fromDirection':
				if (directions != "") {
					directions += ",";
				}
				// �滻���һ��xΪ��
				directions += $(this).text().replace(/��$/, "");
				break;
			case 'fromAcademy':
				if (academies != "") {
					academies += ",";
				}
				// �滻���һ��xΪ��
				academies+= $(this).text().replace(/��$/, "");
				break;
			default:
				break;
		}
	})

	var isSecondTime = true;
	// û�������Ͳ�����
	if (abilities == '' && directions == '' && academies == '') {
		return;
	}
	// �������ڲ�ͬ��Ҫ���ó�ʼ״̬
	if (abilities != oldAbilities || directions != oldDirections || academies != oldAcademies) {
		oldAbilities = abilities;
		oldDirections = directions;
		oldAcademies = academies;
		offset = 0;
		isFinished = false;
		isSecondTime = false;
		// ��ʼ�������ʾ����
		$("#resultContainer").empty();
		PersonCardView.refresh();
		autoResize();
	}
	
	// ���ͼ�������
	$.ajax({
		url: app_url + "/custom/SearchPeople/searchByCondition",
		type: "GET",
		data: "abilities=" + abilities
			+ "&directions=" + directions
			+ "&academies=" + academies
			+ "&offset=" + offset,
		success: function(call) {
			// תΪjson
			call = eval("("+call+")");
			user = call;
			
			// û�з�������������
			if (call == null) {
				isFinished = true;
				if (isSecondTime) {
					$('.theme-popover-mask').fadeIn(100);
//					$('.messagePopout').css("bottom", "356px");
					window.parent.myAlert("û�и��������");
					$('.messagePopButton').click(function() {
						$('.theme-popover-mask').fadeOut(500);
					});
				}
				else {
					$('.theme-popover-mask').fadeIn(100);
//					$('.messagePopout').css("bottom", "356px");
					window.parent.myAlert("û�з�������������");
					$('.messagePopButton').click(function() {
						$('.theme-popover-mask').fadeOut(500);
					});
				}
	    		return;
			}
			$(".showMore").remove();
			for (var index in call) {
				PersonCardView.newCard(call[index]);
			}
			$(".abilityDetail").fadeIn(700, function(){
	    		//��ǩ��ʾ֮�󣬳�ʼ����tooltip����
	      	  initToolTip();
	    	});
			
			$("#resultContainer").append('<div class="showMore"><div class="showMoreText" onclick="showMore()">��ʾ����</div></div>')
			
			autoResize();
			
			//������Ƭ�Ϸ���վ���Ź���	
			$(".tableBackground2ed").on("click",".glyphicon-envelope",function(){
				$(".modal-dialog").css("top",$(this).offset().top-200);
				RecipientIndex = this.id.substring(12,this.id.length);
				RecipientId = call[RecipientIndex]['user_id'];
			});
			
			$(".tableBackground2ed").on("click",".glyphicon-plus",function(){
				window.parent.myAlert("�ù�����δ���ţ������ڴ�");
			});
			
		}
	})

}

/**
 * �������ʾ���ࡱ��ť�¼���Ӧ
 */
function showMore(){
	if(isFinished){
		$('.theme-popover-mask').fadeIn(100);
//		$('.messagePopout').css("bottom", "356px");
		window.parent.myAlert("û�и��������");
		$('.messagePopButton').click(function() {
			$('.theme-popover-mask').fadeOut(500);
		});
		return;
	}
	offset += 5;
	queryNow();
}



/**
 *����������¼�����
 */
function initNavClickEvent() {
	var setHeight = 363;
	var expendAblity = false;
	var expendAcademy = false;
	var clickPos;
	
	$('#abilitySearchToggle').click(function(e){
		clickPos = "abilityToggle"
		if (!expendAblity){
			expendAblity = true;
			expendAcademy = false;
			$('.abilitySearchBox').css("display","block");
			$('.academySearchBox').css("display","none");
			$(".dropdown2").removeClass("open");
			$(".dropdown1").addClass("open");
		}else if(expendAblity){
			expendAblity = false;
			$('.abilitySearchBox').css("display","none");
			$(".dropdown1").removeClass("open");
		}
		autoResize();
		e.stopPropagation();
	});
	
	$('#academySearchToggle').click(function(e){
		clickPos = "academyToggle"
		if (!expendAcademy){
			expendAcademy = true;
			expendAblity = false;
			$('.academySearchBox').css("display","block");
			$('.abilitySearchBox').css("display","none");
			$(".dropdown1").removeClass("open");
			$(".dropdown2").addClass("open");
		}else if(expendAcademy){
			expendAcademy = false;
			$('.academySearchBox').css("display","none");
			$(".dropdown2").removeClass("open");
		}
		e.stopPropagation();
	});
	
	$(".tableContent,.form-control,.btn").click(function(){
		if (expendAblity || expendAcademy){
			clickPos = "cancelToggle";
			expendAblity = false;
			expendAcademy = false;
			$(".dropdown1").removeClass("open");
			$(".dropdown2").removeClass("open");
			$('.abilitySearchBox').css("display","none");
			$('.academySearchBox').css("display","none");
			autoResize();
		}
	});
	
//	$(".nav,.navContainer,.navbar,body,html").click(function(e){
//		if (clickPos == null || clickPos == "cancelToggle") {
//			e.stopPropagation();
//		} else {
//			clickPos = null;
//		}
//	});
}

/**
 * documen ready initialization
 */
$(document).ready(function(){
	
	// ���ύ�¼�
	$("#searchTextForm").submit(function(e){
		e.preventDefault();
		$.ajax({
			url: app_url + "/custom/Ability/searchAbilityByText",
			type: "GET",
			data: "searchText=" + $("#searchText").val().toUpperCase(),
			success: function(call) {
				handleSearchResult(call);
			}
		})
	})
	
	// ɸѡ��������仯���
	$(".selectedConditionRow").bind("ManifyChanged", function(){
		queryNow();
	});

	
	// ���̨�������е����򣬲���ʾ
	$.ajax({url: app_url + "/Custom/SearchPeople/getAllFields",
		type: "GET",
        success: function(result) {
        	var fieldCnt = 0;
        	for (fieldCnt in result){
        		$(".abilitySearchBox #L1").append('<div class="searchTag fieldTag">'+result[fieldCnt]+'</div>');
        	}
        	// ���̨�������е��������򣬲���ʾ
        	showHotDirectionAndAbility();
        }
	});

	// ��ȡ���е�Ժ�б�
	$.ajax({
		url:app_url + "/Custom/SearchPeople/getAllAcademy",
		type:"GET",
		success:function(result){
			loadAcademy(result);
		}
	});
	
	PersonCardView.init("resultContainer");
	initNavClickEvent();
	initClickEvent();
	autoResize();
})


/***
 * ʵ���Զ���ȫ���������ʼ��
 * @param selector ���ĸ�selector��ʵ���Զ���ȫ�������
 */
function initJquerySelect(selector){

		$(selector)
		.comboSelect()

     /**
      * on Change
      */
     
     $('.js-select').change(function(e, v){
         $('.idx').text(e.target.selectedIndex)
         $('.val').text(e.target.value)
     })

     /**
      * Open select
      */
     
     $('.js-select-open').click(function(e){
       $('.js-select').focus()
       e.preventDefault();
     })

     /**
      * Open select
      */    
     $('.js-select-close').click(function(e){
       $('.js-select').trigger('comboselect:close')
       e.preventDefault();
     })
     
     /**
      * Option Clicked
      */ 
     $('.academySearchForm .option-item').click(function(){
 		var academyText = $(this).text();
 		addAcademyTag(academyText);
     })
     
     /**
      * Disenable Submit Event
      */
     $('.academySearchForm').submit(function(e){
    	 e.preventDefault();
     })

     
     /**
      * ע��ѧԺѡ��Ļس��¼�
      */
     $('.academySearchForm').on("keydown", '.selectInput', function(e) {
    	 //����ǻس��¼�
    	 if(e.keyCode==13){
    		 //���������е�������ȫ��ѧԺ֮һ
    		 if(jQuery.inArray($('.selectInput').val(), allAcademy)!=-1){
    			 //��������е�������academyTag����ʽ����selectedConditionRow
    			 addAcademyTag($('.selectInput').val()); 
    		 }    			  
    	}
     })
     
//     $(':not(.combo-dropdown)').click(function(){
//    	 alert(":not(.combo-dropdown) clicked");
//    	 $(".combo-dropdown").css("display","none");
//     })
     
     
}

/***
 * ��һ���ַ�����academyTag����ʽ����selectedConditionRow
 * @param academyText ��ӵ��ַ���
 */
function addAcademyTag(academyText){
	var has = false;
	//�������е�selectedConditionRow�����tag���ж�����ӵ�tag�Ƿ��Ѿ�����
	$(".selectedConditionRow").children().each(function(){
		if ($(this).text() == (academyText+'��')) {
			has = true;
		}
	});
	if (!has) {
		//������ӵ�tagδ���ڣ������
		 $(".selectedConditionRow").append('<div class="selectedTags fromAcademy">'+academyText+'��</div>');
	}
	// �����Զ���ı��¼�
	$(".selectedConditionRow").trigger("ManifyChanged");
}

//������allSelectedAbility�����е����tag����ʽ�����selectedConditionRow
function addAllAbility(){
	//����������й���������������
	$(".selectedConditionRow").children().each(function(){
		if ($(this).hasClass("fromAbility")) {
			$(this).remove();
		}
	});
	
	var abilityCnt = 0;
	
	for (abilityCnt in allSelectedAbility){
		var has = false;
		//�������е�selectedConditionRow�����tag���ж�����ӵ�tag�Ƿ��Ѿ�����
		$(".selectedConditionRow").children().each(function(){
			if ($(this).text() == (allSelectedAbility[abilityCnt]+'��')) {
				has = true;
			}
		});
		if (!has) {
			//������ӵ�tagδ���ڣ������
			 $(".selectedConditionRow").append('<div class="selectedTags fromAbility">'+allSelectedAbility[abilityCnt]+'��</div>');
		}
	}
	// �����Զ���ı��¼�
	$(".selectedConditionRow").trigger("ManifyChanged");
}

//������allSelectedDirection�����е����tag����ʽ�����selectedConditionRow
function addAllDirection(){
	//����������й���������������
	$(".selectedConditionRow").children().each(function(){
		if ($(this).hasClass("fromDirection")) {
			$(this).remove();
		}
	});
	
	var abilityCnt = 0;
	
	for (abilityCnt in allSelectedDirection){
		var has = false;
		//�������е�selectedConditionRow�����tag���ж�����ӵ�tag�Ƿ��Ѿ�����
		$(".selectedConditionRow").children().each(function(){
			if ($(this).text() == (allSelectedDirection[abilityCnt]+'��')) {
				has = true;
			}
		});
		if (!has) {
			//������ӵ�tagδ���ڣ������
			 $(".selectedConditionRow").append('<div class="selectedTags fromDirection">'+allSelectedDirection[abilityCnt]+'��</div>');
		}
	}
}

/***
 * ȥ�������еĿ�Ԫ��
 * @param array ��ȥ����ԭʼ����
 */
function DelNullInArray(array){
	var result = new Array();
	var cnt = 0;
	for(cnt in array){
		if (array[cnt]!=null){
			result.push(array[cnt]);
		}
	}
	return result;
}
