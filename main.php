<?php

	require_once('query.php');

	//create object
	$newQuery = new queries();

	//test if data has been posted
	if(isset($_POST['buttonstatus'])){
		//variables
		$firstName = $_POST['fname'];
		$lastName = $_POST['lname'];
		$contactNumber = $_POST['cnum'];
		$id = $_POST['id'];
		$status = $_POST['buttonstatus'];
		//control function
		$newQuery->controlData($status, $firstName, $lastName, $contactNumber, $id);
	} else {
		//show records and close database
		$newQuery->showRecords();
	}
?>