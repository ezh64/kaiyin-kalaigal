<?php
	/* ************************************************************
	
	***************************************************************
	********************** Create Customer Address******************
	***************************************************************/

// array for JSON response
$response = array();

// include db connect class
require_once __DIR__ . '/db_connect.php';

// connecting to db


$data = json_decode(file_get_contents("php://input"));
$get_cus_email =($data->email);

if(empty($get_cus_email))
{
	$response["success"] = 2;
	echo json_encode($response);
}
else
{
	$result = mysqli_query($conn,"SELECT * FROM customer_details WHERE email = '$get_cus_email'");
	if(mysqli_num_rows($result))
	{
		$Alldetails = mysqli_fetch_array($result);
		// temp user array
		$get_customer_id = $Alldetails["customer_id"];
	/*
		$result1 = mysqli_query($conn,"SELECT * FROM customer_address WHERE customer_id = '$get_customer_id'");
		$result2 = mysqli_query($conn,"SELECT * FROM add_to_cart WHERE customer_id='$get_customer_id'");
		if(mysqli_num_rows($result1) && mysqli_num_rows($result2))
		{
			$Alladdress = mysqli_fetch_array($result1);
			$get_street = $Alladdress["street"];
			$get_landmark = $Alladdress["landmark"];
			$get_city = $Alladdress["city"];
			$get_state = $Alladdress["state"];
			$get_pincode = $Alladdress["pincode"];
			$get_country = $Alladdress["country"];
			
			while($AllCarts = mysqli_fetch_array($result2))
			{
				$get_product_id = $AllCarts["product_id"];
				$get_pname = $AllCarts["pname"];
				$get_pimage = $AllCarts["pimage"];
				$get_description = $AllCarts["description"];
				$get_net_total = $AllCarts["net_total"];
				$get_quantity = $AllCarts["quantity"];

				$get_address = ''.$get_street.','.$get_landmark.','.$get_city.','.$get_state.','.$get_pincode.','.$get_country.'';
				$get_created_date = date('Y-m-d');
				$get_status = 'Pending';
				
				
				// get customer 
				$result3 = mysqli_query($conn,"INSERT INTO my_order(customer_id, product_id, pname, pimage, description, quantity, net_total, shipping_address, billing_address, created_date, status)
				VALUES('$get_customer_id', '$get_product_id', '$get_pname', '$get_pimage', '$get_description','$get_quantity', '$get_net_total', '$get_address', '$get_address', '$get_created_date', '$get_status')");

				// check for empty result
				if($result3)
				{
					// success
					$response["success"] = 1;					
				}
				else 
				{
					// unsuccess
					$response["success"] = 0;
				}
			}
			// echoing JSON response
			echo json_encode($response);
		}
		else
		{
			$response["success"] = 0;	
			echo json_encode($response);
		}
		*/
	}
	else
	{
		$response["success"] = 0;	
		echo json_encode($response);
	}
}
?>