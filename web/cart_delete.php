<?php
	/* ************************************************************
	*************** - CPanel*******************
	***************************************************************
	********************** Delete Cart  ************************
	***************************************************************/

// array for JSON response
$response = array();

// include db connect class
require_once __DIR__ . '/db_connect.php';
	
// connecting to db


// check for post data
$data = json_decode(file_get_contents("php://input"));
$get_cart_id = ($data->cart_id);
	
if(empty($get_cart_id))
{
	$response["success"] = 2;
	echo json_encode($response);
}
else
{	
	$result = mysqli_query($conn,"DELETE FROM 	add_to_cart WHERE cart_id = '$get_cart_id'");
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