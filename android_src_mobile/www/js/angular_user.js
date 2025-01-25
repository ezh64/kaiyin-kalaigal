var app = angular.module("myapp", ['ngCookies']);
app.controller("myappCtrl", function($scope, $cookieStore, $cookies, $http) 
{
/****************************************************************************/
/************************** User Login *************************************/
/****************************************************************************/
	
	// sign in button
	$scope.user_login = function() 
	{		
        $http.post('https://myapphosting.in/android/kaiyin/user_login.php', {'email': $scope.log_email, 'password':$scope.log_password})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Login Successful");
				$cookieStore.put("log_user_email",$scope.log_email);
				window.location = "admin_home.html";  // Home Page
				return;				
			}
			else if(data.success == 4)
			{			
				alert("Login Successful");
				$cookieStore.put("log_user_email",$scope.log_email);
				window.location = "index.html";  // Home Page
				return;				
			}
			else if(data.success == 0)
			{
				alert("Login Unsuccessful");
			}
			else
			{
				alert("Pls fill all fields");
			}
        });
    }
	
	
	$http.post('https://myapphosting.in/android/kaiyin/get_lastest_product.php')
	.success(function(data, status, headers, config)  
	{
			$scope.all_lastest_product = data.products;
	});
	
	
	
	$scope.product_details = function(p_id)
	{
		$cookieStore.put("p_id",p_id);
		window.location="productinfo.html";
		return;
	}

	$scope.p_id = $cookieStore.get("p_id");	
	
	$http.post('https://myapphosting.in/android/kaiyin/product_info.php',{'product_id':$scope.p_id})
	.success(function(data, status, headers, config)  
	{
			$scope.product_info = data.products;
	});
	
	$scope.cook_user_email = $cookieStore.get("cook_user_email");
	$scope.log_user_email = $cookieStore.get("log_user_email");
  
	if(document.cookie == "")    // Logout 
	{
		$scope.myLoginVar = false;
		$scope.myLogoutVar = true;    // DisEnable
		$scope.myAccountVar = true;    // DisEnable
		$scope.myOrdersVar = true;    // DisEnable
		$scope.myCartVar = true;    // DisEnable
	}
	else if(!$cookies.log_user_email)    // admin login 
	{
		$scope.myLoginVar = false;
		$scope.myLogoutVar = true;
		$scope.myAccountVar = true;		
		$scope.myOrdersVar = true;  
		$scope.myCartVar = true;
	}
	else
	{
		$scope.myLoginVar = true;
		$scope.myLogoutVar = false;
		$scope.myAccountVar = false;
		$scope.myOrdersVar = false;
		$scope.myCartVar = false;
	}

/****************************************************************************/
/************************** User Logout ************************************/
/****************************************************************************/		
	$scope.user_logout = function() 
	{
		if(confirm("Are You Sure?"))
		{
			$cookies.log_user_email = "";
			window.location = "index.html";
			return;
		}
		else
		{
			return false;
		}
	}
	
/****************************************************************************/
/************************** User Register **********************************/
/****************************************************************************/
	$scope.er_email = true;
	// mobile number verification
	$scope.register_email = function()
	{
		var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
		if(filter.test($scope.reg_email))
		{
			$scope.er_email = true;
			$scope.btn_sgnup = false;
			$scope.btn_sgnin = false;
		}
		else
		{
			$scope.er_email = false;
			$scope.btn_sgnup = true;
			$scope.btn_sgnin = true;
		}
	}
	// mobile number verification
	$scope.login_email = function()
	{
		var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
		if(filter.test($scope.log_email))
		{
			$scope.er_email = true;
			$scope.btn_sgnup = false;
			$scope.btn_sgnin = false;
		}
		else
		{
			$scope.er_email = false;
			$scope.btn_sgnup = true;
			$scope.btn_sgnin = true;
		}
	}
	
	$scope.er_mob = true;
	// mobile number verification
	$scope.mobile_no = function()
	{
		var filter = /^\d{10}$/;
		if(filter.test($scope.reg_mobile))
		{
			$scope.er_mob = true;
			$scope.btn_sgnup = false;
		}
		else
		{
			$scope.er_mob = false;
			$scope.btn_sgnup = true;
		}
	}
	
	
	$scope.send_otp_verify = function() 
	{		
        $http.post('https://myapphosting.in/android/kaiyin/send_otp_verify.php', 
			{'email': $scope.email,'password': $scope.password})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("OTP Sent Successful");
				window.location = "resetpass.html";  // Home Page
				return;				
			}
			else if(data.success == 2)
			{
				alert("Please Fill All Fields");
			}
			else if(data.success == 0)
			{
				alert("Incorrect A/C & Mobile No");
			}
			else
			{
				alert("Unsuccessful");
			}
        });
    }

	$scope.send_otp_verify_2 = function() 
	{		
        $http.post('https://myapphosting.in/android/kaiyin/send_otp_verify_2.php', 
			{'email': $scope.field_1, 'password':$scope.field_2, 'password_2':$scope.field_3 })
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Password Reset Successful");
				window.location = "resetpass.html";  // Home Page
				return;				
			}
			else if(data.success == 2)
			{
				alert("Please Fill All Fields");
			}
			else if(data.success == 4)
			{
				alert("Password Must be 8 Characters");
			}
			else if(data.success == 5)
			{
				alert("Both Password does not Match");
			}
			else
			{
				alert("Unsuccessful");
			}
        });
    }
	
	
/****************************************************************************/
/************************** User Register Verification *********************/
/****************************************************************************/
	$scope.reg_user_email = $cookieStore.get("reg_user_email");
	
	// otp submit button
	$scope.user_verification = function() 
	{		
			$scope.reg_user_email ="Nil";
	   $http.post('https://myapphosting.in/android/kaiyin/user_verification.php', {'email': $scope.reg_user_email, 'otp':$scope.user_otp})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Registration  Successful");
				window.location = "index.html";
				return;				
			}
			if(data.success == 0)
			{
				alert("Registration  Unsuccessful");
			}
			if(data.success == 2)
			{
				alert("Pls fill all fields");
			}
        });
    }
	
/****************************************************************************/
/************************** User Details ***********************************/
/****************************************************************************/	
	$scope.log_user_email = $cookieStore.get("log_user_email");

	$http.post('https://myapphosting.in/android/kaiyin/user_address_get.php', {'email': $scope.log_user_email})
	.success(function(data, status, headers, config) 
	{
		if(data.success == 1)
		{
			$scope.user_address = data.address;
		}
		else
		{
			$scope.er_usradrs = "No Address Found !!!";
		}
    });
	
/****************************************************************************/
/************************** View All Products *******************************/
/****************************************************************************/
	// All Products
	$scope.product = function(product_name)
	{
		$cookieStore.put("product_name",product_name);
		window.location="product.html";
		return
	}
		


/****************************************************************************/
/************************** create_dept *********************************/
/****************************************************************************/
	$scope.create_dept = function() 
	{
	$http.post('https://myapphosting.in/android/kaiyin/create_dept.php', 
		{
		'field_1':$scope.field_1,'id': $scope.log_user_email
		})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				   location.reload(); 
			return;				
			}
			else if(data.success == 2)
			{
				alert("Fill All Fields");
			}
			
			else
				{
					alert("Un Successfully");
				}
        });
    }
	
	
	$http.post('https://myapphosting.in/android/kaiyin/get_dept.php', 
		{
		'id':$scope.log_user_email
		})
	.success(function(data, status, headers, config) 
	{
			$scope.dept_details = data.details;
	});
		


});
