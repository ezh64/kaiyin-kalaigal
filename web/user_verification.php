<?php
/*********************


*********/

/* Following code will match admin login credentials */

//user temp array
$response = array();

// include db connect class
require_once __DIR__ . '/db_connect.php';

// connecting to db


// check for post data
$data = json_decode(file_get_contents("php://input"));
$get_email = ($data->email);
$get_otp = ($data->otp);

if( empty($get_otp))
{
	$response["success"] = 2;
	echo json_encode($response);
}
else
{
	$result = mysqli_query($conn,"SELECT * FROM customer_details WHERE otp = '$get_otp'");
	if(mysqli_num_rows($result))
	{
		$result1 = mysqli_query($conn,"UPDATE customer_details SET success = '1' WHERE otp = '$get_otp'");
		$response["success"] = 1;	
		echo json_encode($response);
	}
	else
	{
		$response["success"] = 0;	
		echo json_encode($response);
	}
}
?>