<?php
	/* ************************************************************
	*************** - CPanel*******************
	***************************************************************
	********************** Update Orders  ************************
	***************************************************************/

/* Update Product  */

// array for JSON response
$response = array();

// include db connect class
require_once __DIR__ . '/db_connect.php';
	
// connecting to db


// check for post data
$data = json_decode(file_get_contents("php://input"));
$get_status = ($data->status);
$get_order_id = ($data->order_id);
	
if(empty($get_status) || empty($get_order_id))
{
	$response["success"] = 2;
	echo json_encode($response);
}
else
{
	$result = mysqli_query($conn,"UPDATE add_to_cart SET status='$get_status' WHERE cart_id = '$get_order_id'");
	if($result)
	{
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