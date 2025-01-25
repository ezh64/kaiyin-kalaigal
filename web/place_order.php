<?php
	/* ************************************************************
	
	
	********************** Create Customer Address******************/
	

// array for JSON response
$response = array();

// include db connect class
require_once __DIR__ . '/db_connect.php';

// connecting to db


$data = json_decode(file_get_contents("php://input"));
$get_cus_email = ($data->email);
$get_product_id = ($data->place_id);

$get_cook_net_total = ($data->net_total);

if(empty($get_cus_email) || empty($get_product_id))
{
	$response["success"] = 2;
	echo json_encode($response);
}
else
{
	$result = mysqli_query($conn,"SELECT * FROM customer_details WHERE email = '$get_cus_email'");
	if(mysqli_num_rows($result))
	{
		$Alldetails = mysqli_fetch_array($result);
		// temp user array
		$get_customer_id = $Alldetails["customer_id"];
		$get_wallet = $Alldetails["field_3"];
		
		$result1 = mysqli_query($conn,"SELECT * FROM customer_address WHERE customer_id = '$get_customer_id'");
		$result2 = mysqli_query($conn,"SELECT * FROM product_list WHERE product_id='$get_product_id'");
		if(mysqli_num_rows($result1) && mysqli_num_rows($result2))
		{
			$Alladdress = mysqli_fetch_array($result1);
			$get_street = $Alladdress["street"];
			$get_landmark = $Alladdress["landmark"];
			$get_city = $Alladdress["city"];
			$get_state = $Alladdress["state"];
			$get_pincode = $Alladdress["pincode"];
			$get_country = $Alladdress["country"];
			$get_type = $Alladdress["address_type"];
			
			$AllProducts = mysqli_fetch_array($result2);
			$get_product_id = $AllProducts["product_id"];
			$get_pname = $AllProducts["pname"];
			$get_pimage = $AllProducts["pimage"];
			$get_description = $AllProducts["description"];
			$get_price = $AllProducts["price"];
			$get_tax = $AllProducts["tax_amount"];
			$get_shipping_charge = $AllProducts["shipping_charge"];
			
			$get_tax_amount = $get_price * ($get_tax / 100);
			$get_net_total = $get_price + $get_tax_amount + $get_shipping_charge;
			$get_address = ''.$get_street.','.$get_landmark.','.$get_city.','.$get_state.','.$get_pincode.','.$get_country.'';
			$get_created_date = date('Y-m-d');
			$get_status = 'Pending';
			$get_quantity = 1;
			
	
//////////////////Mail ////////////////////////////
			$message2 = "New Order Placed".$get_pname."\r\n";
				$subject ="New - Order Recieved";	//.$get_order_id."\r\n";
				$from ="epharmacy@gmail.com";	// $get_empid;//  // from
				$message3 = wordwrap($message2, 200);
			
				// Send Mail By PHP Mail Function
				$mailto= $get_cus_email; //$get_sender_mail TO 
				//mail($mailto, $subject, $message3, "From:".$from);
				
//////////////////Mail ////////////////////////////

				
			
			/*
			$get_status ="Sold";
			mysqli_query($conn,"UPDATE product_list SET status='$get_status' WHERE product_id = '$get_product_id'");
			*/
			
			// check for empty result
			if (strcmp($get_type ,"Wallet" )==0)
			{
							// Wallet Ballance 
							if ($get_wallet >= $get_cook_net_total)
							{
								
							$get_status_cart = 'Confirmed';

							$result4 = mysqli_query($conn,"UPDATE add_to_cart SET status ='Processing', order_status ='$get_status_cart' 
							WHERE customer_id = '$get_customer_id'");
						
							$result5 = mysqli_query($conn,"UPDATE customer_details SET
								field_3=field_3-'$get_cook_net_total' WHERE email = '$get_cus_email' ");
							
										$response["success"] = 1;
										// echoing JSON response
										echo json_encode($response);
							}
							else
							{
									// success
										$response["success"] = 3;
										// echoing JSON response
										echo json_encode($response);
							}
		
						
					}
					else 
					{
						
							$get_status_cart = 'Confirmed';

							$result4 = mysqli_query($conn,"UPDATE add_to_cart SET status ='Processing', order_status ='$get_status_cart' 
							WHERE customer_id = '$get_customer_id'");
						// unsuccess
						$response["success"] = 1;
						
						// echoing JSON response
						echo json_encode($response);
					}	
			
		}
		else
		{
			$response["success"] = 0;	
			echo json_encode($response);
		}
	}
}
?>