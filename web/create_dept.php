<?php
/*********************

*********/

/* Following register will admin login credentials */

// array for JSON response
$response = array();

// include db connect class
require_once __DIR__ . '/db_connect.php';

// connecting to db


$data = json_decode(file_get_contents("php://input"));

$get_id = ($data->id);
$get_field_1 = ($data->field_1);
$get_created_date =date('Y-m-d');

if( empty($get_field_1)  )
{
	$response["success"] = 2;
	echo json_encode($response);
}
else
{


	$result = mysqli_query($conn,"UPDATE customer_details SET field_3=field_3+'$get_field_1'
				WHERE email = '$get_id' ");
				
	// check for empty result
	if($result)
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
?>