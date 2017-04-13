var owner_id;
$(document).ready(function () { 

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
			owner_id = user_name;
			//alert(owner_id);
		}
	}); 

    /*
    var src = window.location.href; 
    var I = src.indexOf("?user=") + 6; 
    var T = src.indexOf("?user="); 

    if ( (0 >= T)||(I == src.length) ){
        document.location = '/Project/user page/user.html?user='+ user_name; // illigal operation
    }
    
    var endofid;
    if(src.indexOf("#") <=0 ){
        endofid = src.length;
    }
    else{
        endofid = src.indexOf("#");
    }
    var owner_id = src.substr(src.indexOf("?user=") + 6, endofid-src.indexOf("?user=")-6 ); 
    */

	var profile_info;
    
	show_profile();
   
	function show_profile() {
		$.ajax({
            url: "get_user_profile.php",
            type: "POST",
            dataType: 'JSON',
            data: "user_id=" + owner_id,
            async: true,
            success: function(return_profile){
                
                profile_info = return_profile;

                document.getElementById("edit_user_name").value = profile_info['user_name'];
                document.getElementById("edit_user_name").disabled = ' ';  // user_name cannot be edited.
                document.getElementById("edit_first_name").value = profile_info['first_name'];
                document.getElementById("edit_last_name").value = profile_info['last_name'];
                document.getElementById("edit_date_of_birth").value = profile_info['date_of_birth'];
                document.getElementById("edit_residence").value = profile_info['residence'];
				//alert(profile_info['pic']);
				if(profile_info['pic'] !=null){
					document.getElementById("pic").src = timestamp(profile_info['pic'].toString());
				}
                //alert(document.getElementById("pic").src);
                if(profile_info['gender'].toString() == "Male"){
                    document.getElementById("edit_male").checked = "checked";
                }
                if(profile_info['gender'].toString() == "Female"){
                    document.getElementById("edit_female").checked = "checked";
                }
                if(profile_info['gender'].toString() == "Other"){
                    document.getElementById("edit_other").checked = "checked";
                }                
                document.getElementById("edit_biography").innerHTML = profile_info['biography'];
                
                //alert(profile_info['profile_view_priority']);
                if(profile_info['profile_view_priority'].toString() == "0"){
                    document.getElementById("edit_me").checked = "checked";
                }
				
                if(profile_info['profile_view_priority'].toString() == "1"){
                    document.getElementById("edit_friend").checked = "checked";
                }
                if(profile_info['profile_view_priority'].toString() == "2"){
                    document.getElementById("edit_FOF").checked = "checked"; 
                }
                if(profile_info['profile_view_priority'].toString() == "3"){
                    document.getElementById("edit_all").checked = "checked";
                }
				
				//alert(1);
            }
        });
    }
})

function update_profile(){
    var genderVal;
    var priorityVal;
	
    if ( document.getElementById("edit_male").checked) {
        genderVal = "Male";
		//alert(1);
    }
    if (document.getElementById("edit_female").checked) {
		//alert(1);
        genderVal = "Female";
    }
    if (document.getElementById("edit_other").checked) {
        genderVal = "Other";
		//alert(1);
    }

    if (document.getElementById("edit_me").checked) {
        priorityVal = "0";
    }
    if (document.getElementById("edit_friend").checked) {
        priorityVal = "1";
    }
    if (document.getElementById("edit_FOF").checked) {
        priorityVal = "2";
    }
    if (document.getElementById("edit_all").checked) {
        priorityVal = "3";
    }

	//alert( genderVal);
	//alert( priorityVal);
    $.ajax({
            url: "update_profile.php",
            type: "POST",
			async: false,
            data:   "user_name=" + document.getElementById("edit_user_name").value.toString() +
                    "&first_name="+document.getElementById("edit_first_name").value.toString() +
                    "&last_name="+document.getElementById("edit_last_name").value.toString() +
                    "&date_of_birth="+document.getElementById("edit_date_of_birth").value.toString() +
                    "&gender=" +  genderVal.toString() +
                    "&biography=" + document.getElementById("edit_biography").value.toString() + 
                    "&residence=" + document.getElementById("edit_residence").value.toString() +
                    "&profile_view_priority=" + priorityVal.toString(),
            success: function(call){ 
				myAlert("Personal Information Updated!");
               //show_profile();
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