<?php

/* Following code will edit table by referring id */

// array for JSON response
$response = array();

// include db connect class
require_once __DIR__ . '/db_connect.php';
	
// connecting to db

$data = json_decode(file_get_contents("php://input"));
$get_id = ($data->cus_id);

$result = mysqli_query($conn,"DELETE FROM 	category WHERE cus_id = '$get_id'");
	if ($result)
	{
		$response["success"] = 1;
		echo json_encode($response);
	} 
	else
	{
		$response["success"] = 0;
		echo json_encode($response);
	} 

?>