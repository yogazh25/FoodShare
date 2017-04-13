var creator_name;
var video_addr = '';
var image_addr = '';
function autoResize() {
	$("#PostPage_frame",parent.document).css("height",$("body").height() + "px");
};


$(document).ready(function () { 
    //creator_name = 'chelseaisgood';
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
			creator_name = user_name;
			//alert(user_name);
		}
	});
    //alert (creator_name);

    

})



function post_news(){
   	//alert (1);
	//alert (($("#news_photo").length== 0));
	//alert (($("#post_video").length== 0));
	//alert(($("#news_content").val())=='');
	 if ( ($("#news_content").val()) == '' && 
	 	  ($("#news_photo").length== 0) &&
		  ($("#post_video").length== 0) ) {
			$('.theme-popover-mask').fadeIn(100);
			window.parent.myAlert("You need to share something!");
			$('.messagePopButton').click(function() {
				$('.theme-popover-mask').fadeOut(500);
			});
			return;
		} else {
			
	}

		if($("#news_photo").length==0){
			image_addr = '';
		}
		//alert(image_addr);
		if($("#post_video").length==0){
			video_addr = '';
		}
		//alert(video_addr);
		
		var location_cut = document.getElementById("news_location").value.toString();
		if(document.getElementById("news_location").value.toString().length >40){
			location_cut = document.getElementById("news_location").value.substr(0, 40);
		}
		var city_cut = document.getElementById("news_city").value.toString();
		if(document.getElementById("news_city").value.toString().length >40){
			city_cut = document.getElementById("news_city").value.substr(0, 40);
		}
		var state_cut = document.getElementById("news_state").value.toString();
		if(document.getElementById("news_state").value.toString().length >5){
			state_cut = document.getElementById("news_state").value.substr(0, 5);
		}
		var longitude_cut = document.getElementById("news_longitude").value.toString();
		if(document.getElementById("news_longitude").value.toString().length >15){
			longitude_cut = document.getElementById("news_longitude").value.substr(0, 15);
		}
		var latitude_cut = document.getElementById("news_latitude").value.toString();
		if(document.getElementById("news_latitude").value.toString().length >15){
			latitude_cut = document.getElementById("news_latitude").value.substr(0, 15);
		}

     $.ajax({
            url: "writeNewPost.php",
            type: "POST",
            dataType: 'JSON',
            data: 	"creator_name=" + creator_name +
                    "&title=" + document.getElementById("news_title").value.toString() +
                    "&textfile="+ document.getElementById("news_content").value.toString() +
                    "&image="+ image_addr +
                    "&video=" +  video_addr +
                    "&post_view_priority=" + (3-document.getElementById("priority_icon").selectedIndex) + 
                    "&L_name=" + document.getElementById("news_location").value.toString() +
                    "&city=" + city_cut +
                    "&state=" + state_cut +
                    "&longitude=" + longitude_cut +
                    "&latitude=" + latitude_cut,
            async: true,
            success: function(postnum){
				swal({ 
						title: "Successful!",  
				            text: "Your new post can be viewed now!",  
				            type: "success", 
				            showCancelButton: false, 
				            closeOnConfirm: false, 
				            confirmButtonText: "OK", 
				            confirmButtonColor: "#ec6c62" 
					}, function() { 
						window.location.reload(true);
						window.open("http://localhost/Project/posting_page/postingTest.html?post_id="+postnum);
					});			
            }
        });
}

/* ==== Limit the length of title and content BEGIN! ==== */
function limitTitleLength(){
	var enter_title_len= document.getElementById("news_title").value.length;
	document.getElementById("title_length").innerHTML = enter_title_len;
	if (parseInt(enter_title_len) > 30 || parseInt(enter_title_len) == 0 ){ 
        document.getElementById("news_post_btn").disabled = true;
	} else {
		$("#news_post_btn").attr('disabled',false);
	} 
}	

function limitContentLength(){
	var enter_content_len= document.getElementById("news_content").value.length;
	document.getElementById("content_length").innerHTML = enter_content_len;
	if (parseInt(enter_content_len) > 600){
        document.getElementById("news_post_btn").disabled = true;
	} else {
		$("#news_post_btn").attr('disabled',false);
	} 
}
/* ==== Limit the length of title and content END! ==== */

