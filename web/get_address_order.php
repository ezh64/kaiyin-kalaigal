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

$result = mysqli_query($conn,"SELECT * FROM customer_address WHERE customer_id = '$get_email'");


if(mysqli_num_rows($result))
	{
		$response["details"] = array();
		while($Alladdress = mysqli_fetch_array($result))
		{
			$details = array();
			$details = $Alladdress; // View All details Fields
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