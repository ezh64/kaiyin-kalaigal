<?php
/*********************


**********************/

/* Following code will retrieve product details */

//user temp array
$response = array();

// include db connect class
require_once __DIR__ . '/db_connect.php';

// connecting to db


// check for post data
$data = json_decode(file_get_contents("php://input"));
$get_product_id = ($data->product_id);
$get_email = ($data->email);

if(empty($get_product_id) || empty($get_email))
{
	$response["success"] = 2;
	echo json_encode($response);
}
else
{
	// get customer details from customer_entity
	
	$result = mysqli_query($conn,"SELECT * FROM customer_details WHERE email = '$get_email'");
	/*
	if(mysqli_num_rows($result))
	{
		$Info = mysqli_fetch_array($result);
		$get_customer_id = $Info["customer_id"];

		$result1 = mysqli_query($conn,"SELECT * FROM add_to_cart WHERE customer_id = '$get_customer_id' AND  product_id = '$get_product_id'");

		// check for empty result	
		if(mysqli_num_rows($result1))
		{			
			$ProductCount = mysqli_fetch_array($result1);
			
			$get_cart_quantity = $ProductCount["quantity"];
			$get_cart_grand_total = $ProductCount["grand_total"];
			$get_cart_net_total = $ProductCount["net_total"];
			$get_cart_tax_amount = $ProductCount["tax_amount"];
			$get_cart_ship_charge = $ProductCount["shipping_charge"];
			
			$result2 = mysqli_query($conn,"SELECT * FROM product_list WHERE product_id = '$get_product_id'");
			$AllProducts = mysqli_fetch_array($result2);
			$get_pro_price = $AllProducts["price"];
			$get_pro_tax = $AllProducts["tax_amount"];
			$get_pro_ship_charge = $AllProducts["shipping_charge"];
			
			$get_pro_tax_amount = $get_pro_price * ($get_pro_tax / 100);
			$get_pro_net_total = $get_pro_tax_amount + $get_pro_ship_charge + $get_pro_price;
			
			$quantity = $get_cart_quantity + 1;
			$grand_total = $get_cart_grand_total + $get_pro_price;
			$net_total = $get_cart_net_total + $get_pro_net_total;			
			$shipping_charge = $get_cart_ship_charge + $get_pro_ship_charge;			
			$tax_amount = $get_cart_tax_amount + $get_pro_tax_amount;			
			$get_updated_date = date('Y-m-d');
		
			$result3 = mysqli_query($conn,"UPDATE add_to_cart SET quantity ='$quantity', grand_total ='$grand_total', tax_amount='$tax_amount', shipping_charge='$shipping_charge', net_total='$net_total',updated_date='$get_updated_date' WHERE customer_id = '$get_customer_id' AND  product_id = '$get_product_id'");
			
			
			if($result3)
			{
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
			$result4 = mysqli_query($conn,"SELECT * FROM product_list WHERE product_id = '$get_product_id'");
			$AllProducts = mysqli_fetch_array($result4);
			$pname = $AllProducts["pname"];
			$pimage = $AllProducts["pimage"];
			$price = $AllProducts["price"];
			$description = $AllProducts["description"];
			$tax = $AllProducts["tax_amount"];
			$ship_charge = $AllProducts["shipping_charge"];
		
			$amount = $price * ($tax / 100);
			$sub_total = $price; 
			$total = $amount + $ship_charge + $price;
			$count = 1;
			$create_date = date('Y-m-d');
		
			$result5 = mysqli_query($conn,"INSERT INTO add_to_cart(status,customer_id,product_id,pname,pimage,description,quantity,grand_total,tax_amount,shipping_charge,net_total,created_date) 
	VALUES('Pending','$get_customer_id', '$get_product_id', '$pname', '$pimage', '$description', '$count', '$sub_total', '$amount', '$ship_charge', '$total', '$create_date')");
			if($result5)
			{
				$response["success"] = 1;
				echo json_encode($response);
			}
			else
			{
				$response["success"] = 0;
				echo json_encode($response);
			}
		}
	}
	
	*/
		if(mysqli_num_rows($result))

		{
			$result6 = mysqli_query($conn,"SELECT * FROM customer_details WHERE email = '$get_email'");
			if(mysqli_num_rows($result6))
			{
				$User = mysqli_fetch_array($result6);
				$get_cid = $User["customer_id"];
				
				$result7 = mysqli_query($conn,"SELECT * FROM product_list WHERE product_id = '$get_product_id'");
				
				if(mysqli_num_rows($result7))
				{
					$AllProducts = mysqli_fetch_array($result7);
					$get_pname = $AllProducts["pname"];
					$get_pimage = $AllProducts["pimage"];
					$get_price = $AllProducts["price"];
					$get_description = $AllProducts["description"];
					$get_tax = $AllProducts["tax_amount"];
					$get_ship_charge = $AllProducts["shipping_charge"];
					$get_seller_mail = $AllProducts["email"];
					
					$get_tax_amount = $get_price * ($get_tax / 100);
					$get_grand_total = $get_price; 
					$get_net_total = $get_tax_amount + $get_ship_charge + $get_price;
					$get_quantity = 1;
					$get_created_date = date('Y-m-d');
				
					$result8 = mysqli_query($conn,"INSERT INTO add_to_cart(order_status,customer_id,seller,product_id,pname,pimage,description,quantity,grand_total,tax_amount,shipping_charge,net_total,created_date) 
	VALUES('Pending','$get_cid','$get_seller_mail', '$get_product_id', '$get_pname', '$get_pimage', '$get_description', '$get_quantity', '$get_grand_total', '$get_tax_amount', '$get_ship_charge', '$get_net_total', '$get_created_date')");
					if($result8)
					{
						$response["success"] = 1;
						echo json_encode($response);
					}
					else
					{
						$response["success"] = 0;
						echo json_encode($response);
					}
				}
			}
		}
}

?>