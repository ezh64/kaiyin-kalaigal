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

$result = mysqli_query($conn,"SELECT * FROM customer_details WHERE email = '$get_email'");
if(mysqli_num_rows($result))
{
	$Alldetails = mysqli_fetch_array($result);
	// temp user array
	$get_customer_id = $Alldetails["customer_id"];
	$get_fname = $Alldetails["fname"];
	$get_lname = $Alldetails["lname"];
	$get_email = $Alldetails["email"];
	
	$result1 = mysqli_query($conn,"SELECT * FROM customer_address WHERE customer_id = '$get_customer_id'");		
	if(mysqli_num_rows($result1))
	{
		$response["address"] = array();
		while($Alladdress = mysqli_fetch_array($result1))
		{
			$address = array();
			$address = $Alladdress; // View All Address Fields
			$address["fname"] = $get_fname; // View All Address Fields
			$address["lname"] = $get_lname; // View All Address Fields
			$address["email"] = $get_email; // View All Address Fields
			array_push($response["address"],$address);
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
else
{
	$response["success"] = 0;	
	echo json_encode($response);
}
?>