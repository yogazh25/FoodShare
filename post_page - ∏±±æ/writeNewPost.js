var creator_name;

function autoResize() {
	$("#PostPage_frame",parent.document).css("height",$("body").height() + "px");
};


$(document).ready(function () { 
    creator_name = 'chelseaisgood';
	
    //alert (creator_name);

    // var src = window.location.href; 
    // var I = src.indexOf("?user=") + 6; 
    // var T = src.indexOf("?user="); 
    // if ( (0 >= T)||(I == src.length) ){
    //     document.location = '/Project/user page/user.html?user='+ user_name; // illigal operation
    // }
    
    // var endofid;
    // if(src.indexOf("#") <=0 ){
    //     endofid = src.length;
    // }
    // else{
    //     endofid = src.indexOf("#");
    // }
    // if (){

    // }

})



function post_news(){
   	alert (1);
   	alert (creator_name);

	 if ( (document.getElementById("news_content").value.toString()) == null && 
	 	  (document.getElementById("news_photo").src.toString()) == null &&  
	 	  (document.getElementById("news_film").src.toString()) == null ) {
						$('.theme-popover-mask').fadeIn(100);
						window.parent.myAlert("You must input something!");
						$('.messagePopButton').click(function() {
							$('.theme-popover-mask').fadeOut(500);
						});
						return;
		} else {
			$('.theme-popover-mask').fadeIn(100);
			window.parent.myAlert("You have input something!");
			$('.messagePopButton').click(function() {
				$('.theme-popover-mask').fadeOut(500);
			});
			return;
	}

     $.ajax({
            url: "writeNewPost.php",
            type: "POST",
            dataType: 'JSON',
            data: 	"creator_name=" + creator_name +
                    "&title=" + document.getElementById("news_title").value.toString() +
                    "&textfile="+ document.getElementById("news_content").value.toString() +
                    "&image="+document.getElementById("news_photo").src.toString() +
                    "&video=" +  document.getElementById("news_film").src.toString() +
                    "&post_view_priority=" + (3-document.getElementById("priority_icon").selectedIndex) + 
                    "&L_name=" + document.getElementById("news_location").value.toString() +
                    "&city=" + document.getElementById("news_city").value.toString() +
                    "&state=" + document.getElementById("news_state").value.toString() +
                    "&longitude=" + document.getElementById("news_longitude").value.toString() +
                    "&latitude=" + document.getElementById("news_latitude").value.toString(),
            async: true,
            success: function(){

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
			$("#Media_content").append("<div class='col-md-12 col-lg-12' id='preview' style='margin-bottom:10px'>\
								<img alt='User Photo' id = 'news_photo' src=''  style='width:70%;'>\
							</div>\
						</div>");
          var MAXWIDTH  = 720; 
          var MAXHEIGHT = 480;
          var div = document.getElementById('preview');
          if (file.files && file.files[0])
          {
              div.innerHTML ='<img id=news_photo>';
              var img = document.getElementById('news_photo');
              img.onload = function(){
                var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
                img.width  =  rect.width;
                img.height =  rect.height;
//                 img.style.marginLeft = rect.left+'px';
                //img.style.marginTop = rect.top+'px';
              }
              var reader = new FileReader();
              reader.onload = function(evt){img.src = evt.target.result;}
              reader.readAsDataURL(file.files[0]);
          }
          else //兼容IE
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
		//$("#image_btn").remove();
		//$("#image_box").append("<span id='image_btn'>\
									//<span class='glyphicon glyphicon-camera' style='padding:0 0 0 0;'/><input title='image' name='username' style='display:inline;padding: 0 20px 20px 10px;' type='file' onchange='previewImage(this)'/>\
								//</span>\
						//</div>");
		var obj = document.getElementById("input_image");
		obj.select();
		document.selection.clear();
	}
}

