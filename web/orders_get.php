<?php
/*********************
**** *****

*********/

/* Following code will retrieve table values */

// array for JSON response
$response = array();

// include db connect class
require_once __DIR__ . '/db_connect.php';
	
// connecting to db


// check for post data
$data = json_decode(file_get_contents("php://input"));
$get_email = "Nil";//($data->email);

if(empty($get_email) )
{	
	$response["success"] = 2;
	echo json_encode($response);
}
else
{
	// get all jobs
	$result = mysqli_query($conn,"SELECT * FROM add_to_cart ");
		
	// check for empty result
	if ($result)
	{	
		$response["orders"] = array();
		while($Allorders = mysqli_fetch_array($result))
		{	
			// temp user array
			$orders = array();
			$orders = $Allorders;
			
			array_push($response["orders"],$orders);	
		}		
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