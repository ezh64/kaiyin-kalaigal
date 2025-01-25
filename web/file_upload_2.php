<?php 
// array for JSON response
$response = array();

// include db connect class
require_once __DIR__ . '/db_connect.php';

// connecting to db


$data = json_decode(file_get_contents("php://input"));
$get_id =$_POST['id'];
$get_field_1 =$_POST['field_1'];
$get_email =$_POST['email'];
//$get_id = substr($get_id_1, 1, -1);
$get_created_date =date('Y-m-d');

if (!empty( $_FILES ))
{
	
	$tempPath = $_FILES[ 'file' ][ 'tmp_name' ];
    $target_dir = "uploads/";
	$uploadPath = $target_dir . basename($_FILES[ 'file' ][ 'name' ]);
	$imageFileType = pathinfo($uploadPath,PATHINFO_EXTENSION);
	
    $get_file = "http://10.0.2.2/projects/kaiyinkalaigal/web/uploads/".$_FILES[ 'file' ][ 'name' ]."";
	//$get_file = "http://10.0.2.2/projects/agrigrocer/web/uploads/".$_FILES[ 'file' ][ 'name' ]."";

	
	$result = mysqli_query($conn,"UPDATE category SET field_2='$get_file',
				field_1='$get_field_1'
				WHERE cus_id = '$get_id' ");
	// check for empty result
	if($result)
	{
		move_uploaded_file( $tempPath, $uploadPath );
		// success
		$answer = array( 'answer' => 'File transfer completed' );
		$json = json_encode( $answer );

		echo $json;
	}
	else 
	{
		 echo 'No files';
	}
} 
else 
{
    echo 'No files';
}

?>