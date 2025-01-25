<?php
	/* ************************************************************
	
	
	********************** Create Customer Address******************/

// array for JSON response
$response = array();

// include db connect class
require_once __DIR__ . '/db_connect.php';

// connecting to db


$data = json_decode(file_get_contents("php://input"));
$get_cus_email = ($data->email);
$get_street = ($data->street);
$get_landmark = ($data->landmark);
$get_city = ($data->city);
$get_state = ($data->state);
$get_pincode = ($data->pincode);
$get_country = ($data->country);
$get_mobile = ($data->mobile);
$get_address_type = ($data->address_type);

if(empty($get_cus_email) || empty($get_street) || empty($get_landmark) || empty($get_city) || empty($get_state) || empty($get_pincode) 
|| empty($get_country) || empty($get_mobile) || empty($get_address_type))
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
		
		// get customer 
		$result1 = mysqli_query($conn,"INSERT INTO customer_address(customer_id, street, landmark, city, state, pincode, country, mobile, address_type)
		VALUES('$get_customer_id', '$get_street', '$get_landmark', '$get_city', '$get_state','$get_pincode', '$get_country', '$get_mobile', '$get_address_type')");

		// check for empty result
		if($result1)
		{
			// success
			$response["success"] = 1;
			
			// echoing JSON response
			echo json_encode($response);
		}
		else 
		{
			// unsuccess
			$response["success"] = 0;
			
			// echoing JSON response
			echo json_encode($response);
		}	
	}
	else
	{
		$response["success"] = 0;	
		echo json_encode($response);
	}
}
?>