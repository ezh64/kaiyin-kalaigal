var app = angular.module("myapp", ['ngCookies']);
app.controller("myappCtrl", function($scope, $cookieStore, $cookies, $http) 
{	
/****************************************************************************/
/************************** User Login *************************************/
/****************************************************************************/
	
	// sign in button
	$scope.user_login = function() 
	{		
        $http.post('http://10.0.2.2/projects/kaiyinkalaigal/web/user_login.php', {'email': $scope.log_email, 'password':$scope.log_password})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
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
/************************** User Details ***********************************/
/****************************************************************************/	
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
/************************** View All Orders ********************************/
/****************************************************************************/

		$http.post('http://10.0.2.2/projects/kaiyinkalaigal/web/myorders_get.php',{'email': $scope.log_user_email})
		.success(function(data, status, headers, config)
		{
			if(data.success == 1)
			{
				$scope.orders = data.orders;			
			}
			else if(data.success == 0)
			{
				$scope.err_orders = "No Orders Found!!!";
			}
			else
			{
				alert("Pls fill all fields");
			}
		});
		
		/*
	$scope.file_upload = function(order_id)
	{
		$cookieStore.put("cook_cus_id",order_id);
		window.location="file_1.html";
		return;
	}
		$scope.cook_cus_id = $cookieStore.get("cook_cus_id");
		*/
	$scope.add_feedback = function(product_id)
	{
		$cookieStore.put("cook_product_id",product_id);
		window.location="add_feedback.html";
		return;
	}
		$scope.cook_product_id = $cookieStore.get("cook_product_id");
		
		
	$scope.create_feedback = function() 
	{		
		$http.post('http://10.0.2.2/projects/kaiyinkalaigal/web/create_feedback.php', 
		{
		'field_1':$scope.field_1,'field_2':$scope.field_2,'field_3':$scope.cook_product_id,
		'email':$scope.log_user_email
		})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Feedback Submitted Successfully");
				window.location = "order.html";
				return;				
			}
			else if(data.success == 2)
			{
				alert("Please Fill All Fields");
			}
			else if(data.success == 0)
			{
				alert("Error In Creating");
			}
			else
				{
					alert("Un Successfully");
				}
        });
    }
		
});