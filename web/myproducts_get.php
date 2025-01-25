<?php
/*****************************

*****************************/


/* Following code will retrieve table values */

// array for JSON response
$response = array();

// include db connect class
require_once __DIR__ . '/db_connect.php';
	
// connecting to db

	
$data = json_decode(file_get_contents("php://input"));
$get_email = ($data->email);

// get all jobs
$result = mysqli_query($conn,"SELECT * FROM product_list  where email='$get_email' ");

if (mysqli_num_rows($result))
{
	$response["details"] = array();
	$project = array();
	while($AllProducts = mysqli_fetch_array($result))
	{
		// temp user array
		$details = array();
		$details = $AllProducts;
		array_push($response["details"],$details);
	}
	
	$response["success"] = 1;
	echo json_encode($response);
} 
else
{
	$response["success"] = 0;
	echo json_encode($response);
}
?>