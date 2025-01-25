<?php
/*********************


*********/


/* Following code will retrieve table values */

// array for JSON response
$response = array();

// include db connect class
require_once __DIR__ . '/db_connect.php';
	
// connecting to db

	
//$data = json_decode(file_get_contents("php://input"));
$get_product = ($data->product);

// get all jobs
$result = mysqli_query($conn,"SELECT * FROM product_list WHERE category_name='$get_product'");

if (mysqli_num_rows($result))
{
	$response["category"] = array();
	$response["types"] = array();
	$response["brand"] = array();
	$response["size"] = array();
	$response["colors"] = array();
	$response["offers"] = array();
	while($AllProducts = mysqli_fetch_array($result))
	{
		// temp user array
		$category = array();
		$category["category"] = $AllProducts["category1"];
		
		$types = array();
		$types["types"] = $AllProducts["category2"];
		
		$brand = array();
		$brand["brand"] = $AllProducts["category3"];
		
		$size = array();
		$size["size"] = $AllProducts["size"];
		
		$colors = array();
		$colors["colors"] = $AllProducts["category4"];
		
		$offers = array();
		$offers["offers"] = $AllProducts["category4"];
		
		array_push($response["category"],$category);
		array_push($response["types"],$types);
		array_push($response["brand"],$brand);
		array_push($response["size"],$size);
		array_push($response["colors"],$colors);
		array_push($response["offers"],$offers);
	}	
	$response["success"] = 1;
	echo json_encode($response);
} 
else
{
	$response["success"] = 0;
	echo json_encode($response);
}
?>