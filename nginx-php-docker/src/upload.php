<?php
$target_dir = "uploads/";
$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
$uploadOk = 1;
$imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);
error_log("received file is " . $target_file . " -- " . $imageFileType);
// Check if image file is a actual image or fake image
if(isset($_POST["submit"])) {
    $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
    if($check !== false) {
        echo "File is an image - " . $check["mime"] . ".";
		error_log("File is an image - " . $check["mime"] . ".");
        $uploadOk = 1;
    } else {
        echo "File is not an image.";
		error_log("File is not an image.");
        $uploadOk = 0;
    }
}
// Check if file already exists
if (file_exists($target_file)) {
    echo "Sorry, file already exists.";
	error_log("Sorry, file already exists.");
    $uploadOk = 0;
}
// Check file size
/*if ($_FILES["fileToUpload"]["size"] > 500000) {
    echo "Sorry, your file is too large.";
	error_log("Sorry, your file is too large");
    $uploadOk = 0;
}*/
// Allow certain file formats
if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
&& $imageFileType != "gif" ) {
    echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
	error_log("Sorry, only JPG, JPEG, PNG & GIF files are allowed.");	
    $uploadOk = 0;
}
// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
    echo "Sorry, your file was not uploaded.";
	error_log("Sorry, your file was not uploaded.");
	
// if everything is ok, try to upload file
} else {
//Check if the directory already exists.
	if(!is_dir($target_dir)){
	    //Directory does not exist, so lets create it.
	    mkdir($target_dir, 0755);
	}
    if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
        echo "The file ". basename( $_FILES["fileToUpload"]["name"]). " has been uploaded.";
		error_log("The file ". basename( $_FILES["fileToUpload"]["name"]). " has been uploaded.");
    } else {
        echo "Sorry, there was an error uploading your file.";
		error_log("Sorry, there was an error uploading your file.");
    }
}
?>