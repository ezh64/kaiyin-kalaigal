<?php
	/* ************************************************************
	***************  - CPanel*******************
	***************************************************************
	********************** Update Cart *****************************
	***************************************************************/

// array for JSON response
$response = array();

// include db connect class
require_once __DIR__ . '/db_connect.php';

// connecting to db


$data = json_decode(file_get_contents("php://input"));
$get_cart_id = ($data->cart_id);
$get_quantity = ($data->quantity);

if(empty($get_cart_id) || empty($get_quantity))
{
	$response["success"] = 2;
	echo json_encode($response);
}
else
{
	$result = mysqli_query($conn,"SELECT * FROM add_to_cart WHERE cart_id = '$get_cart_id'");
		
	// check for empty result
	if(mysqli_num_rows($result))
	{
		$Info = mysqli_fetch_array($result);
		$get_product_id = $Info["product_id"];
		
		$result1 = mysqli_query($conn,"SELECT * FROM product_list WHERE product_id = '$get_product_id'");
		$AllProducts = mysqli_fetch_array($result1);
		$get_price = $AllProducts["price"];
		$get_tax = $AllProducts["tax_amount"];
		$get_ship_charge = $AllProducts["shipping_charge"];
			
		$grand_total = $get_quantity * $get_price;
		$tax = $get_quantity * $get_tax;
		$ship_charge = $get_quantity * $get_ship_charge;
		
		$tax_amount = $get_price * ($tax / 100);
		$net_total = $tax_amount + $ship_charge + $grand_total;			
		$get_updated_date = date('Y-m-d');
		
		
		$result2 = mysqli_query($conn,"UPDATE add_to_cart SET quantity='$get_quantity', grand_total='$grand_total', tax_amount='$tax_amount', net_total='$net_total', updated_date='$get_updated_date' WHERE cart_id = '$get_cart_id'");
		
		if($result2)
		{
			// success
			$response["success"] = 1;
			
			// echoing JSON response
			echo json_encode($response);
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
		$response["success"] = 0;
		
		// echoing JSON response
		echo json_encode($response);
	}
}
?>