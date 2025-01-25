var app = angular.module("myapp", ['ngCookies']);
app.controller("myappCtrl", function($scope, $cookies, $cookieStore, $http) 
{	
/****************************************************************************/
/************************** User Login *************************************/
/****************************************************************************/
	$scope.user_register = function() 
	{		
		$http.post('http://10.0.2.2/projects/kaiyinkalaigal/web/user_register.php', {'fname': $scope.reg_fname, 'lname':$scope.reg_lname, 'email':$scope.reg_email, 'password': $scope.reg_password, 'mobile': $scope.reg_mobile})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Registered Successfully");
				window.location = "otp.html";
				return;				
			}
			else if(data.success == 0)
			{
				alert("Invalid Inputs");
			}
			else if(data.success == 2)
			{
				alert("Pls fill all fields");
			}
			else if(data.success == 3)
			{
				alert("Enter 10 Digit Mobile No");
			}
			else if(data.success == 4)
			{
				alert("Email ID Already Exist");
			}
			else if(data.success == 5)
			{
				alert("Enter 8 Digit Password");
			}
			else if(data.success == 6)
			{
				alert("Atleast Use One Special, Number and Captial Character - $1A ");
			}
			else
			{
				alert("Register Unsuccessfully");
			}
        });
    }

	$scope.vendor_register = function() 
	{		
		$http.post('http://10.0.2.2/projects/kaiyinkalaigal/web/vendor_register.php', {'fname': $scope.reg_fname, 'lname':$scope.reg_lname, 'email':$scope.reg_email, 'password': $scope.reg_password, 
		'mobile': $scope.reg_mobile,'field_2': $scope.field_2})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Registered Successfully");
				window.location = "otp.html";
				return;				
			}
			else if(data.success == 0)
			{
				alert("Invalid Inputs");
			}
			else if(data.success == 2)
			{
				alert("Pls fill all fields");
			}
			else if(data.success == 3)
			{
				alert("Enter 10 Digit Mobile No");
			}
			else if(data.success == 4)
			{
				alert("Email ID Already Exist");
			}
			else if(data.success == 5)
			{
				alert("Enter 12 Digit Adhaar Number");
			}
			else if(data.success == 7)
			{
				alert("Enter 8 Digit Password");
			}
			else if(data.success == 6)
			{
				alert("Atleast Use One Special, Number and Captial Character - $1A ");
			}
			else
			{
				alert("Register Unsuccessfully");
			}
        });
    }

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
				window.location = "admin_home.html";  // Home Page
				return;				
			}
			else if(data.success == 2)
			{			
				alert("Please fill all fields");
				return;				
			}
			else if(data.success == 4)
			{			
				alert("Login Successful");
				$cookieStore.put("log_user_email",$scope.log_email);
				window.location = "index.html";  // Home Page
				return;				
			}
			else if(data.success == 5)
			{			
				alert("Login Successful");
				$cookieStore.put("log_user_email",$scope.log_email);
				window.location = "master_home.html";  // Home Page
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
	

$scope.myVar = true;


/****************************************************************************/
/************************** User Details ***********************************/
/****************************************************************************/

	
	$http.post('http://10.0.2.2/projects/kaiyinkalaigal/web/get_lastest_product.php')
	.success(function(data, status, headers, config)  
	{
			$scope.all_lastest_product = data.products;
	});
	
	$scope.log_user_email = $cookieStore.get("log_user_email");
	
		$http.post('http://10.0.2.2/projects/kaiyinkalaigal/web/myproducts_get.php',{'email':$scope.log_user_email}	)
		.success(function(data, status, headers, config)  
		{
			$scope.myproducts = data.details;
		});


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
	/***************ADD Products**********************************************/
/****************************************************************************/
/**************************************************************************************/
	$scope.add_product= function() 
	{
		//$scope.from_date = document.getElementById('from_date').value;
		$scope.discount ="Nil";
		$http.post('http://10.0.2.2/projects/kaiyinkalaigal/web/products_add.php',{
			'pname': $scope.pname, 'description':$scope.description,'price':$scope.price,
			'discount':$scope.discount,
			'size':$scope.size,'stock':$scope.stock,'specification':$scope.specification,
			'shipping_days':$scope.shipping_days,
			'shipping_charge':$scope.shipping_charge,'category1':$scope.category_name,
			'category2':$scope.category2,'category3':$scope.category3,
			'email':$scope.log_user_email})	
		.success(function(data, status, headers, config)
		{
			if(data.success == 1)
			{
				alert("Added successful");
				window.location = "admin_view.html";
				return;
			}
			else if(data.success == 3)
			{
				alert("Enter 10 Digit Mobile No");
				return;
			}
			else if(data.success == 2)
			{
				alert("Please fill all field");
				return;
			}
			else
			{
				alert("Added successful");
				window.location = "admin_view.html";
				return;
			}
		});
	}
		
/****************************************************************************/
/************************** Delete Products *********************************/
/****************************************************************************/
	// products_delete
	$scope.myVar = true;
	$scope.pro_del= function(product_id) 
	{		
        $http.post('http://10.0.2.2/projects/kaiyinkalaigal/web/delete.php', 
		{
		'product_id': product_id
		})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Product Deleted Successful");
				window.location = "admin_view.html";
				return;
			}
			else
			{
				alert("No id found");
			}
        });
    }
	
	$scope.delete_category= function(cus_id) 
	{		
        $http.post('http://10.0.2.2/projects/kaiyinkalaigal/web/delete_category.php', 
		{
		'cus_id': cus_id
		})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Deleted Successful");
				window.location = "admin_category.html";
				return;
			}
			else
			{
				alert("No id found");
			}
        });
    }
	
