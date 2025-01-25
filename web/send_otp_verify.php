<?php
/* Following code will match admin login credentials */

//user temp array
$response = array();

// include db connect class
require_once __DIR__ . '/db_connect.php';

// connecting to db


// check for post data
$data = json_decode(file_get_contents("php://input"));
$get_empid = ($data->email);
$get_password = ($data->password);

if(empty($get_empid) || empty($get_password))
{
	$response["success"] = 2;
	echo json_encode($response);
}
else
{
	$result = mysqli_query($conn,"SELECT * FROM customer_details WHERE email = '$get_empid' AND mobile = '$get_password'  ");

		if (mysqli_num_rows($result))
		{
			$Allresponse = mysqli_fetch_array($result);
			// temp user array
			$response = array();
			$response = $Allresponse;
	
		$get_otp = rand(10000,90000);
		mysqli_query($conn,"UPDATE customer_details SET otp='$get_otp' WHERE email='$get_empid' ");

		/////////////////////////////////////////////////
			///////////////////Email /////////////////////
			/////////////////////////////////////////////////

		$message = "Your OTP = ".$get_otp." \r\n\n\n Regards\n B-NEXT Technologies";
		$from = "superstore@gmail.com";
		$subject = "OTP Verification";
		// Message lines should not exceed 70 characters (PHP rule), so wrap it
		$message = wordwrap($message, 100);
		$mailto= $get_empid; //$get_sender_mail TO 
		mail($mailto,$subject, $message, "From:".$from);
		// Send Mail By PHP Mail Function
		

		// Authorisation details
	$username = "contact@arudhrainnovations.com";
	$apiKey = urlencode('gFiNovbuwFA-Sq6GSGPLvCfzHKWRcQBbuzlt0ChGEK');
	$test = "0";

	$sender = urlencode('AISOFT');
	$numbers = $get_password; // A single number or a comma-seperated list of numbers

	$message = 'Your OTP '.$get_otp;

	$message = urlencode($message);
	$data = array('apikey' => $apiKey, 'numbers' => $numbers, "sender" => $sender, "message" => $message);
	
		$ch = curl_init('https://api.textlocal.in/send/');
		curl_setopt($ch, CURLOPT_POST, true);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		$result = curl_exec($ch); // This is the result from the API
		curl_close($ch);

		
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