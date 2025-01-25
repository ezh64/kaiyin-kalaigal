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
$get_password = ($data->password);

if(empty($get_email) || empty($get_password))
{
	$response["success"] = 2;
	echo json_encode($response);
}
else
{
	$result = mysqli_query($conn,"SELECT * FROM customer_details WHERE email = '$get_email' 
							AND password = '$get_password' and field_9='Approved' ");
				
		if (mysqli_num_rows($result))
		{
			
			while($Allresponse = mysqli_fetch_array($result))
			{
				// temp user array
				$response = array();
				$response = $Allresponse;
				$user_type = $Allresponse["field_1"];
				
							if (strcmp($user_type,"vendor")==0)
							{
								$response["success"] = 1;	
								echo json_encode($response);
							}
							else if(strcmp($user_type,"master")==0)
							{
								$response["success"] = 5;	
								echo json_encode($response);
							}
							else if(strcmp($user_type,"buyer")==0)
							{
								$response["success"] = 4;	
								echo json_encode($response);
							}
							else 
							{
								$response["success"] = 0;	
								echo json_encode($response);
							} 
							
			}	
			
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