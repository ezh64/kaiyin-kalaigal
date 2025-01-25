<?php
/*********************

**********************/

/* Following code will edit table by referring id */

// array for JSON response
$response = array();

// include db connect class
require_once __DIR__ . '/db_connect.php';
	
// connecting to db

$data = json_decode(file_get_contents("php://input"));
$get_product_id = ($data->product_id);
$get_pname = ($data->pname);
$get_desc = ($data->description);
$get_price = ($data->price);
$get_discount = ($data->discount);
$get_category1 = ($data->category1);
$get_category2 = ($data->category2);
$get_category3 = ($data->category3);
$get_size = ($data->size);
$get_stock =($data->stock);
$get_spec = ($data->specification);
$get_ship_days = ($data->shipping_days);
$get_ship_charge =($data->shipping_charge);



$result = mysqli_query($conn,"UPDATE product_list SET pname='$get_pname',description='$get_desc',
		price='$get_price',	discount='$get_discount',size='$get_size', stock='$get_stock', specification='$get_spec',
				shipping_days='$get_ship_days', shipping_charge='$get_ship_charge',
				category_name='$get_category1', category2='$get_category2',
				category3='$get_category3'
				WHERE 	product_id = '$get_product_id'");

	
// check for empty result
if($result)
{
	// success
	$response["success"] = 1;
	$response["message"] = "Entity successfully created";
	echo json_encode($response);
	
	// success	
	//header('Location: reg_del.html');
} 
else 
{
	echo "Error in inserting data";
}
?>