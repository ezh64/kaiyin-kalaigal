var app = angular.module("myapp", ['ngCookies']);
app.controller("myappCtrl", function($scope,  $cookies, $cookieStore, $http) 
{
	
/****************************************************************************/
/************************** User Logout ************************************/
/****************************************************************************/		
	$scope.user_logout = function() 
	{
		if(confirm("Are You Sure?"))
		{
			$cookies.cook_user_email = "";
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
	$scope.cook_user_email = $cookieStore.get("cook_user_email");
	$scope.log_user_email = $cookieStore.get("log_user_email");

	$scope.myAddressVar = true;
	$http.post('http://10.0.2.2/projects/kaiyinkalaigal/web/user_address_get.php', {'email': $scope.log_user_email})
	.success(function(data, status, headers, config) 
	{
		if(data.success == 1)
		{
			
			$scope.myAddressVar = true;
			$scope.user_address = data.address;
		}
		else
		{
			$scope.myAddressVar = false;
			$scope.er_usradrs = "No Address Found !!!";
		}
    });
	
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
	
	$scope.er_mob = true;
	// mobile number verification
	$scope.mobile_no = function()
	{
		var filter = /^\d{10}$/;
		if(filter.test($scope.cus_mobile))
		{
			$scope.er_mob = true;
			$scope.btn_save = false;
		}
		else
		{
			$scope.er_mob = false;
			$scope.btn_save = true;
		}
	}

/*****************************************************************************/
/************************** Create Address **********************************/
/****************************************************************************/
	//address add
	$scope.create_address = function() 
	{		
        $http.post('http://10.0.2.2/projects/kaiyinkalaigal/web/user_address_create.php', 
		{'email': $scope.log_user_email, 'street':$scope.cus_street, 'landmark':$scope.cus_landmark, 'city':$scope.cus_city, 'state': $scope.cus_state, 
		'country': $scope.cus_country, 'pincode': $scope.cus_pincode, 'mobile': $scope.cus_mobile, 'address_type': $scope.cus_type
		})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Address Created Successful");
				window.location = "pay.html";
				return;
				
			}
			else if(data.success == 0)
			{
				alert("Error in Creating Address");
			}
			else
			{
				alert("Please fill all fields");
			}
        });
    }
	
/*****************************************************************************/
/************************** Delete Address *********************************/
/****************************************************************************
	// customer_address_delete
	$scope.address_delete = function() 
	{		
        $http.post('http://10.0.2.2/projects/kaiyinkalaigal/web/customer_address_delete.php', 
		{
		'customer_id': $scope.PH_get_cus_ID
		})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Address Deleted Successful");
				window.location = "adminpanel.html";
				return;
			}
			else
			{
				alert("Error While Deleting Address!!");
			}
        });
    }*/
/*****************************************************************************/
/************************** Update Address *********************************/
/****************************************************************************/
	$scope.myVar = true;
	$scope.pay_edit = function(address_id, street, landmark, city, state, pincode, country, mobile, address_type ) 
	{
		$scope.myVar = false;
		$scope.address_id = address_id;
		$scope.street = street;	
		$scope.landmark = landmark;	
		$scope.city = city;	
		$scope.state = state;	
		$scope.pincode = pincode;	
		$scope.country = country;	
		$scope.mobile = mobile;	
		$scope.address_type = address_type;	
	}
	//customer_address_delete
	$scope.update_address = function() 
	{		
        $http.post('http://10.0.2.2/projects/kaiyinkalaigal/web/user_address_update.php', 
		{'address_id': $scope.address_id, 'street':$scope.street, 'landmark':$scope.landmark, 'city':$scope.city, 'state': $scope.state,
		'pincode': $scope.pincode, 'country':$scope.country, 'mobile': $scope.mobile, 'address_type': $scope.address_type
		})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Address Updated Successful");
				window.location = "pay.html";
				return;
				
			}
			else if(data.success == 0)
			{
				alert("Error While Updating Address!!");
			}
			else
			{
				alert("Please fill all fields");
			}
        });
    }

/*****************************************************************************/
/************************** Place Order **************************************/
/****************************************************************************/
	$scope.info_place_id = $cookieStore.get("p_id");
	$scope.cook_net_total = $cookieStore.get("cook_net_total");

	//place order
	$scope.place_order = function() 
	{		
        $http.post('http://10.0.2.2/projects/kaiyinkalaigal/web/place_order.php', {'email': $scope.log_user_email, 
		'net_total': $scope.cook_net_total,'place_id':$scope.info_place_id})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Order Created Successfully");
				$scope.cook_net_total="0";
				window.location = "order.html";
				return;
				
			}
			else if(data.success == 0)
			{
				alert("Error in placing order");
			}
			else if(data.success == 3)
			{
				alert("Wallet Balance is low - Add Money");
			}
			else
			{
				alert("Please fill all fields");
			}
        });
    }	
});