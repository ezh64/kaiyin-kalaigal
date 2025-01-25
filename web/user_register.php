<?php
/*********************


*********/

/* Following register will admin login credentials */

// array for JSON response
$response = array();

// include db connect class
require_once __DIR__ . '/db_connect.php';

// connecting to db


$data = json_decode(file_get_contents("php://input"));
$get_fname =  ($data->fname);
$get_lname =  ($data->lname);
$get_email =  ($data->email);
$get_password =  ($data->password);
$get_mobile = ($data->mobile);
$get_field_1 = "buyer";
$get_created_date = date('Y-m-d');
$get_otp = rand(10000,99000);
$get_wallet = 5000;

$result = mysqli_query($conn,"SELECT * FROM customer_details WHERE email = '$get_email'");

if(empty($get_fname) || empty($get_lname) || empty($get_email) || empty($get_password) )
{
	$response["success"] = 2;
	echo json_encode($response);
}
else if (strlen($get_mobile) != 10) 
{
	$response["success"] = 3;
	echo json_encode($response);
}
else if (strlen($get_password) != 8) 
{
	$response["success"] = 5;
	echo json_encode($response);
}
else if(mysqli_num_rows($result))
{
	$response["success"] = 4;	
	echo json_encode($response);
}
else
{
	
	
	// Password validation - $ 1 A
	if (preg_match('/[!\'^£$%&*()}{@#~?><>,|=_+¬-]/', $get_password) 
	& (preg_match('/[0-9]/', $get_password)) 
	& (preg_match('/[A-Z]/', $get_password)) )
	{
		
	// get customer 
	$result1 = mysqli_query($conn,"INSERT INTO customer_details
		(fname, lname, email, password, mobile, created_date, otp, field_1, field_3, field_9)
	VALUES('$get_fname', '$get_lname', '$get_email', '$get_password', '$get_mobile',
	'$get_created_date', '$get_otp', '$get_field_1', '$get_wallet', 'Approved')");

	// check for empty result
	if($result1)
	{
		

		// success
		$response["success"] = 1;
		
		// echoing JSON response
		echo json_encode($response);
		
		/////////////////////////////////////////////////
			///////////////////Email /////////////////////
			/////////////////////////////////////////////////

		$message = "Dear ".$get_fname." ".$get_lname." \n\n\t To complete your registration, please enter the One Time Password mentioned below \r\n\n OTP = ".$get_otp." ";
		$from = "grocery@gmail.com";
		$subject = "OTP Verification";

		// Message lines should not exceed 70 characters (PHP rule), so wrap it
		$message = wordwrap($message, 100);

				// Send Mail By PHP Mail Function
				$mailto= $get_email; //$get_sender_mail TO 
			//	mail($mailto,$subject, $message, "From:".$from);
				
		// Send Mail By PHP Mail Function
		
			/////////////////////////////////////////////////
			///////////////////SMS /////////////////////
			/////////////////////////////////////////////////

	// Authorisation details
	$username = "contact@arudhrainnovations.com";
	$apiKey = urlencode('gFiNovbuwFA-Sq6GSGPLvCfzHKWRcQBbuzlt0ChGEK');
	$test = "0";

	$sender = urlencode('AISOFT');
	$numbers = $get_mobile; // A single number or a comma-seperated list of numbers

	$message = 'Your OTP '.$get_otp.' to verify your mobile number by AISOFT';

	$message = urlencode($message);
	$data = array('apikey' => $apiKey, 'numbers' => $numbers, "sender" => $sender, "message" => $message);
	
		$ch = curl_init('https://api.textlocal.in/send/');
		curl_setopt($ch, CURLOPT_POST, true);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		$result2 = curl_exec($ch); // This is the result from the API
		curl_close($ch);

			/////////////////////////////////////////////////
			///////////////////SMS /////////////////////
			/////////////////////////////////////////////////

	}
	else 
	{
		// unsuccess
		$response["success"] = 0;
		
		// echoing JSON response
		echo json_encode($response);
	}
	
	
	}
	else 
	{
		// unsuccess
		$response["success"] = 6;
		
		// echoing JSON response
		echo json_encode($response);
	}
}
?>