/*****************************************************************************/
/************************** Update Products *********************************/
/****************************************************************************/
$scope.myVar = true;
	$scope.edit = function(product_id,pname,description,price,discount,size,
							stock,specification,shipping_days,shipping_charge,category1
							,category2,category3) 
	{
		window.location = "edit_product.html";

		$cookieStore.put("cook_product_id",product_id);
		$cookieStore.put("cook_field_1",pname);
		$cookieStore.put("cook_field_2",description);
		$cookieStore.put("cook_field_3",price);
		$cookieStore.put("cook_field_12",discount);
		$cookieStore.put("cook_field_4",size);
		$cookieStore.put("cook_field_5",stock);
		$cookieStore.put("cook_field_6",specification);
		$cookieStore.put("cook_field_7",shipping_days);
		$cookieStore.put("cook_field_8",shipping_charge);
		$cookieStore.put("cook_field_9",category1);
		$cookieStore.put("cook_field_10",category2);
		$cookieStore.put("cook_field_11",category3);
	}
	
	
	$scope.cook_product_id = $cookieStore.get("cook_product_id");
	$scope.cook_field_12 = $cookieStore.get("cook_field_12");
	$scope.cook_field_1 = $cookieStore.get("cook_field_1");
	$scope.cook_field_2 = $cookieStore.get("cook_field_2");
	$scope.cook_field_3 = $cookieStore.get("cook_field_3");
	$scope.cook_field_4 = $cookieStore.get("cook_field_4");
	$scope.cook_field_5 = $cookieStore.get("cook_field_5");
	$scope.cook_field_6 = $cookieStore.get("cook_field_6");
	$scope.cook_field_7 = $cookieStore.get("cook_field_7");
	$scope.cook_field_8 = $cookieStore.get("cook_field_8");
	$scope.cook_field_9 = $cookieStore.get("cook_field_9");
	$scope.cook_field_10 = $cookieStore.get("cook_field_10");
	$scope.cook_field_11 = $cookieStore.get("cook_field_11");
	

