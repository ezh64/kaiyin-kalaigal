<?php
	/* ************************************************************
	
	
	********************** Update Customer Address******************/

// array for JSON response
$response = array();

// include db connect class
require_once __DIR__ . '/db_connect.php';
	
// connecting to db


// check for post data
$data = json_decode(file_get_contents("php://input"));

$get_address_id = ($data->address_id);
$get_street = ($data->street);
$get_landmark = ($data->landmark);
$get_city = ($data->city);
$get_state = ($data->state);
$get_pincode = ($data->pincode);
$get_country = ($data->country);
$get_mobile = ($data->mobile);
$get_address_type = ($data->address_type);

if(empty($get_address_id) || empty($get_street) || empty($get_landmark) || empty($get_city) || empty($get_state) || empty($get_pincode) 
|| empty($get_country) || empty($get_mobile) || empty($get_address_type))
{
	$response["success"] = 2;
	echo json_encode($response);
}
else
{		
	// get all news
	$result = mysqli_query($conn,"UPDATE customer_address SET street='$get_street', landmark='$get_landmark', city='$get_city', state='$get_state', 
							pincode='$get_pincode', country='$get_country', mobile='$get_mobile', address_type='$get_address_type'
							WHERE address_id = '$get_address_id'");
		
	// check for empty result
	if ($result)
	{
		// success	
		$response["success"] = 1;
						
		// echoing JSON response
		echo json_encode($response);
	} 
	else
	{
		$response["success"] = 0;	
		echo json_encode($response);
	}
}
?>