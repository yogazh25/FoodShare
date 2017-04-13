/**
 * 改变密码所用的js
 */
var btn = document.getElementById('Safe_btn');
var Safe_original_pwd = document.getElementById('Safe_original_pwd');
var Safe_new_pwd1 = document.getElementById('Safe_new_pwd1');
var Safe_new_pwd2 = document.getElementById('Safe_new_pwd2');
var user_name = "chelseaisgood";

window.onload = function () {
	
	
    btn.onclick = function () {
		

        var isValidate = false;

      /*  if(Safe_new_pwd2.value != Safe_new_pwd1.value){
    		myAlert("两次输入的密码不同");
    		return;
    	}
        else{*/
        	 if (!(Safe_new_pwd1.value.match(/^.{6,16}$/))||
             		!(Safe_new_pwd2.value.match(/^.{6,16}$/))) {
             	myAlert("Please enter new password length 6-16:");
                 return;
             } else {
                 if(Safe_new_pwd1.value != Safe_new_pwd2.value) {
                    myAlert("Different new pwd!");
                    return;
                 }

                 isValidate = true;
             }
    //}
        
        function handleReturn(call) {
        	switch (call) {
			case 'success':
                myAlert("Success Change");
                $("#Safe_original_pwd").val('');
                $("#Safe_new_pwd1").val('');
                $("#Safe_new_pwd2").val('');
				break;
			case 'password_error':
				myAlert("Wrong Original PWD");
                $("#Safe_original_pwd").val('');
                $("#Safe_new_pwd1").val('');
                $("#Safe_new_pwd2").val('');
				break;
			default:
				break;
			}
		}
        
        if (isValidate) {
            $.ajax({
                url: "change_pwd.php", //请求验证页面 
                type: "POST", //请求方式
                data: "newpassword1=" + $("#Safe_new_pwd1").val() + 
                      "&password=" + $("#Safe_original_pwd").val() +
                      "&user_name=" + user_name.toString(),
                success: function (call) {
					  alert(1);
                     handleReturn(call); 
                }
            });
        }
    }    
}

document.onkeydown = function(e){ 
    var ev = document.all ? window.event : e;
    if(ev.keyCode==13) {
    	$("#btn" ).click();
     }
}