/****************************************************************************/
/************************** save data ***********************************/
/****************************************************************************/
	$scope.product_save = function() 
	{
		$http.post('http://10.0.2.2/projects/kaiyinkalaigal/web/product_update.php', {
				'product_id': $scope.cook_product_id,'pname': $scope.cook_field_1, 
				'description':$scope.cook_field_2,'price':$scope.cook_field_3,
				'discount':$scope.cook_field_12,
				'size':$scope.cook_field_4,
				'stock':$scope.cook_field_5,'specification':$scope.cook_field_6,
				'shipping_days':$scope.cook_field_7,'shipping_charge':$scope.cook_field_8,
				'category1':$scope.cook_field_9,'category2':$scope.cook_field_10,
				'category3':$scope.cook_field_11	})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert(" Updated Successfully");					
				window.location = "admin_view.html";
				return;
			}
			else
			{
				alert("Error in updating");						
			}
									
		});
	}

	
		$scope.image_update = function(product_id) 
			{
				$cookieStore.put("cook_product_id",product_id);
				window.location = "file.html";
				return;
			}
		$scope.cook_product_id = $cookieStore.get("cook_product_id");
		
		
	
		$http.post('http://10.0.2.2/projects/kaiyinkalaigal/web/orders_get.php')
		.success(function(data, status, headers, config)
		{
				$scope.orders = data.orders;			
		});
		
		$scope.myOrdersVar = true;

	$scope.status = function(order_id)
	{
		$cookieStore.put("bn_order_id",order_id);
		$scope.bn_order_id = order_id;
	}
	
	
	$scope.radio = function(status)
	{
		$scope.radio_status = status;
		$http.post('http://10.0.2.2/projects/kaiyinkalaigal/web/orders_update.php',{'status': $scope.radio_status, 
		'order_id':$scope.bn_order_id})
		.success(function(data, status, headers, config)
		{
			if(data.success == 1)
			{
				alert("Status Updated");
				window.location = "orders.html";
				return;
			}
			if(data.success == 0)
			{
				alert("No Orders Updated!!!");
			}
			if(data.success == 2)
			{
				alert("Pls select any statua");
			}
		});
	}
	
$scope.address_more = function(customer_id) 
	{
		window.location = "address_more.html";
		$cookieStore.put("cook_customer_id",customer_id);
		return;
	}
	
	$scope.cook_customer_id = $cookieStore.get("cook_customer_id");
		
	
		$http.post('http://10.0.2.2/projects/kaiyinkalaigal/web/get_address_order.php',{'email': $scope.cook_customer_id})
		.success(function(data, status, headers, config)
		{
				$scope.user_address = data.details;		
		});
	
	

$scope.shipping_status = function(cart_id,shipping,tracking) 
	{
		window.location = "edit_shipping.html";
		$cookieStore.put("cook_cart_id",cart_id);
		$cookieStore.put("cook_shipping",shipping);
		$cookieStore.put("cook_tracking",tracking);
		return;
	}
	
	$scope.cook_cart_id = $cookieStore.get("cook_cart_id");
	$scope.cook_shipping = $cookieStore.get("cook_shipping");
	$scope.cook_tracking = $cookieStore.get("cook_tracking");
		
		
		/****************************************************************************/
/************************** save data ***********************************/
/****************************************************************************/
	$scope.save_shipping = function() 
	{
	$http.post('http://10.0.2.2/projects/kaiyinkalaigal/web/save_shipping.php', {
			'id': $scope.cook_cart_id,'field_1': $scope.cook_shipping, 
			'field_2':$scope.cook_tracking	})
	.success(function(data, status, headers, config) 
	{
		if(data.success == 1)
		{
			alert(" Updated Successfully");					
			window.location = "orders.html";
			return;
		}
		else
		{
			alert("Error in updating");						
		}
								
    });
	}


	

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
	

	$http.post('http://10.0.2.2/projects/kaiyinkalaigal/web/get_category.php')
	.success(function(data, status, headers, config)  
	{
			$scope.all_category = data.products;
	});

	$http.post('http://10.0.2.2/projects/kaiyinkalaigal/web/get_all_category.php')
	.success(function(data, status, headers, config)  
	{
			$scope.my_category = data.details;
	});
	
	$http.post('http://10.0.2.2/projects/kaiyinkalaigal/web/get_locality.php')
	.success(function(data, status, headers, config)  
	{
			$scope.all_locality = data.details;
	});

	$http.post('http://10.0.2.2/projects/kaiyinkalaigal/web/get_sub_category.php')
	.success(function(data, status, headers, config)  
	{
			$scope.all_sub_category = data.products;
	});
	
	
	
	
	
	$scope.category_details = function(field_1)
	{
		$cookieStore.put("cook_category_name",field_1);
		window.location="product.html";
		return;
	}
		$scope.cook_category_name = $cookieStore.get("cook_category_name");


	
