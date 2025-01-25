<?php
	/* ************************************************************
	*************** - CPanel*******************
	***************************************************************
	********************** View Cart *****************************
	***************************************************************/


// array for JSON response
$response = array();

// include db connect class
require_once __DIR__ . '/db_connect.php';
	
// connecting to db


// check for post data
$data = json_decode(file_get_contents("php://input"));
$get_email = ($data->email);
$sub_total = 0;
$net_total = 0;
$shipping_charge = 0;
$tax_amount = 0;
	
// get all jobs
$result = mysqli_query($conn,"SELECT * FROM customer_details WHERE email = '$get_email'");
if(mysqli_num_rows($result))
{
	$Info = mysqli_fetch_array($result);
	$get_customer_id = $Info["customer_id"];
	$result = mysqli_query($conn,"SELECT * FROM add_to_cart WHERE customer_id='$get_customer_id' and order_status='Pending' ");

	// check for empty result
	if (mysqli_num_rows($result))
	{	
		$response["cart"] = array();
		$response["details"] = array();
		while($Allcart = mysqli_fetch_array($result))
		{
			// temp user array
			$cart = array();
			
			$cart = $Allcart;  //Add all fields to cart
			
			// addition of total and charges
			$grand_total = $Allcart["grand_total"];
			$sub_total +=$grand_total;
			
			$total = $Allcart["net_total"];
			$net_total +=$total;
			
			$charge = $Allcart["shipping_charge"];
			$shipping_charge +=  $charge;
			
			$tax = $Allcart["tax_amount"];
			$tax_amount +=  $tax;
			
			$details = array();
			$details["sub_total"] = $sub_total;
			$details["shipping_charge"] = $shipping_charge;
			$details["tax_amount"] = $tax_amount;
			$details["net_total"] = $net_total;
			
			array_push($response["cart"],$cart);
		}
		array_push($response["details"],$details);		
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