/* ==== UPLOAD PHOTO FUNCTION BEGIN ==== */
function previewImage(file)
        {
			if($("#preview")!= null) {
				$("#preview").remove();
			}
			$("#Media_content").append("<div class='col-md-12 col-lg-12' id='preview' style='margin-top:20px'>\
								<img alt='User Photo' id = 'news_photo' src=''  style='width:70%;'>\
							</div>\
						</div>");
          var MAXWIDTH  = 497 ; 
          var MAXHEIGHT = 373 ;
          var div = document.getElementById('preview');
          if (file.files && file.files[0])
          {
              div.innerHTML ='<img id=news_photo>';
              var img = document.getElementById('news_photo');
              img.onload = function(){
                var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
                img.width  =  rect.width;
                img.height =  rect.height;
                //img.style.marginLeft = rect.left+'px';
                //img.style.marginTop = rect.top+'px';
              }
              var reader = new FileReader();
              reader.onload = function(evt){img.src = evt.target.result;}
              reader.readAsDataURL(file.files[0]);
          }
          else //IE
          {
            var sFilter='filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
            file.select();
            var src = document.selection.createRange().text;
            div.innerHTML = '<img id=news_photo>';
            var img = document.getElementById('news_photo');
            img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
            var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
            status =('rect:'+rect.top+','+rect.left+','+rect.width+','+rect.height);
            div.innerHTML = "<div id=divhead style='width:"+rect.width+"px;height:"+rect.height+"px;margin-top:"+rect.top+"px;"+sFilter+src+"\"'></div>";
          }
		  
			ImageFile();
		   
        }
        function clacImgZoomParam( maxWidth, maxHeight, width, height ){
            var param = {top:0, left:0, width:width, height:height};
            if( width>maxWidth || height>maxHeight )
            {
                rateWidth = width / maxWidth;
                rateHeight = height / maxHeight;
                 
                if( rateWidth > rateHeight )
                {
                    param.width =  maxWidth;
                    param.height = Math.round(height / rateWidth);
                }else
                {
                    param.width = Math.round(width / rateHeight);
                    param.height = maxHeight;
                }
            }
            param.left = Math.round((maxWidth - param.width) / 2);
            param.top = Math.round((maxHeight - param.height) / 2);
            return param;
        }
/* ==== UPLOAD PHOTO FUNCTION END ==== */

function clear_image_box(){
	if($("#preview")!= null){
		$("#preview").remove();
		var obj = document.getElementById("input_image");
		obj.outerHTML=obj.outerHTML;
		$('.theme-popover-mask').fadeIn(100);
		window.parent.myAlert("You have deleted the photo previously uploaded!");
		$('.messagePopButton').click(function() {
			$('.theme-popover-mask').fadeOut(500);
		});
	}
}

function previewVideo(file){
	UpladFile();
}

function ImageFile() {
	var fileObj = document.getElementById("input_image").files[0]; // 获取文件对象
	console.log(fileObj);
	var FileController = "upload-file.php";                    // 接收上传文件的后台地址
	// FormData 对象
	var form = new FormData();
	form.append("input_video", fileObj);  
	form.append("user_name", creator_name);	// 文件对象
	// XMLHttpRequest 对象
	var xhr = new XMLHttpRequest();
	xhr.open("post", FileController, true);
	xhr.onload = function (data) {
		//console.log(data);
		//video_addr = console.log(xhr.responseText);
		image_addr = xhr.responseText;
		$('.theme-popover-mask').fadeIn(100);
		window.parent.myAlert("You have uploaded new phoho!");
		$('.messagePopButton').click(function() {
		$('.theme-popover-mask').fadeOut(500);
		});
	};
	//xhr.upload.addEventListener("progress", progressFunction, false); 
	console.log(form);	
	xhr.send(form);
}



function UpladFile() {
	var fileObj = document.getElementById("input_video").files[0]; // 获取文件对象
	console.log(fileObj);
	var FileController = "upload-file.php";                    // 接收上传文件的后台地址
	// FormData 对象
	var form = new FormData();
	form.append("input_video", fileObj);                           // 文件对象
	form.append("user_name", creator_name);
	// XMLHttpRequest 对象
	var xhr = new XMLHttpRequest();
	xhr.open("post", FileController, true);
	xhr.onload = function (data) {
		//console.log(data);
		//video_addr = console.log(xhr.responseText);
		video_addr = xhr.responseText;
		if($("#video_box")!= null) {
				$("#video_box").remove();
			}
			$("#Media_content").append("<video id = 'news_film' style='display:block;width:70%;padding-top:20px;' controls>\
									<source id='post_video' src='"+video_addr+"' type='video/mp4'>\
								</video>\
						</div>");
		$('.theme-popover-mask').fadeIn(100);
		window.parent.myAlert("You have uploaded new video!");
		$('.messagePopButton').click(function() {
			$('.theme-popover-mask').fadeOut(500);
		});
	};
	//xhr.upload.addEventListener("progress", progressFunction, false); 
	console.log(form);	
	xhr.send(form);
}


function clear_video_box(){
	if($("#news_film")!= null){
		$("#news_film").remove();
		var obj = document.getElementById("input_video");
		video_addr = null;
		obj.outerHTML=obj.outerHTML;
		$('.theme-popover-mask').fadeIn(100);
		window.parent.myAlert("You have deleted the video previously uploaded!");
		$('.messagePopButton').click(function() {
			$('.theme-popover-mask').fadeOut(500);
		});
	}	
}


function sleep(numberMillis) {
    var now = new Date();
    var exitTime = now.getTime() + numberMillis;
    while (true) {
        now = new Date();
        if (now.getTime() > exitTime)
            return;
    }
}