/****************************************************************************/
/************************** View All Products *******************************/
/****************************************************************************/
	

	$http.post('http://10.0.2.2/projects/kaiyinkalaigal/web/products_get.php')
	.success(function(data, status, headers, config)  
	{
		if(data.success == 1)
		{
			$scope.products = data.products;
			$scope.category = data.category;
		}
		else
		{
			$scope.er_list = "No Products Found !!!";
		}
	});
	
/****************************************************************************/
/************************** View Product Info *******************************/
/****************************************************************************/	

	$scope.product_details = function(p_id)
	{
		$cookieStore.put("p_id",p_id);
		window.location="productinfo.html";
		return;
	}

	$scope.p_id = $cookieStore.get("p_id");	
	
	$http.post('http://10.0.2.2/projects/kaiyinkalaigal/web/product_info.php',{'product_id':$scope.p_id})
	.success(function(data, status, headers, config)  
	{
			$scope.product_info = data.products;
	});
	
	$http.post('http://10.0.2.2/projects/kaiyinkalaigal/web/feedback_get.php',{'email':$scope.p_id})
	.success(function(data, status, headers, config)  
	{
			$scope.get_feedback_details = data.details;
	});
	
	$http.post('http://10.0.2.2/projects/kaiyinkalaigal/web/get_all_feedback.php')
	.success(function(data, status, headers, config)  
	{
			$scope.all_feedback_details = data.details;
	});
		
	$http.post('http://10.0.2.2/projects/kaiyinkalaigal/web/get_user.php')
	.success(function(data, status, headers, config)  
	{
			$scope.all_user_details = data.details;
	});
		
/****************************************************************************/
/************************** Delete Products *********************************/
/****************************************************************************/
	// products_delete
	$scope.product_delete = function(product_id) 
	{		
        $http.post('http://10.0.2.2/projects/kaiyinkalaigal/web/products_delete.php', 
		{
		'product_id': product_id
		})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Product Deleted Successful");
				window.location = "products.html";
				return;
			}
			else if(data.success == 0)
			{
				alert("Error While Deleting Product!!");
			}
			else
			{
				alert("No id found");
			}
        });
    }
	
/*****************************************************************************/
/************************** Update Products *********************************/
/****************************************************************************/

	$scope.product_edit = function(product_id,pname,pimage,description,price,offer,size,
							stock,specification,tax_amount,shipping_days,shipping_charge,cat_name,category1,category2,category3,category4 ) 
	{
		$scope.product_id = product_id;
		$scope.pname = pname;
		$scope.pimage = pimage;
		$scope.description = description;
		$scope.price = price;
		$scope.offer = offer;
		$scope.size = size;
		$scope.stock = stock;
		$scope.specification = specification;
		$scope.tax_amount = tax_amount;
		$scope.shipping_days = shipping_days;
		$scope.shipping_charge = shipping_charge;
		$scope.cat_name = cat_name;
		$scope.category1 = category1;
		$scope.category2 = category2;
		$scope.category3 = category3;
		$scope.category4 = category4;	
	}
	
/*****************************************************************************/
/************************** Product Category *********************************/
/****************************************************************************/

	$http.post('http://10.0.2.2/projects/kaiyinkalaigal/web/category_get.php',{'product':$scope.product_name})
	.success(function(data, status, headers, config)  
	{
		if(data.success == 1)
		{
			$scope.category = data.category;
			$scope.types = data.types;
			$scope.brand = data.brand;
			$scope.size = data.size;
			$scope.offers = data.offers;
		}
		else
		{
			$scope.er_list = "No Products Found !!!";
		}
	});
	
	$scope.cat_filter = function() 
	{	
		$scope.cat = document.getElementById('category').value;
		alert($scope.cat);
		$cookieStore.put("category",$scope.cat);
	}
	$scope.category = $cookieStore.get("category");

