<?php
	require_once('dbconf.php');

	class dbcon{

		protected $conn;

		protected function dbconnect(){
			$conn = new mysqli(db_host, db_user, db_pasw, db_dbase);
			return $conn;
		}

	}//sql connection class
?>