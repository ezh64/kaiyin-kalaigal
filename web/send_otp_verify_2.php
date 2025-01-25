<?php
/* Following code will match admin login credentials */

//user temp array
$response = array();

// include db connect class
require_once __DIR__ . '/db_connect.php';

// connecting to db


// check for post data
$data = json_decode(file_get_contents("php://input"));
$get_empid =($data->email);
$get_password =  ($data->password);
$get_password_2 =  ($data->password_2);

if(empty($get_empid) || empty($get_password)|| empty($get_password_2) )
{
	$response["success"] = 2;
	echo json_encode($response);
}
else if (strlen($get_password) != 8) 
{
	$response["success"] = 4;
	echo json_encode($response);
}
else if (strcmp($get_password ,$get_password_2 )==1 ) 
{
	$response["success"] = 5;
	echo json_encode($response);
}
else
{
	$result = mysqli_query($conn,"SELECT * FROM customer_details WHERE otp = '$get_empid' ");

		if (mysqli_num_rows($result))
		{
			$Allresponse = mysqli_fetch_array($result);
			// temp user array
			$response = array();
			$response = $Allresponse;
	
			mysqli_query($conn,"UPDATE customer_details SET password='$get_password' WHERE otp='$get_empid' ");
		
			$response["success"] = 1;	
			echo json_encode($response);
		} 
		else
		{
			// success	
			$response["success"] = 0;
			// echoing JSON response
			echo json_encode($response);
		}
}
?>