/*****************************************************************************/
/************************** Add to Cart **************************************/
/*****************************************************************************/
	$scope.p_id = $cookieStore.get("p_id");
	//cart_add
	$scope.addtocart = function() 
	{		
		if($scope.myLoginVar == false)
		{
		alert("Login to Continue");
		}
		else if($scope.log_user_email == "")
		{
			alert("Login to Continue");
		}
		else
		{
			$http.post('http://10.0.2.2/projects/kaiyinkalaigal/web/cart_add.php', {'product_id': $scope.p_id, 'email':$scope.log_user_email})
			.success(function(data, status, headers, config) 
			{
				if(data.success == 1)
				{
					alert("Cart Added Successful");
					window.location = "bag.html";
					return;
					
				}
				else if(data.success == 0)
				{
					alert("Error in Adding Cart");
				}
				else if(data.success == 2)
				{
					alert("No Id Found");
				}
				else
				{
					alert("No  Found");
				}
			});
		}
	}
	
/*****************************************************************************/
/************************** Place order button********************************/
/*****************************************************************************/
	$scope.info_place_id = $cookieStore.get("info_place_id");	
	

	$scope.home_page = function()
	{
		window.location="index.html";
		return;
	}
	
	
$scope.update_status_con = function(cus_id,field_9) 
	{
		window.location = "vendor_status_edit.html";
		$cookieStore.put("cook_con_id",cus_id);
		$cookieStore.put("cook_con_status",field_9);
		
		return;
	}	
	
	$scope.cook_con_id = $cookieStore.get("cook_con_id");
	$scope.cook_con_status = $cookieStore.get("cook_con_status");

	$scope.save_con_status = function() 
	{		
		$http.post('http://10.0.2.2/projects/kaiyinkalaigal/web/update_status.php',{
		 'cus_id':$scope.cook_con_id, 'field_9':$scope.cook_con_status})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Submited successfully");
				window.location = "view_con_details.html";
				return;				
			}
			else
			{
				alert("Invalid Inputs");
			}   
          });
     }
	 
	 
	$scope.delete_review = function(cus_id) 
	{		
        $http.post('http://10.0.2.2/projects/kaiyinkalaigal/web/delete_review.php', 
		{
		'cus_id': cus_id
		})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Deleted Successful");
				window.location = "view_review_details.html";
				return;
			}
			else if(data.success == 0)
			{
				alert("Error While Deleting Product!!");
			}
			else
			{
				alert("No id found");
			}
        });
    }


$scope.edit_category = function(cus_id,field_1,field_2) 
	{
		window.location = "edit_category.html";
		$cookieStore.put("cook_cus_id",cus_id);
		$cookieStore.put("cook_field_1",field_1);
		$cookieStore.put("cook_field_2",field_2);
		return;
	}
	
	$scope.cook_cus_id = $cookieStore.get("cook_cus_id");
	$scope.cook_field_1 = $cookieStore.get("cook_field_1");
	$scope.cook_field_2 = $cookieStore.get("cook_field_2");
		
		
	$scope.save_category = function() 
	{
	$http.post('http://10.0.2.2/projects/kaiyinkalaigal/web/save_category.php', {
			'id': $scope.cook_cus_id,'field_1': $scope.cook_field_1, 
			'field_2':$scope.cook_field_2
			})
	.success(function(data, status, headers, config) 
	{
		if(data.success == 1)
		{
			alert(" Updated Successfully");					
			window.location = "orders.html";
			return;
		}
		else
		{
			alert("Error in updating");						
		}
								
    });
	}
	
	
	
	$scope.add_solution = function() 
	{
	$http.post('http://10.0.2.2/projects/kaiyinkalaigal/web/add_solution.php', 
		{
		'field_1':$scope.field_1,'field_2':$scope.field_2,'field_3':$scope.field_3,
		'field_4':$scope.field_4,'field_5':$scope.field_5
		})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Submitted Successfully");
				window.location = "admin_update_services.html";
				return;				
			}
			
			else
				{
					alert("Un Successfully");
				}
        });
    }
	
	
	
	
});