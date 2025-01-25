var app = angular.module("myapp", ['ngCookies']);
app.controller("myappCtrl", function($scope, $cookies, $cookieStore, $http) 
{
/****************************************************************************/
/************************** Admin Details ***********************************/
/****************************************************************************/	
	$scope.bn_adm_email = $cookieStore.get("bn_adm_email");

	$http.post('https://myapphosting.in/android/kaiyin/admin_details.php', {'email': $scope.bn_adm_email})
	.success(function(data, status, headers, config) 
	{
		if(data.success == 1)
		{
			$scope.adm_details = data.details;
		}
		else
		{
			$scope.er_admdtls = "No Data Found !!!";
		}
    });
	
/****************************************************************************/
/************************** Admin Logout ************************************/
/****************************************************************************/		
	$scope.admin_logout = function() 
	{
		if(confirm("Are You Sure?"))
		{
			$cookies.bn_adm_email = "";
			window.location = "index.html";
			return;
		}
		else
		{
			return false;
		}
	}
	
/****************************************************************************/
/************************** View All Clients *******************************/
/****************************************************************************/
	// All Products
	$http.get('https://myapphosting.in/android/kaiyin/news_get.php')
	.success(function (response) 
	{
		if(response.success == 1)
		{
			$scope.news = response.clients;
		}
		else
		{
			$scope.er_list2 = "No Image Found !!!";
		}
	});
	
/****************************************************************************/
/************************** Delete clients *********************************/
/****************************************************************************/
	// products_delete
	$scope.news_delete = function(client_id) 
	{		
        $http.post('https://myapphosting.in/android/kaiyin/news_delete.php', 
		{
		'client_id': client_id
		})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Image Deleted Successful");
				window.location = "news.html";
				return;
			}
			else if(data.success == 0)
			{
				alert("Error While Deleting Client!!");
			}
			else
			{
				alert("No id found");
			}
        });
    }
	
/*****************************************************************************/
/************************** Update clients *********************************/
/****************************************************************************/

	$scope.news_edit = function(clients_id,cname,cimage,category) 
	{
		$scope.client_id = clients_id;
		$scope.cname = cname;
		$scope.cimage = cimage;
		$scope.category = category;	
	}
});